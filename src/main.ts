import { createApp } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import store from '@/store';
import router from './router';
import App from '@/App.vue';
import icon from '@/components/common/icon.vue';
import homeIcon from '@/components/common/homeIcon.vue';
import Navbar from '@/components/common/Navbar.vue';
import './index.css';

store.use(piniaPluginPersistedstate);

const app = createApp(App);

app.component('icon', icon);
app.component('homeIcon', homeIcon);
app.component('navbar', Navbar);
app.use(store).use(router).mount('#app');
