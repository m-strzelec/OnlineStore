<template>
    <div>
        <h2>Order List</h2>

        <ul>
            <li v-for="order in orders" :key="order._id">
                <p>Order ID: {{ order._id }}</p>
                <p>User: {{ order.userName }}</p>
                <p>Email: {{ order.email }}</p>
                <p>Order Date: {{ order.orderDate }}</p>
                <p>Status: {{ order.status.name }}</p>
            </li>
        </ul>

        <router-link to="/order-status-list">View Order Status List</router-link>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            orders: [],
        };
    },
    mounted() {
        // Fetch orders from the backend when the component is mounted
        axios.get('localhost:3000/orders')
            .then(response => {
                this.orders = response.data;
                console.log('data recieved');
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    },
};
</script>
  
<style scoped></style>
  