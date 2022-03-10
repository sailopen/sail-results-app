import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '/src/pages/HomePage.vue';
import ImportPage from '/src/pages/ImportPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/import', name: 'Import', component: ImportPage },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
