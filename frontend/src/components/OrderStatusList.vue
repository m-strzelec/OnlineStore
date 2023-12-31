<template>
    <div>
        <h2>Order Status List</h2>

        <ul>
            <li v-for="status in orderStatuses" :key="status._id">
                <p>Status ID: {{ status._id }}</p>
                <p>Status Name: {{ status.name }}</p>
            </li>
        </ul>

        <router-link to="/order-list">Back to Order List</router-link>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            orderStatuses: [],
        };
    },
    mounted() {
        // Fetch order statuses from the backend when the component is mounted
        axios.get('app_url/status')
            .then(response => {
                this.orderStatuses = response.data;
            })
            .catch(error => {
                console.error('Error fetching order statuses:', error);
            });
    },
};
</script>
  
<style scoped></style>
  