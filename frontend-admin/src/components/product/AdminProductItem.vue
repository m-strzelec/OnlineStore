<template>
  <tr>
    <td>{{ index }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price.toFixed(2) }} zł</td>
    <td>{{ product.weight.toFixed(3) }} kg</td>
    <td>{{ category }}</td>
    <td>
      <button @click="editProduct" class="btn btn-primary"><i class="bi bi-pencil-fill"></i></button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'AdminProductItem',
  props: ['product', 'category', 'index'],
  methods: {
    editProduct() {
      this.$emit('edit-product', this.product);
    },
  },
};
</script>
  
<style scoped></style>
  