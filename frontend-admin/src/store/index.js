import { createStore } from 'vuex';

const store = createStore({
  state: {
    id: 'undefinedId',
  },
  mutations: {
    clearID(state) {
      state.id = 'undefinedId';
    },
    updateData(state, newData) {
      state.id = newData;
    },
  },
});

export default store;