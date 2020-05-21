import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import { apolloProvider } from './plugins/apollo'

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
