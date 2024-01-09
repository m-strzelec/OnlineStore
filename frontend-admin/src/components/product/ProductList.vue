<template>
    <div class="container mt-5">
        <h1>Product List</h1>
        <div class="my-3 form-group row justify-content-center">
            <label for="productNameFilter" class="col-sm-1 col-form-label">Product:</label>
            <div class="col-sm-5">
                <input v-model="productNameFilter" type="text" class="form-control" id="productNameFilter"
                    placeholder="Input part or full title of the product" />
            </div>
            <label for="categoryFilter" class="col-sm-1 col-form-label">Category:</label>
            <div class="col-sm-3">
                <select v-model="categoryFilter" class="form-select" id="categoryFilter">
                    <option value="">All Categories</option>
                    <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}
                    </option>
                </select>
            </div>
        </div>
        <table class="table table-striped table-bordered table-hover">
            <thead class="table-dark">
                <tr>
                    <th scope="row">#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="align-middle">
                <ProductItem v-for="(product, index) in filteredProducts" :key="product._id" :product="product"
                    :category="getCategoryName(product.category)" :index="index + 1"
                    @edit-product="editProduct(product)" />
            </tbody>
        </table>
    </div>
</template>
  
<script>
import axios from 'axios';
import _ from 'lodash';
import { useToast } from 'vue-toastification';
import ProductItem from './ProductItem.vue';

export default {
    name: 'ProductList',
    setup() {
        const toast = useToast();
        return {
            toast,
        };
    },
    data() {
        return {
            categories: [],
            products: [],
            filteredProducts: [],
            productNameFilter: '',
            categoryFilter: '',
        };
    },
    components: {
        ProductItem,
    },
    methods: {
        editProduct(product) {
            try {
                this.$store.commit('updateData', product._id);
                this.$router.push('/product-edit');
                this.toast.info(`Product "${product.name}" available to edit`);
            } catch (error) {
                this.toast.error(`Error: "${error}"`);
            }
        },
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/products');
                this.products = response.data;
                this.applyFilters();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async fetchCategories() {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        getCategoryName(categoryId) {
            const category = this.categories.find((c) => c._id === categoryId);
            return category ? category.name : 'Unknown';
        },
        applyFilters() {
            this.filteredProducts = _.filter(this.products, (product) => {
                const nameMatch = product.name.toLowerCase().includes(this.productNameFilter.toLowerCase());
                const categoryMatch = !this.categoryFilter || product.category === this.categoryFilter;
                return nameMatch && categoryMatch;
            });
        },
    },
    watch: {
        productNameFilter: 'applyFilters',
        categoryFilter: 'applyFilters',
    },
    mounted() {
        this.fetchProducts();
        this.fetchCategories();
    },
};
</script>
  
<style scoped></style>
  