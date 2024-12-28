import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomePage.vue';
import newArticle from '@/components/newArticle.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'newArticle',
    component: newArticle
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

