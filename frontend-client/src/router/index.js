import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../components/common/HomePage';
import ProductList from '../components/product/ProductList';
import OrderList from '../components/order/OrderList';
import ShoppingCart from '../components/cart/ShoppingCart';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: OrderList,
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;