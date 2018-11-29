import Vue from 'vue'
import App from './App'
import toastRegistry from './toast/index'
import globalPlugin from './plugins/global'
Vue.config.productionTip = false

import utils from './utils'

Vue.prototype.post = utils.post
import coupon from 'v-coupon'
Vue.use(coupon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
