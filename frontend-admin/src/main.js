import { createApp } from 'vue';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

createApp(App)
    .use(router)
    .use(store)
    .use(Toast, {
        position: 'top-right',
        timeout: 3000,
    })
    .mount('#app');
