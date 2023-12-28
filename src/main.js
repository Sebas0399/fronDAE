import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'primeicons/primeicons.css'

//in main.js
import 'primevue/resources/themes/lara-light-indigo/theme.css'

import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import PrimeVue from 'primevue/config';
import TabMenu from 'primevue/tabmenu';

const app = createApp(App);
app.use(PrimeVue);
app.component("Menubar",Menubar)
app.component("Badge",Badge)
app.component("InputText",InputText)
app.component("Avatar",Avatar)
app.component("TabMenu",TabMenu)

app.directive('ripple', Ripple);

app.use(store)
app.use(router)
app.mount('#app')
