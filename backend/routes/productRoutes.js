const express = require('express');
const AppDataSource = require('../config/db');
const Product = require('../models/Product');
const upload = require('../middleware/upload');
const router = express.Router();

// Create product
router.post('/', upload.array('images'), async (req, res) => {
    try {
        const { sku, name, price } = req.body;
        const images = req.files.map(file => file.buffer.toString('base64'));
        const productRepo = AppDataSource.getRepository('Product');
        const newProduct = productRepo.create({ sku, name, price, images: JSON.stringify(images) });
        await productRepo.save(newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const productRepo = AppDataSource.getRepository('Product');
        const products = await productRepo.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update product
router.put('/:id', upload.array('images'), async (req, res) => {
    try {
        const { sku, name, price } = req.body;
        const images = req.files.map(file => file.buffer.toString('base64'));
        const productRepo = AppDataSource.getRepository('Product');
        const product = await productRepo.findOneBy({ id: req.params.id });

        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.sku = sku || product.sku;
        product.name = name || product.name;
        product.price = price || product.price;
        if (images.length) product.images = JSON.stringify(images);

        await productRepo.save(product);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// update single product image
router.put('/image/:id', upload.single('images'), async (req, res) => {
    try {
      const { sku, name, price } = req.body;
      const images = req.file; // Access the uploaded file
  
      console.log('Received:', sku, name, price, images);
  
      // Update logic here
  
      res.status(200).send("Product updated successfully");
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const productRepo = AppDataSource.getRepository('Product');
        await productRepo.delete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete product images
router.delete('/:id/images', async (req, res) => {
    try {
        const productRepo = AppDataSource.getRepository('Product');
        const product = await productRepo.findOneBy({ id: req.params.id });

        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.images = JSON.stringify([]);
        await productRepo.save(product);

        res.json({ message: 'Product images deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;