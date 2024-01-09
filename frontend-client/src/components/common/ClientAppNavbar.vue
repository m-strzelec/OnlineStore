<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container mx-auto">
            <router-link to="/" class="navbar-brand">OnlineStore CLIENT</router-link>
            <i class="bi bi-cart3" style="font-size: 1.5rem; color: white;"></i>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav">
                    <router-link to="/product-list" class="nav-item nav-link">Product List</router-link>
                    <router-link to="/shopping-cart" class="nav-item nav-link">Shopping Cart</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'ClientAppNavbar'
};
</script>
  
<style scoped></style>