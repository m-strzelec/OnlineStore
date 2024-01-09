<template>
    <div class="container mt-5">
        <h1>Order List By Status</h1>
        <div class="my-3 form-group row justify-content-center">
            <label for="statusFilter" class="col-sm-1 col-form-label">Status:</label>
            <div class="col-sm-3">
                <select v-model="statusFilter" class="form-select" id="statusFilter">
                    <option value="">All Statuses</option>
                    <option v-for="status in orderStatuses" :key="status._id" :value="status._id">{{ status.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="my-3">
            <table class="table table-striped table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th scope="row">#</th>
                        <th>Order ID</th>
                        <th>Approval Date</th>
                        <th>Total Price</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr v-for="(order, index) in filteredOrders" :key="order._id" :index="index">
                        <td> {{ index + 1 }} </td>
                        <td> {{ order._id }} </td>
                        <td> {{ order.approvalDate }} </td>
                        <td> {{ getTotalPrice(order) }} zł</td>
                        <td> {{ getStatusName(order.orderStatus) }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import _ from 'lodash';

export default {
    name: 'OrderListByStatus',
    data() {
        return {
            orders: [],
            filteredOrders: [],
            orderStatuses: [],
            products: [],
            statusFilter: '',
        };
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/products');
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products from orders:', error);
            }
        },
        async fetchOrderStatuses() {
            try {
                const response = await axios.get('http://localhost:3000/status');
                this.orderStatuses = response.data;
                this.fetchOrders();
            } catch (error) {
                console.error('Error fetching order statuses:', error);
            }
        },
        async fetchOrders() {
            try {
                const response = await axios.get('http://localhost:3000/orders');
                this.orders = response.data;
                this.applyFilters();
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        getTotalPrice(order) {
            let total = 0;
            for (const newproduct of order.orderedProducts) {
                const produkt = this.products.find((p) => p._id === newproduct.product);
                total += newproduct.quantity * produkt.price;
            }
            return total.toFixed(2);
        },
        getStatusName(statusId) {
            const status = this.orderStatuses.find((s) => s._id === statusId);
            return status ? status.name : 'Unknown';
        },
        applyFilters() {
            this.filteredOrders = _.filter(this.orders, (order) => {
                const statusMatch = !this.statusFilter || order.orderStatus === this.statusFilter;
                return statusMatch;
            });
        },
    },
    watch: {
        statusFilter: 'applyFilters',
    },
    mounted() {
        this.fetchProducts();
        this.fetchOrderStatuses();
    },
};
</script>
  
<style scoped></style>
  