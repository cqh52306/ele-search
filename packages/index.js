/*
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-09-09 16:58:55
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-12 14:16:19
 */
import EleSearch from './ele-search';

const components = [EleSearch];

// 定义 install 方法
const install = (Vue) => {
    // 判断是否已经安装
    if (Vue.installed) {
        return;
    }
    // 遍历并注册全局组件
    components.map((component) => {
        Vue.component(component.name, component);
    });
};

// 判断是否直接引入文件的方式
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...components,
};