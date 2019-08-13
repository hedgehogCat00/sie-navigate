import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

Vue.config.productionTip = false

axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

console.log(process.env)

Vue.use(VueAxios, axios)

new Vue({
    render: h => h(App)
}).$mount('#app')
