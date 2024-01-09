<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container mx-auto">
            <router-link to="/" class="navbar-brand">OnlineStore ADMIN</router-link>
            <i class="bi bi-cart3" style="font-size: 1.5rem; color: white;"></i>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav">
                    <router-link to="/product-list" class="nav-item nav-link">Manage Product List</router-link>
                    <router-link to="/order-list" class="nav-item nav-link">Unapproved Orders</router-link>
                    <router-link to="/order-list-by-state" class="nav-item nav-link">Order List</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'AppNavbar'
};
</script>
  
<style scoped></style>