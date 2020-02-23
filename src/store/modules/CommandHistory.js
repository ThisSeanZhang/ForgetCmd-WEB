// import storage from 'store';

// initial state
const state = {
  cmdHistory: {},
  all: [],
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
  newRecord(ch, snapshot) {
    if (!snapshot || !snapshot.fullName) return;
    let currentCmdHis = ch.cmdHistory[snapshot.fullName];
    // 如果不存在的话
    if (!currentCmdHis) {
      ch.cmdHistory = { ...ch.cmdHistory, [snapshot.fullName]: [] };
      currentCmdHis = ch.cmdHistory[snapshot.fullName];
    }
    currentCmdHis.unshift(snapshot);
    currentCmdHis.splice(10);
  },
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
