const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const orderStatusRoutes = require('./routes/orderStatuses');

const app = express();
const port = process.env.PORT || 3000;

// Custom CORS middleware
function customCors(req, res, next) {
  const adminOrigin = 'http://localhost:8081';
  const clientOrigin = 'http://localhost:8080';

  const origin = req.get('origin');
  if (origin === adminOrigin) {
    res.header('Access-Control-Allow-Origin', adminOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  } else if (origin === clientOrigin) {
    res.header('Access-Control-Allow-Origin', clientOrigin);
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.status(HttpStatus.StatusCodes.OK).end();
      return;
    } else if (req.path === '/orders' && req.method === 'POST') {
      res.header('Access-Control-Allow-Methods', 'POST');
    } else if ((req.path === '/products' || req.path === '/categories') && req.method === 'GET') {
      res.header('Access-Control-Allow-Methods', 'GET');
    } else if (req.path.startsWith('/products/') && req.method === 'GET') {
      res.header('Access-Control-Allow-Methods', 'GET');
    } else {
      res.status(HttpStatus.StatusCodes.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed for client' });
      return;
    }
  }

  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(HttpStatus.StatusCodes.OK);
  } else {
    next();
  }
}

app.use(customCors);

mongoose.connect('mongodb+srv://admin:admin@aji.laoxidk.mongodb.net/AJImainDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/status', orderStatusRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});