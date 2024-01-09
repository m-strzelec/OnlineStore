import { createStore } from 'vuex';

const store = createStore({
  state: {
    id: '',
  },
  mutations: {
    clearID(state) {
      state.id = '';
    },
    updateData(state, newData) {
      state.id = newData;
    },
  },
});

export default store;