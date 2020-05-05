import Vue from 'vue';

const state = {
  did: null,
  nickName: null,
  email: null,
  admin: false,
  signed: false,
};
/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
const getters = {
  signed(state) {
    return state.signed;
  },
  nickName() {
    return state.nickName;
  },
  did() {
    return state.did;
  },
};
const mutations = {
  FLASH_THE_INFO(state, info) {
    state.did = info.did;
    state.nickName = info.nickName;
    state.email = info.email;
    state.signed = info.signed;
    state.admin = info.admin;
    // 存入浏览器
    if (info.did === null) {
      localStorage.removeItem('DEVELOPER');
    } else {
      localStorage.setItem('DEVELOPER', JSON.stringify(state));
    }
  },
  initDeveloper(state, devStr) {
    const developer = JSON.parse(devStr);
    Object.keys(developer || {}).forEach((key) => {
      Vue.set(state, key, developer[key] || null);
    });
  },
};

const actions = {
  setUserInfo({ commit }, userInfo) {
    if (userInfo) {
      commit('FLASH_THE_INFO', { ...userInfo, signed: true });
    }
  },
  delUserInfo({ commit }) {
    commit('FLASH_THE_INFO', {
      did: null,
      nickName: null,
      email: null,
      defaultProject: null,
      defaultFolder: null,
      signed: false,
      admin: false,
    });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
