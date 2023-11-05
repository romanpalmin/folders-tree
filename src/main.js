import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueStore from './store';

const app = createApp(App);
app.use(VueStore);
app.mount('#app');
