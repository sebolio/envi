import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//vuesax para diseño
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)

//prism editor para editar los JSON
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles
Vue.component('PrismEditor', PrismEditor);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
