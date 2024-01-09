import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../components/common/HomePage';
import ProductList from '../components/product/ProductList';
import OrderList from '../components/order/OrderList';
import OrderListByState from '../components/order/OrderListByStatus';
import ProductEdit from '../components/product/ProductEdit';

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
        path: '/order-list-by-state',
        name: 'OrderListByState',
        component: OrderListByState,
    },
    {
        path: '/product-edit',
        name: 'ProductEdit',
        component: ProductEdit,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;