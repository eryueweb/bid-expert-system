import VueRouter from 'vue-router';
import store from '@/store';
const routes = [
  {
    path: '/',
    name: 'system',
    component: () => import('@/views/systemView/index.vue'),
    meta: {
      title: '专家库'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/registerView/registerView.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    component: () => import('@/views/personalInfoView/personalInfoView.vue'),
    meta: {
      title: '个人信息维护'
    }
  },
  {
    path: '/registerResult',
    name: 'registerResult',
    component: () => import('@/views/registerResultView/registerResultView.vue'),
    meta: {
      title: '注册结果'
    }
  }
];
const router = new VueRouter({
  base: '/',
  routes
});
router.beforeEach((to, from , next) => {
  store.dispatch('setMenuList');
  next();
});
export default router;