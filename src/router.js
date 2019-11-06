import Vue from 'vue';
import Router from 'vue-router';
import Search from './views/Search.vue';
import Command from './views/Command.vue';
import CommandCommit from './views/CommandCommit.vue';
import WaitVerifyCmdLog from './views/WaitVerifyCmdLog.vue';
import PerViewCommand from './views/PerViewCommand.vue';
import SnapshotInject from './views/SnapshotInject.vue';

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
      path: '/commits/cmd-add',
      name: 'command-commit',
      component: CommandCommit,
    },
    {
      path: '/commits/cmds',
      name: 'wait-verify',
      component: WaitVerifyCmdLog,
    },
    {
      path: '/commits/cmds/:cid',
      name: 'per-view',
      component: PerViewCommand,
    },
    {
      path: '/snapshots/:sid/inject',
      name: 'snapshots-inject',
      component: SnapshotInject,
    },
  ],
});
