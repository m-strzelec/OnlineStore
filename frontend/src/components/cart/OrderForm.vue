<template>
  <div class="card mx-auto my-4">
    <h4 class="card-header">Order Form</h4>
    <div class="card-body">
      <form @submit.prevent="submitOrder">
        <div class="form-group row mb-3">
          <label for="username" class="col-sm-2 col-form-label">Username:</label>
          <div class="col-sm-10">
            <input v-model="formData.username" type="text" class="form-control" id="username" required />
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="email" class="col-sm-2 col-form-label">Email:</label>
          <div class="col-sm-10">
            <input v-model="formData.email" type="email" class="form-control" id="email" required />
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="phone" class="col-sm-2 col-form-label">Phone:</label>
          <div class="col-sm-10">
            <input v-model="formData.phone" type="tel" class="form-control" id="phone" pattern="^\d{9}$" required />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit Order</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderForm',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        phone: '',
      },
    };
  },
  methods: {
    submitOrder() {
      this.$emit('submitOrder', this.formData);
    },
  },
};
</script>

<style scoped>
.card {
  width: 60%;
}
</style>

  