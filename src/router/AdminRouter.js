
import AdminManage from '../views/admin/AdminManage.vue';
import AdminCommitHistory from '../views/admin/AdminCommitHistory.vue';
import AdminCommand from '../views/admin/AdminCommand.vue';
import AdminSnap from '../views/admin/AdminSnap.vue';

export default [
  { // 用户个人页面
    path: '/admin',
    name: 'admin-manage',
    component: AdminManage,
    children: [
      {
        path: 'commits',
        component: AdminCommitHistory,
      },
      {
        path: 'commands',
        component: AdminCommand,
      },
      {
        path: 'snapshouts',
        component: AdminSnap,
      },
    ],
  },
];
