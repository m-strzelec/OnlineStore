<template>
  <tr>
    <td>{{ index }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price }} zł</td>
    <td>{{ product.weight }} kg</td>
    <td>{{ product.category }}</td>
    <td>
      <button @click="addToCart" class="btn btn-primary">Kup</button>
    </td>
  </tr>
</template>
  

  
<script>
export default {
  props: {
    product: Object,
    index: Number,
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product);
    },
  },
};
</script>
  
<style scoped></style>
  