<template>
    <div class="container mt-5">
        <div class="card mx-auto my-4">
            <h4 class="card-header">Product edition form</h4>
            <div class="card-body">
                <form @submit.prevent="submitChanges">
                    <div class="form-group row mb-3">
                        <label for="name" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                            <input v-model="formData.name" type="text" class="form-control" id="name" required />
                        </div>
                        <label for="description" class="col-sm-2 col-form-label">Description:</label>
                        <div class="col-sm-10">
                            <input v-model="formData.description" type="text" class="form-control" id="description"
                                required />
                        </div>
                        <label for="price" class="col-sm-2 col-form-label">Price:</label>
                        <div class="col-sm-10">
                            <input v-model="formData.price" type="number" step="0.01" class="form-control"
                                id="price" title="Please enter a valid number with up to two decimal places" required />
                        </div>
                        <label for="weight" class="col-sm-2 col-form-label">Weight:</label>
                        <div class="col-sm-10">
                            <input v-model="formData.weight" type="number" step="0.001" class="form-control"
                                id="weight" title="Please enter a valid number with up to two decimal places" required />
                        </div>
                        <div class="col-sm-3">
                            <label for="category" class="col-sm-2 col-form-label">Category:</label>
                            <select v-model="formData.category" class="form-select" id="category">
                                <option v-for="category in categories" :key="category._id" :value="category._id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit changes</button>
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
    name: 'ProductEdit',
    setup() {
        const toast = useToast();
        return {
            toast,
        };
    },
    data() {
        return {
            categories: [],
            product: null,
            formData: {
                name: '',
                description: '',
                price: '',
                weight: '',
                category: '',
            },
        };
    },
    methods: {
        async loadProduct() {
            try {
                const response = await axios.get(`http://localhost:3000/products/${this.$store.state.id}`);
                this.product = response.data;
                this.formData.name = this.product.name;
                this.formData.description = this.product.description;
                this.formData.weight = parseFloat(this.product.weight).toFixed(3);
                this.formData.price = parseFloat(this.product.price).toFixed(2);
                this.formData.category = this.product.category;
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            try {
                const response = await axios.get('http://localhost:3000/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        submitChanges() {
            const name = this.formData.name.trim();
            const description = this.formData.description.trim();
            const price = parseFloat(this.formData.price) + 0.0000001;
            const weight = parseFloat(this.formData.weight) + 0.0000001;
            const category = this.formData.category;
            if (!name || !description || !weight || !price || !category) {
                this.toast.warning('Please fill in all the required fields in the form.');
                return;
            }
            const body = {
                name: name,
                description: description,
                price: price,
                weight: weight,
                category: category
            };
            axios.put(`http://localhost:3000/products/${this.$store.state.id}`, body)
                .then(response => {
                    console.log('Product edited successfully:', response.data);
                    this.$router.push('/product-list');
                    this.toast.success('Product edited successfully!');
                    this.$store.commit('clearID');
                })
                .catch(error => {
                    this.toast.error('Error while editing product');
                    console.error('Error while editing product:', error);
                });
        },
    },
    mounted() {
        this.loadProduct();
    },
};
</script>

<style scoped></style>
