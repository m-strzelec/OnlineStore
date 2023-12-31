import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ... dane stanu, np. koszyk, zamówienie, dane kontaktowe
  },
  mutations: {
    // ... mutacje do modyfikacji stanu
  },
  actions: {
    // ... akcje do obsługi logiki biznesowej
  },
  getters: {
    // ... gettery do pobierania danych ze stanu
  },
});
