<template>
  <div id="app">
    <app-navbar></app-navbar>
    <div class="container" style="margin-top: 80px ;">
      <router-view />
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNavbar from './components/common/AppNavbar.vue';
import AppFooter from './components/common/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
