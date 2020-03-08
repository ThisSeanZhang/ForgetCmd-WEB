import Vue from 'vue';

// initial state
const state = {
  lang: 'zh',
  langs: [],
};

/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
// getters
const getters = {
  allLangs: state => state.langs || [],
  lang: state => (state.langs.includes(state.lang) ? state.lang : 'zh'),
  langDesc: state => (state.langs.filter(lang => lang.key === state.lang)[0].desc || ''),
};

// actions
const actions = {
  updateLang({ commit }, lang) {
    commit('initLang', lang);
  },
};
/* eslint no-param-reassign: ["error", { "props": false }] */
// mutations
const mutations = {
  initLangs(state, messages) {
    const langs = Object.keys(messages) || [];
    // 设置默认可选语言
    Vue.set(state, 'langs',
      langs.map(lang => ({ key: lang, desc: messages[lang].desc })));
  },
  upadteLang(state, lang) {
    // 设置默认可选语言
    Vue.set(state, 'lang', lang);
    localStorage.setItem('LANG_KEY', lang);
  },
  initLang(state, lang) {
    // 设置默认可选语言
    console.log(lang);
    Vue.set(state, 'lang', lang);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
