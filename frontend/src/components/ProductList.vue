<template>
  <div>
    <h1>Product List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nazwa</th>
          <th>Opis</th>
          <th>Cena</th>
          <th>Waga</th>
          <th>Kategoria</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <ProductItem v-for="(product, index) in products" :key="product.id" :product="product" :index="index + 1"
          @add-to-cart="addToCart" />
      </tbody>
    </table>
    <router-link to="/shopping-cart">Go to Cart</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from '../components/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      // ... inne dane stanu
    };
  },
  methods: {
    addToCart(product) {
      // Metoda dodająca produkt do koszyka
      console.log(`Dodano do koszyka: ${product.name}`);
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
  
<style scoped></style>
  