import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//vuesax para diseño
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
