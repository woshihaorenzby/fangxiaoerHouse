import Vue from 'vue'
import App from './App'

import request from './common/request.js'
import api from './api/index.js'
import url from './common/config.js'
import cuCustom from './colorui/components/cu-custom.vue'


Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
App.mpType = 'app'

const app = new Vue({
    ...App,
})

app.$mount()