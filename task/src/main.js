import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
window.$ = window.jQuery = require('jquery');

createApp(App).use(router).use(VueSweetalert2).mount('#app')
