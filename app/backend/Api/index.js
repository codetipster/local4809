const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

// Proxy requests to User Service
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

// Proxy requests to Land Listing Service
app.use('/land-listing', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

// Microservices communication for data consistency and integrity(Transactions)
app.post('/land-listing', async (req, res) => {
    // Extract the necessary data from the request
    const { userId, landDetails } = req.body;

    // Make a request to the Land Service to create a new Land document
    const landResponse = await axios.post('http://localhost:5000/land-listing', landDetails);

    if (landResponse.status !== 200) {
        // If the Land Service request failed, send an error response
        return res.status(500).json({ error: 'Failed to create land listing' });
    }

    // Extract the ID of the new Land document
    const landId = landResponse.data._id;

    // Make a request to the User Service to update the User document
    const userResponse = await axios.put(`http://localhost:3000/users/${userId}`, { landId });

    if (userResponse.status !== 200) {
        // If the User Service request failed, roll back the Land Service transaction and send an error response
        await axios.delete(`http://localhost:5000/land-listing/${landId}`);
        return res.status(500).json({ error: 'Failed to update user' });
    }

    // If both requests succeeded, send a success response
    res.status(200).json({ message: 'Land listing created successfully' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
