const express = require('express');
const productRoutes = require('./routes/productRoutes.js');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors())

require('./config/db.js'); // Database connection

app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));