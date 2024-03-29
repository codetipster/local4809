const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


app.get('/test', (req, res) => {
    res.send('API Gateway is working!');
});

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});


const userServiceProxy = createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': '/users',
    },
});
app.use('/api/users', userServiceProxy);


const landServiceProxy = createProxyMiddleware({
    target: 'http://localhost:8000', // Replace with your land service URL
    changeOrigin: true,
    pathRewrite: {
        '^/api/land-listing': '/land-listing',
    },
});
app.use('/api/land-listing', landServiceProxy);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
