import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import swal from 'sweetalert'
import wysiwyg from 'vue-wysiwyg'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAngry, faGrinBeam} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faAngry, faGrinBeam)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.use(wysiwyg, {
  hideModules: {
    "image": true
  }
}); 

Vue.prototype.$axios = axios.create(
  {
    baseURL: 'http://35.240.195.13'
  }
)
Vue.prototype.$swal = swal;
Vue.prototype.$wysiwyg = wysiwyg;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
