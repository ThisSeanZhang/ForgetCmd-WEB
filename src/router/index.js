import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/views/Search.vue';
import Command from '@/views/Command.vue';
import CreateCommit from '@/views/CreateCommit.vue';
import WaitVerifyCmdLog from '@/views/WaitVerifyCmdLog.vue';
import PerViewCommand from '@/views/PerViewCommand.vue';
import SnapshotInject from '@/views/SnapshotInject.vue';
import tempBaseView from '@/views/tempBaseView.vue';
import PaddingCommand from '@/views/PaddingCommand.vue';

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
      path: '/cmd/padding',
      name: 'padding',
      component: PaddingCommand,
    },
    {
      path: '/cmd',
      name: 'cmd',
      component: tempBaseView,
    },
    {
      path: '/cmds/:cid',
      name: 'command',
      component: Command,
    },
    {
      path: '/commits/create',
      name: 'create-commit',
      component: CreateCommit,
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
