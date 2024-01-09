<template>
    <div class="container mt-5">
        <div class="card mx-auto my-4">
            <h4 class="card-header">Add New Product</h4>
            <div class="card-body">
                <form @submit.prevent="addProduct">
                    <div class="form-group row mb-3">
                        <label for="name" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                            <input v-model="newProduct.name" type="text" class="form-control" id="name" required />
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label for="description" class="col-sm-2 col-form-label">Description:</label>
                        <div class="col-sm-10">
                            <input v-model="newProduct.description" type="text" class="form-control" id="description"
                                required />
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label for="price" class="col-sm-2 col-form-label">Price:</label>
                        <div class="col-sm-10">
                            <input v-model="newProduct.price" type="number" step="0.01" class="form-control" id="price"
                                title="Please enter a valid number with up to two decimal places" required />
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label for="weight" class="col-sm-2 col-form-label">Weight:</label>
                        <div class="col-sm-10">
                            <input v-model="newProduct.weight" type="number" step="0.001" class="form-control" id="weight"
                                title="Please enter a valid number with up to two decimal places" required />
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label for="category" class="col-sm-2 col-form-label">Category:</label>
                        <div class="col-sm-4">
                            <select v-model="newProduct.category" class="form-select" id="category">
                                <option v-for="category in categories" :key="category._id" :value="category._id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
        <router-link to="/product-list" class="btn btn-outline-info mt-3">Back to Product List</router-link>
    </div>
</template>
  
<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    name: 'AdminAddProduct',
    setup() {
        const toast = useToast();
        return {
            toast,
        };
    },
    data() {
        return {
            newProduct: {
                name: '',
                description: '',
                price: '',
                weight: '',
                category: '',
            },
            categories: [],
        };
    },
    mounted() {
        axios.get('http://localhost:3000/categories')
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                this.toast.error(`Error while getting categories: ${error.response.data.message}`);
                console.error('Error fetching categories:', error);
            });
    },
    methods: {
        addProduct() {
            axios.post('http://localhost:3000/products', this.newProduct)
                .then(response => {
                    console.log('Product added successfully:', response.data);
                    this.$router.push('/product-list');
                    this.toast.success('Product added successfully!');
                })
                .catch(error => {
                    this.toast.error(`Error while adding new product: ${error.response.data.message}`);
                    console.error('Error adding product:', error);
                });
        },
    },
};
</script>
  
<style scoped>
.card {
  width: 60%;
}
</style>
  