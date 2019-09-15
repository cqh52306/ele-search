/*
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-09-09 16:58:55
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-12 14:10:44
 */
import EleTables from "./table.vue"

EleTables.install = Vue => {
  Vue.component(EleTables.name, EleTables)
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(EleTables)
}
export default EleTables
