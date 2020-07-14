
import DeveloperManage from '@/views/developer/DeveloperManage.vue';
import DeveloperCommitHistory from '@/views/developer/DeveloperCommitHistory.vue';
import DeveloperSnap from '@/views/developer/DeveloperSnap.vue';

export default [
  { // 用户个人页面
    path: '/developer/:did',
    name: 'developer-manage',
    component: DeveloperManage,
    children: [
      {
        path: 'commits',
        component: DeveloperCommitHistory,
      },
      {
        path: 'snapshots',
        component: DeveloperSnap,
      },
    ],
  },
];
