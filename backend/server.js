const express = require('express');
const productRoutes = require('./routes/productRoutes.js');
const app = express();
require('./config/db.js'); // Database connection

const cors = require('cors');

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));