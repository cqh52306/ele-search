/*
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-09-09 16:58:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-18 07:39:52
 */
import EleSearch from "./search.vue"

EleSearch.install = Vue => {
  Vue.component(EleSearch.name, EleSearch)
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(EleSearch)
}
export default EleSearch
