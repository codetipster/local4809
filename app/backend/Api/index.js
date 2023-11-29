const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

// Proxy requests to User Service
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

// Proxy requests to Land Listing Service
app.use('/land-listing', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
