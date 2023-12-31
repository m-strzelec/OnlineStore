<template>
    <div>
        <h2>Update Product</h2>

        <form @submit.prevent="updateProduct">
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" v-model="productName" required />

      <label for="productDescription">Product Description:</label>
      <textarea id="productDescription" v-model="productDescription" required></textarea>

      <label for="productPrice">Product Price:</label>
      <input type="number" id="productPrice" v-model="productPrice" required />

      <label for="productCategory">Product Category:</label>
      <select id="productCategory" v-model="productCategory" required>
        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select>

      <!-- Add other product properties as needed -->

      <button type="submit">Update Product</button>
    </form>

        <router-link to="/">Back to Product List</router-link>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            productId: this.$route.params.id,
            product: {
                name: '',
                description: '',
                price: 0,
                weight: 0,
                categoryId: '',
            },
            categories: [],
        };
    },
    mounted() {
        // Fetch product details and categories from the backend when the component is mounted
        axios.get(`app_url/products/${this.productId}`)
            .then(response => {
                this.product = response.data;
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });

        axios.get('localhost:3000/categories')
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    },
    methods: {
        updateProduct() {
            // Send a PUT request to update the product
            axios.put(`localhost:3000/products/${this.productId}`, this.product)
                .then(response => {
                    console.log('Product updated successfully:', response.data);
                    // Redirect to the product list or show a success message
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                });
        },
    },
};
</script>
  
<style scoped></style>
  