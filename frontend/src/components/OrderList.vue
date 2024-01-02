<template>
    <div class="container mt-4">
        <h1>Order List</h1>
        <table class="table table-striped table-bordered table-hover">
            <thead class="table-dark">
                <tr>
                    <th scope="row">#</th>
                    <th>Order ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Approval Date</th>
                    <th>Order Status</th>
                </tr>
            </thead>
            <tbody class="align-middle">
                <OrderItem v-for="(order, index) in orders" :key="order._id" :order="order"
                    :status="getStatusName(order.orderStatus)" :index="index + 1" />
            </tbody>
        </table>
    </div>
</template>
  
<script>
import axios from 'axios';
import OrderItem from './OrderItem.vue'

export default {
    components: {
        OrderItem,
    },
    data() {
        return {
            orders: [],
            orderStatuses: [],
        };
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await axios.get('http://localhost:3000/orders');
                this.orders = response.data;
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        async fetchOrderStatuses() {
            try {
                const response = await axios.get('http://localhost:3000/status');
                this.orderStatuses = response.data;
            } catch (error) {
                console.error('Error fetching order statuses:', error);
            }
        },
        getStatusName(statusId) {
            const status = this.orderStatuses.find((s) => s._id === statusId);
            return status ? status.name : 'Unknown';
        },
    },
    mounted() {
        this.fetchOrders();
        this.fetchOrderStatuses();
    },
};
</script>
  
<style scoped>
.table {
    margin: auto;
    width: 90%;
}
</style>
  