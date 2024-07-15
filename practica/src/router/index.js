import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RequestsView from '../views/RequestsView.vue';
import OffersView from '../views/OffersView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsView
    },
    {
      path: '/offers',
      name: 'offers',
      component: OffersView
    }
  ]
});

export default router;
