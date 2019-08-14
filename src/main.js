import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
// import {library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import * as solid from '@fortawesome/fontawesome-free-solid'
// import * as regular from '@fortawesome/fontawesome-free-regular'
// import * as brands from '@fortawesome/fontawesome-free-brands'

Vue.config.productionTip = false

initAxios()

initFontawesome()

new Vue({
    render: h => h(App)
}).$mount('#app')

function initAxios () {
    axios.defaults.timeout = 5000
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API

    console.log(process.env)

    Vue.use(VueAxios, axios)
}

function initFontawesome () {
    Vue.component('font-awesome-icon', FontAwesomeIcon)
}
