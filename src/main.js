import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 

import Menu from 'primevue/menu';

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
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
const app = createApp(App);
app.use(PrimeVue);
app.component("Menubar",Menubar)
app.component("Badge",Badge)
app.component("InputText",InputText)
app.component("Avatar",Avatar)
app.component("TabMenu",TabMenu)

app.directive('ripple', Ripple);

app.component("DataTable",DataTable)
app.component("Column",Column)
app.component("ColumnGroup",ColumnGroup)
app.component("Row",Row)
app.component("Menu",Menu)
app.component("Button",Button)
app.component("Dialog",Dialog)

app.use(store)
app.use(router)
app.mount('#app')
