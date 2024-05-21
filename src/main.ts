import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from '@/App.vue';
import icon from '@/components/common/icon.vue';
import './index.css';

const pinia = createPinia();
const app = createApp(App);

app.component('icon', icon);
app.use(pinia).use(router).mount('#app');
