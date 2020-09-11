import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Pagination from './components/Pagination'

Vue.config.productionTip = false
Vue.component('app-pagination', Pagination)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
