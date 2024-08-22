class ProductManager {
    constructor() {
      this.products = [];
      this.currentId = 1;
    }
  
    addProduct(product) {
      // Verifica se todos os campos estão presentes
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error("Todos os campos são obrigatórios.");
        return;
      }
  
      // Verifica se o código já existe
      const codeExists = this.products.some(p => p.code === product.code);
      if (codeExists) {
        console.error(`O código "${product.code}" já existe.`);
        return;
      }
  
      // Adiciona o ID ao produto e incrementa o ID atual
      const newProduct = { id: this.currentId++, ...product };
      this.products.push(newProduct);
      console.log("Produto adicionado:", newProduct);
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.error("Não encontrado");
        return null;
      }
      return product;
    }
  }
  
  // Exemplo de uso
  const manager = new ProductManager();
  
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
  
  // Tentativa de adicionar um produto com código repetido
  manager.addProduct({
    title: "Produto 3",
    description: "Descrição do Produto 3",
    price: 300,
    thumbnail: "caminho/para/imagem3.jpg",
    code: "P002", // Código repetido
    stock: 10
  });
  
  console.log(manager.getProductById(1)); // Deve retornar o Produto 1
  console.log(manager.getProductById(3)); // Deve mostrar "Não encontrado"
  