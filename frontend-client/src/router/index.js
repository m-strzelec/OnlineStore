import { createRouter, createWebHistory } from 'vue-router';

import ClientHomePage from '../components/common/ClientHomePage';
import ClientProductList from '../components/product/ClientProductList';
import ClientShoppingCart from '../components/cart/ClientShoppingCart';

const routes = [
  {
    path: '/',
    name: 'ClientHomePage',
    component: ClientHomePage,
  },
  {
    path: '/product-list',
    name: 'ClientProductList',
    component: ClientProductList,
  },
  {
    path: '/shopping-cart',
    name: 'ClientShoppingCart',
    component: ClientShoppingCart,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;