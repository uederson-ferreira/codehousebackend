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
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }

  async deleteProduct(productId) {
    let products = await this.getProducts();
    products = products.filter(product => product.id !== parseInt(productId, 10));
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;