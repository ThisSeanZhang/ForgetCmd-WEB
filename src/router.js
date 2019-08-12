import Vue from 'vue';
import Router from 'vue-router';
import Search from './views/Search.vue';
import Command from './views/Command.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search,
      meta: {
        title: 'Forget? For Get!',
      },
    },
    {
      path: '/cmds/:cid',
      name: 'command',
      component: Command,
    },
  ],
});
