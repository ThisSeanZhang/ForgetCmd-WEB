import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/views/Search.vue';
import Command from '@/views/Command.vue';
import CreateCommit from '@/views/CreateCommit.vue';
import WaitVerifyCmdLog from '@/views/WaitVerifyCmdLog.vue';
import PerViewCommand from '@/views/PerViewCommand.vue';
import SnapshotInject from '@/views/SnapshotInject.vue';
import tempBaseView from '@/views/tempBaseView.vue';
import ReviewCommit from '@/views/ReviewCommit.vue';
import PaddingCommand from '@/views/PaddingCommand.vue';
import ListCommit from '@/views/commit/ListCommit.vue';
import DeveloperRouter from './DeveloperRouter';
import AdminRouter from './AdminRouter';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
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
    { // 填充命令
      path: '/cmd/padding/:cid',
      name: 'padding',
      component: PaddingCommand,
    },
    { // 从某个本地快照复原 填充命令
      path: '/cmd/padding/:cid/local-snap/:snapIndex',
      name: 'local-snap-padding',
      component: PaddingCommand,
    },
    { // 对存在的命令进行创建请求
      path: '/cmd/:cid/commits/create',
      name: 'create-commit',
      component: CreateCommit,
    },
    { // 创建新命令的请求
      path: '/commits/create',
      name: 'create-commit-new',
      component: CreateCommit,
    },
    {
      path: '/commits',
      name: 'list-commit',
      component: ListCommit,
    },
    {
      path: '/commits/cmd/:cid/review',
      name: 'cmd-review-commit',
      component: ReviewCommit,
    },
    {
      path: '/commits/:ccids/review',
      name: 'review-commit',
      component: ReviewCommit,
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
    ...DeveloperRouter,
    ...AdminRouter,
  ],
});
