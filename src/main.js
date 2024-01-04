import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 

import Menu from 'primevue/menu';
import FileUpload from 'primevue/fileupload';

import 'primeicons/primeicons.css'

//in main.js
import 'primevue/resources/themes/md-light-indigo/theme.css'

import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import PrimeVue from 'primevue/config';
import TabMenu from 'primevue/tabmenu';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Skeleton from 'primevue/skeleton';
import Card from 'primevue/card';

import Image from 'primevue/image';

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
app.component("Skeleton",Skeleton)
app.component("Card",Card)
app.component("Image",Image)
app.component("FileUpload",FileUpload)

app.use(store)
app.use(router)
app.mount('#app')
