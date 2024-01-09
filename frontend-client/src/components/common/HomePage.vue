<template>
    <div>
        <h1>Welcome to OnlineStore</h1>
        <p>
            Explore our wide range of products, place orders, and enjoy a seamless shopping experience.
        </p>
        <router-link to="/product-list" class="btn btn-primary">Start Shopping</router-link>
        <div>
            <a href="http://localhost:8081" class="btn btn-primary mt-3">
                Go to admin view
            </a>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'HomePage',
};
</script>
  
<style scoped></style>
  