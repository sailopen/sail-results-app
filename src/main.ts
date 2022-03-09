import { createApp } from 'vue';
import App from './App.vue';

import FileUpload from './components/FileUpload.vue';

import './index.css';
import router from './router';

createApp(App).use(router).component('FileUpload', FileUpload).mount('#app');
