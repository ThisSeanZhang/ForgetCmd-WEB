import Vue from 'vue';
import { Message } from 'element-ui';
// import { Notification } from 'element-ui';

const COOKIE_KEEP = 1000 * 20;
let timeOutKey = null;
const emptyUser = {
  did: null,
  nickName: null,
  email: null,
  defaultProject: null,
  defaultFolder: null,
  signed: false,
  admin: false,
};
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
      localStorage.removeItem('DEVELOPER');
      clearTimeout(timeOutKey);
    } else {
      state.expTime = new Date().getTime() + COOKIE_KEEP;
      timeOutKey = setTimeout(() => {
        Object.keys(emptyUser).forEach(key => Vue.set(state, key, emptyUser[key]));
        // commit('FLASH_THE_INFO', emptyUser);
      }, COOKIE_KEEP);
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
  updateExpTime({ commit, state }) {
    if (!state.signed) return;
    clearTimeout(timeOutKey);
    timeOutKey = setTimeout(() => {
      commit('FLASH_THE_INFO', emptyUser);
    }, COOKIE_KEEP);
  },
  setUserInfo({ commit }, userInfo) {
    if (userInfo) {
      commit('FLASH_THE_INFO', { ...userInfo, signed: true });
    }
  },
  delUserInfo({ commit }) {
    commit('FLASH_THE_INFO', emptyUser);
  },
  removeSignedUser({ state, commit }) {
    if (!state.signed) return;
    commit('FLASH_THE_INFO', emptyUser);
    Message('登入信息已经过期了,访问非公开信息需要重新登陆哦');
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
