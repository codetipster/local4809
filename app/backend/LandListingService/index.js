const express = require('express');
const connectDB = require('./database');
const landRoutes = require('./routes/landRoutes');
const app = express();

// Connect to Database
connectDB();
app.use(express.json()); // for parsing application/json

// Routes
app.use('/land-listing', landRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
