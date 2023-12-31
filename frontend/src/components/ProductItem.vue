<template>
    <div>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>Cena: {{ product.price }} zł</p>
      <p>Kategoria: {{ product.category }}</p>
      <button @click="addToCart">Kup</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['product'],
    methods: {
      addToCart() {
        // Metoda dodająca produkt do koszyka
      },
    },
  };
  </script>
  
  <style>
 
  </style>
  