
// initial state
const state = {
  langs: [],
};

// getters
const getters = {};

// actions
const actions = {
  getAllProducts({ commit }) {
    commit('setProducts', {});
  },
};
/* eslint no-param-reassign: ["error", { "props": false }] */
// mutations
const mutations = {
  setProducts(data, products) {
    data.all = products;
  },

  decrementProductInventory(s, { id }) {
    const product = s.all.find(p => p.id === id);
    product.inventory -= 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
