<template>
  <tr>
    <td>{{ index }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price }} zł</td>
    <td>{{ product.weight }} kg</td>
    <td>{{ category }}</td>
    <td>
      <button @click="addToCart" class="btn btn-primary">Add to cart</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product', 'category', 'index'],
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product);
    },
  },
};
</script>
  
<style scoped></style>
  