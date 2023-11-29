const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Enable CORS
app.use(cors());
// Connect to Database
connectDB();
app.use(express.json()); // for parsing application/json

// Routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
