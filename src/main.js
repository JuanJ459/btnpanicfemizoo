import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

window.$ = window.jQuery = require('jquery');
window.HOST = 'https://btnpanicfemizoo.herokuapp.com';

import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App).use(router);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDp3Ud3SixagW8bJOwtosy5bBMB5JRNS_k',
    },
}).mount('#app')
