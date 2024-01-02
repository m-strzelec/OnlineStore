<template>
  <div>
    <h2>Shopping Cart</h2>

    <div class="container mt-4">
      <table class="table table-striped table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="row">#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-for="(item, index) in cartItems" :key="item.productId">
            <td>{{ index + 1 }}</td>
            <td>
              <p>{{ item.productName }}</p>
            </td>
            <td>
              <button @click="decrementQuantity(index)" :disabled="item.quantity <= 1">-</button>
              {{ item.quantity }}
              <button @click="incrementQuantity(index)">+</button>
            </td>
            <td>
              <p>{{ item.price }}</p>
            </td>
            <td>
              <button @click="removeItem(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Total Price: {{ calculateTotalPrice() }}</h3>

    <!-- Formularz do podania danych kontaktowych -->
    <form @submit.prevent="submitOrder">
      <label for="username">Username:</label>
      <input v-model="username" type="text" id="username" required />

      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" required />

      <label for="phone">Phone:</label>
      <input v-model="phone" type="tel" id="phone" required />

      <button type="submit">Submit Order</button>
    </form>

    <router-link to="/">Back to Product List</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
      username: '',
      email: '',
      phone: '',
    };
  },
  methods: {
    incrementQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decrementQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    calculateTotalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    },
    submitOrder() {
      console.log('Order submitted:', {
        username: this.username,
        email: this.email,
        phone: this.phone,
        items: this.cartItems,
      });
    },
    async fetchProductData() {
      axios.get(`http://localhost:3000/products/${productId}`)
        .then(response => {
          const chosenProduct = response.data;
          this.cartItems = [{
            productId: chosenProduct._id,
            productName: chosenProduct.name,
            quantity: 1,
            price: chosenProduct.price,
          }];
        })
        .catch(error => {
          console.error('Error fetching shopping cart items:', error);
        });
    },
  },
  mounted() {
    this.fetchProductData();
  }
};
</script>

<style scoped></style>
