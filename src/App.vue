<!--
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-08-26 20:16:30
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-12 19:29:35
 -->
<template>
  <div id="app">
    <div>搜索栏</div>
    <ele-search ref="searchBar" :config="searchBarConfig" :selections="selections" />
  </div>
</template>

<script>
import EleSearch from '../packages/ele-search/search';
const IS_AUTH = [{
  value: 'Y',
  label: '是'
},
{
  value: 'N',
  label: '否'
}]

export default {
  name: 'app',
  components: {
    EleSearch
  },
  data () {
    return {
      searchBarConfig: {
        labelw: '120px',
        searchForm: {
          sources: [
            { type: 'text', label: '客户姓名', value: '', prop: 'custName', rules: '' },
            { type: 'text', label: '证件号码', value: '', prop: 'certNo', rules: '' },
            { type: 'text', label: '手机号', value: '', prop: 'mobile', rules: '' },
            { type: 'datetimerangeOneMonth', label: '开始日期', value: '', prop: 'enterDate', rules: '' },
            { type: 'select', label: '是否授权', value: '', prop: 'authed', rules: '', options: IS_AUTH }
          ]
        },
        searchBtn: [
          {
            text: '查询',
            icon: 'el-icon-search',
            permissions: true,
            onClick: (data) => {
              this.searchForm = data
              this.toSearch(1, true)
            }
          },
          {
            text: '重置',
            icon: 'el-icon-refresh',
            permissions: true,
            onClick: (data) => { }
          }
        ],
        extendBtn: [
          {
            text: '新增',
            icon: '',
            disabled: () => {
              return false
            },
            permissions: true,
            onClick: (data) => {
              console.log('点击新增')
            }
          }
        ]
      }
    }
  },
  methods: {
    // 点击搜索按钮
    toSearch () {
      console.log('查询条件', this.searchForm)
    }
  }
}
</script>

<style lang="scss">
</style>
