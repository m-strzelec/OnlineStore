<template>
    <div>
        <h1>Welcome to OnlineStore</h1>
        <p>
            Manage the application with just a few mouse clicks.
        </p>
        <router-link to="/product-list" class="btn btn-primary">Manage products</router-link>
        <div>
            <a href="http://localhost:8080" class="btn btn-primary mt-3">
                Go to client view
            </a>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'AdminHomePage',
};
</script>
  
<style scoped></style>