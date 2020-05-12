import Vue from 'vue';
// import { Notification } from 'element-ui';

const COOKIE_KEEP = 1000 * 20;
let timeOutKey = null;
const state = {
  did: null,
  nickName: null,
  email: null,
  admin: false,
  signed: false,
  expTime: null,
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
      sessionStorage.removeItem('DEVELOPER');
      clearTimeout(timeOutKey);
    } else {
      sessionStorage.setItem('DEVELOPER', JSON.stringify(state));
      timeOutKey = setTimeout(() => {
        console.log('check online');
      }, COOKIE_KEEP);
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
  updateExpTime({ commit }) {
    
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
