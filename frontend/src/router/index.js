import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import OrderConfirmation from '../components/OrderConfirmation.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: ShoppingCart },
  { path: '/confirm-order', component: OrderConfirmation },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
