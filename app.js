const express = require('express');
const PORT = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// Import routes
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import routes
const productRoutes = require('./routes/productRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

app.use('/products', productRoutes);
app.use('/restaurants', restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
