const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const orderStatusRoutes = require('./routes/orderStatuses');

const app = express();
const port = process.env.PORT || 3000;

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
app.use('/orderStatuses', orderStatusRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});