const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const orderStatusRoutes = require('./routes/orderStatuses');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to check access conditions
// const checkAccess = (req, res, next) => {
//   const allowedOrigins = ['http://localhost:8080'];
//   const allowedPostRoutes = ['/orders'];

//   if (!allowedOrigins.includes(req.headers.origin)) {
//     return res.status(403).json({ error: 'Forbidden' });
//   }

//   if (req.method === 'POST' && allowedPostRoutes.includes(req.path)) {
//     next();
//   } else if (req.method === 'GET') {
//     next();
//   } else {
//     return res.status(403).json({ error: 'Forbidden' });
//   }
// };

// // Apply checkAccess middleware
// app.use(checkAccess);

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,PUT,PATCH,POST',
  credentials: true,
};

app.use(cors(corsOptions));

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