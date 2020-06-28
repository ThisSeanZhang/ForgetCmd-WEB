import Vue from 'vue';
import Vuex from 'vuex';
import CommandHistory from './modules/CommandHistory';
import Language from './modules/Language';
import myPlugin from './LocalStoreageInitPlugin';
import UserInfo from './modules/UserInfo';
// import products from './modules/products'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    CommandHistory,
    Language,
    UserInfo,
  },
  strict: debug,
  plugins: [myPlugin],
});
