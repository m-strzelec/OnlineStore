<template>
    <div class="container mt-5">
        <h1>Not completed orders</h1>
        <div class="my-3">
            <table class="table table-striped table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th scope="row">#</th>
                        <th>Order ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Order status</th>
                        <th>Change Order Status to</th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <OrderItem
                        v-for="(order, index) in orders"
                        :key="order._id"
                        :order="order"
                        :status="getStatusName(order.orderStatus)"
                        :approved="this.orderStatuses.find((s) => s.name === 'APPROVED')"
                        :index="index + 1"
                        @change-status="handleChangeOrderStatus"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import OrderItem from './AdminOrderItem.vue';
import { useToast } from 'vue-toastification';

export default {
    name: 'AdminOrderList',
    setup() {
        const toast = useToast();
        return {
            toast,
        };
    },
    data() {
        return {
            orders: [],
            orderStatuses: [],
        };
    },
    components: {
        OrderItem,
    },
    methods: {
        async fetchOrders() {
            try {
                const status = this.orderStatuses.find((s) => s.name === 'UNAPPROVED');
                const response = await axios.get(`http://localhost:3000/orders/status/${status._id}`);
                this.orders = response.data;
            } catch (error) {
                this.toast.error(`Error getting orders: ${error.response.data.message}`);
                console.error('Error fetching orders:', error);
            }
            try {
                const status = this.orderStatuses.find((s) => s.name === 'APPROVED');
                const response = await axios.get(`http://localhost:3000/orders/status/${status._id}`);
                for (const data of response.data) {
                    this.orders.push(data);
                }
            } catch (error) {
                this.toast.error(`Error getting orders: ${error.response.data.message}`);
                console.error('Error fetching orders:', error);
            }
        },
        async fetchOrderStatuses() {
            try {
                const response = await axios.get('http://localhost:3000/status');
                this.orderStatuses = response.data;
                this.fetchOrders();
            } catch (error) {
                this.toast.error(`Error getting order statuses: ${error.response.data.message}`);
                console.error('Error fetching order statuses:', error);
            }
        },
        async handleChangeOrderStatus(orderId, action) {
            try {
                const status = this.orderStatuses.find((s) => s.name === action);
                const response = await axios.patch(`http://localhost:3000/orders/${orderId}`, { orderStatus: status._id });
                this.fetchOrders();
                this.toast.success(`Order status successfully edited to: ${action}!`);
                console.log(response.data);
            } catch (error) {
                this.toast.error(`Error changing order status: ${error.response.data.message}`);
                console.error('Error changing order status:', error);
            }
        },
        getStatusName(statusId) {
            const status = this.orderStatuses.find((s) => s._id === statusId);
            return status ? status.name : 'Unknown';
        },
    },
    mounted() {
        this.fetchOrderStatuses();
    },
};
</script>
  
<style scoped></style>
  