const express = require('express');
const { create } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

// Configuração do Handlebars
const hbs = create({ extname: '.handlebars' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Middleware para servir arquivos estáticos
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Iniciando o servidor HTTP e o socket.io
const server = http.createServer(app);
const io = new Server(server);

// Criando uma instância do ProductManager
const productManager = new ProductManager();

// Rota para a página inicial
app.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// Rota para a visualização em tempo real
app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

// Websocket para atualizar produtos em tempo real
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // Enviar lista de produtos ao cliente
  socket.emit('productList', productManager.getProducts());

  // Receber novo produto do cliente e adicionar
  socket.on('newProduct', async (product) => {
    await productManager.addProduct(product);
    io.emit('productList', await productManager.getProducts()); // Enviar nova lista a todos os clientes
  });

  // Receber ID do produto para exclusão
  socket.on('deleteProduct', async (productId) => {
    await productManager.deleteProduct(productId);
    io.emit('productList', await productManager.getProducts()); // Enviar nova lista a todos os clientes
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});