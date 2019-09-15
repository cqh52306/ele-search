/*
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-08-26 20:16:30
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-10 17:18:18
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')