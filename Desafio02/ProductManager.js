const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.currentId = 1;

    // Carrega os produtos existentes do arquivo, se houver
    this.loadProductsFromFile();
  }

  // Método para carregar produtos do arquivo
  loadProductsFromFile() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data);
        this.currentId = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
      }
    } catch (error) {
      console.error("Erro ao ler o arquivo:", error);
    }
  }

  // Método para salvar produtos no arquivo
  saveProductsToFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error("Erro ao salvar o arquivo:", error);
    }
  }

  // Método para adicionar um novo produto
  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    const codeExists = this.products.some(p => p.code === product.code);
    if (codeExists) {
      console.error(`O código "${product.code}" já existe.`);
      return;
    }

    const newProduct = { id: this.currentId++, ...product };
    this.products.push(newProduct);
    this.saveProductsToFile();
    console.log("Produto adicionado:", newProduct);
  }

  // Método para obter todos os produtos
  getProducts() {
    return this.products;
  }

  // Método para obter um produto por ID
  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.error("Não encontrado");
      return null;
    }
    return product;
  }

  // Método para atualizar um produto
  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error("Produto não encontrado");
      return;
    }

    this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct, id };
    this.saveProductsToFile();
    console.log("Produto atualizado:", this.products[productIndex]);
  }

  // Método para deletar um produto
  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error("Produto não encontrado");
      return;
    }

    this.products.splice(productIndex, 1);
    this.saveProductsToFile();
    console.log(`Produto com ID ${id} deletado.`);
  }
}

// Exemplo de uso
const manager = new ProductManager('products.json');

manager.addProduct({
  title: "Produto 1",
  description: "Descrição do Produto 1",
  price: 100,
  thumbnail: "caminho/para/imagem1.jpg",
  code: "P001",
  stock: 50
});

manager.addProduct({
  title: "Produto 2",
  description: "Descrição do Produto 2",
  price: 200,
  thumbnail: "caminho/para/imagem2.jpg",
  code: "P002",
  stock: 20
});

console.log(manager.getProducts());

console.log(manager.getProductById(1));

manager.updateProduct(1, { price: 150, stock: 45 });

manager.deleteProduct(2);
