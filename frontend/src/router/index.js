import { createRouter, createWebHistory } from 'vue-router';

import ProductList from '../components/ProductList.vue';
import OrderList from '../components/OrderList.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

const routes = [
  {
    path: '/',
    redirect: '/product-list',
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;