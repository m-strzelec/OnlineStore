<template>
  <div>
    <h2>Shopping Cart</h2>
    <!-- Komponenty i logika dla koszyka -->
    <ul>
      <li v-for="item in cartItems" :key="item.productId">
        <p>Product: {{ item.productName }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <p>Price: {{ item.price }}</p>
      </li>
    </ul>
    <router-link to="/">Back to Product List</router-link>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
      // ... inne dane stanu
    };
  },
  methods: {
    // Metody do obsługi zmiany ilości i usuwania produktów z koszyka
  },
  mounted() {
    // Fetch shopping cart items from the backend when the component is mounted
    const orderId = 'your_user_id'; // Replace with the actual user ID or session identifier
    axios.get(`app_url/orders/${orderId}`)
      .then(response => {
        // Assuming the backend returns shopping cart items associated with the user or session
        this.cartItems = response.data.map(order => ({
          productId: order.productId,
          productName: order.productName,
          quantity: order.quantity,
          price: order.price,
        }));
      })
      .catch(error => {
        console.error('Error fetching shopping cart items:', error);
      });
  },
};
</script>
  
<style scoped></style>
  