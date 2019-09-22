import Vue from 'vue';
import Router from 'vue-router';
import Search from './views/Search.vue';
import Command from './views/Command.vue';
import CommandAdd from './views/CommandAdd.vue';
import WaitVerifyCmdLog from './views/WaitVerifyCmdLog.vue';
import PerViewCommand from './views/PerViewCommand.vue';

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
    {
      path: '/add/cmds',
      name: 'Command-add',
      component: CommandAdd,
    },
    {
      path: '/verify/cmds',
      name: 'wait-verify',
      component: WaitVerifyCmdLog,
    },
    {
      path: '/verify/cmds/:cid',
      name: 'per-view',
      component: PerViewCommand,
    },
  ],
});
