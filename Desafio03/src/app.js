// src/app.js
const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;
const productManager = new ProductManager();

// Endpoint para a rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor de produtos!');
});

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    let products = await productManager.getProducts();

    if (limit) {
      products = products.slice(0, parseInt(limit, 10));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the product' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
