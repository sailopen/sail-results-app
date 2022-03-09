import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '/src/components/HomePage.vue';
import ImportPage from '/src/components/ImportPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/import', name: 'Import', component: ImportPage },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
