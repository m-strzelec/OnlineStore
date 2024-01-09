import { createRouter, createWebHistory } from 'vue-router';

import AdminHomePage from '../components/common/AdminHomePage';
import AdminProductList from '../components/product/AdminProductList';
import AdminOrderList from '../components/order/AdminOrderList';
import AdminOrderListByState from '../components/order/AdminOrderListByStatus';
import AdminProductEdit from '../components/product/AdminProductEdit';
import AdminAddProduct from '../components/product/AdminAddProduct';

const routes = [
    {
        path: '/',
        name: 'AdminHomePage',
        component: AdminHomePage,
    },
    {
        path: '/product-list',
        name: 'AdminProductList',
        component: AdminProductList,
    },
    {
        path: '/order-list',
        name: 'AdminOrderList',
        component: AdminOrderList,
    },
    {
        path: '/order-list-by-state',
        name: 'AdminOrderListByState',
        component: AdminOrderListByState,
    },
    {
        path: '/product-edit',
        name: 'AdminProductEdit',
        component: AdminProductEdit,
        props: true,
    },
    {
        path: '/add-product',
        name: 'AdminAddProduct',
        component: AdminAddProduct,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;