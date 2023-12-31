<template>
  <div id="app">
    <header>
      <router-link to="/product-list">Product List</router-link>
      <router-link to="/order-list">Order List</router-link>
      <router-link to="/shopping-cart">Shopping Cart</router-link>
    </header>
    <router-view />
    <footer>
      <!-- Add any footer content here -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

header {
  background-color: #333;
  padding: 15px;
}

header a {
  margin: 0 15px;
  color: white;
  text-decoration: none;
}

footer {
  margin-top: 20px;
  padding: 10px;
  background-color: #eee;
}
</style>
