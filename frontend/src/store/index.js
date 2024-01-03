import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
  },
  mutations: {
    updateData(state, newData) {
      const existingProductIndex = state.products.findIndex(product => product.productId === newData);
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity++;
      } else {
        axios.get(`http://localhost:3000/products/${newData}`)
          .then(response => {
            const chosenProduct = response.data;
  
            state.products.push({
              productId: chosenProduct._id,
              productName: chosenProduct.name,
              quantity: 1,
              price: chosenProduct.price,
            });
          })
          .catch(error => {
            console.error('Error fetching item to local storage:', error);
          });
      }
    },
  },
});

export default store;