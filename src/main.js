import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ProgressSpinner from 'primevue/progressspinner';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 

import Chart from 'primevue/chart';

import Menu from 'primevue/menu';
import ToastService from 'primevue/toastservice';
import "primeflex/primeflex.css";

import 'primeicons/primeicons.css'

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
import MultiSelect from 'primevue/multiselect';
import Password from 'primevue/password';
import Listbox from 'primevue/listbox';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Message from 'primevue/message';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import ScrollPanel from 'primevue/scrollpanel';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';

// import as directive
import BadgeDirective from 'primevue/badgedirective';


const app = createApp(App);

app.use(PrimeVue,{ripple:true});
app.use(ToastService);
app.use(ConfirmationService);

app.component("Menubar",Menubar)
app.component("ConfirmDialog",ConfirmDialog)

app.component("Badge",Badge)
app.component("InputText",InputText)
app.component("Avatar",Avatar)
app.component("TabMenu",TabMenu)
app.component("InputNumber",InputNumber)

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
app.component("MultiSelect",MultiSelect)
app.component("Listbox",Listbox)
app.component("Dropdown",Dropdown)
app.component("Toast",Toast)
app.component("ConfirmPopup",ConfirmPopup)
app.component("Message",Message)
app.component("Password",Password)
app.component("Checkbox",Checkbox)
app.component("ProgressSpinner",ProgressSpinner)

app.component("ScrollPanel",ScrollPanel)
app.component("Carousel",Carousel)
app.component("Tag",Tag)
app.component("Chart",Chart)


app.directive('badge', BadgeDirective);

app.use(store)
app.use(router)
app.mount('#app')
