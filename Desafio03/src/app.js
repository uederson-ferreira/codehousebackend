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
  const products = a