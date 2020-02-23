import Vue from 'vue';
import Vuex from 'vuex';
import CommandHistory from './modules/CommandHistory';
import Language from './modules/Language';
// import products from './modules/products'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// const myPlugin = store => {
//   // Called when store is initialized
//   console.log('my plugin start');
//   store.subscribe((mutation, state) => {
//     // Called after every mutation
//     // Mutation comes in the format `{ type, payload }`
//   });
// };
const myPlugin = (store) => {
  // Called when store is initialized
  console.log('my plugin start');
  store.subscribe(() => {
    // Called after every mutation
    // Mutation comes in the format `{ type, payload }`
  });
};
export default new Vuex.Store({
  modules: {
    CommandHistory,
    Language,
  },
  strict: debug,
  plugins: [myPlugin],
});
