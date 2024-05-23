import { createApp } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import store from '@/store';
import vuetify from './plugins/vuetify';
import router from './router';
import App from '@/App.vue';
import icon from '@/components/common/icon.vue';
import homeIcon from '@/components/common/homeIcon.vue';
import profileIcon from '@/components/common/profileIcon.vue';
import searchBankIcon from '@/components/common/searchBankIcon.vue';
import Navbar from '@/components/common/Navbar.vue';
import './index.css';

store.use(piniaPluginPersistedstate);

const app = createApp(App);

app.component('icon', icon);
app.component('homeIcon', homeIcon);
app.component('profileIcon', profileIcon);
app.component('searchBankIcon', searchBankIcon);
app.component('navbar', Navbar);
app.use(store).use(router).use(vuetify).mount('#app');
