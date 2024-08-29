// src/ProductManager.js
const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor() {
    this.filePath = path.join(__dirname, 'products.json');
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading the file', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === parseInt(id, 10));
    } catch (error) {
      console.error('Error retrieving product by ID', error);
      throw error;
    }
  }
}

module.exports = ProductManager;
