<template>
    <div>
        <h2>Add Product</h2>

        <form @submit.prevent="addProduct">
            <label for="name">Name:</label>
            <input type="text" v-model="newProduct.name" required>

            <label for="description">Description:</label>
            <textarea v-model="newProduct.description" required></textarea>

            <label for="price">Price:</label>
            <input type="number" v-model="newProduct.price" required>

            <label for="weight">Weight:</label>
            <input type="number" v-model="newProduct.weight" required>

            <label for="category">Category:</label>
            <select v-model="newProduct.categoryId" required>
                <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}
                </option>
            </select>

            <button type="submit">Add Product</button>
        </form>

        <router-link to="/">Back to Product List</router-link>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'AddProduct',
    data() {
        return {
            newProduct: {
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
        // Fetch categories from the backend when the component is mounted
        axios.get('localhost:3000/categories')
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    },
    methods: {
        addProduct() {
            // Send a POST request to add a new product
            axios.post('localhost:3000/products', this.newProduct)
                .then(response => {
                    console.log('Product added successfully:', response.data);
                    // Reset the form or redirect to the product list
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
        },
    },
};
</script>
  
<style scoped></style>
  