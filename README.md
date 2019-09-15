<!--
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-08-26 20:16:30
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-12 19:30:06
 -->

# ele-search

## 一、使用方式

- 1、安装

  ```shell
  npm install ele-search
  或者
  yarn add ele-search
  ```

- 2、在项目中的`main.js`文件中引入

  ```js
  import EleSearch from "ele-search"
  import "ele-search/lib/ele-search.css"
  Vue.use(EleSearch)
  ```

* 3、组件中使用

  ```html
  <template>
    <div id="app">
      <div>搜索栏</div>
      <ele-search
        ref="searchBar"
        :config="searchBarConfig"
        :selections="selections"
      />
    </div>
  </template>

  <script>
    export default {
      name: "app",
      data() {
        return {
          searchBarConfig: {
            labelw: "120px",
            searchForm: {
              sources: [
                {
                  type: "text",
                  label: "客户姓名",
                  value: "",
                  prop: "custName",
                  rules: ""
                },
                {
                  type: "text",
                  label: "证件号码",
                  value: "",
                  prop: "certNo",
                  rules: ""
                },
                {
                  type: "text",
                  label: "手机号",
                  value: "",
                  prop: "mobile",
                  rules: ""
                },
                {
                  type: "datetimerangeOneMonth",
                  label: "开始日期",
                  value: "",
                  prop: "enterDate",
                  rules: ""
                },
                {
                  type: "select",
                  label: "是否授权",
                  value: "",
                  prop: "authed",
                  rules: "",
                  options: IS_AUTH
                }
              ]
            },
            searchBtn: [
              {
                text: "查询",
                icon: "el-icon-search",
                permissions: true,
                onClick: data => {
                  this.searchForm = data
                  this.toSearch(1, true)
                }
              },
              {
                text: "重置",
                icon: "el-icon-refresh",
                permissions: true,
                onClick: data => {}
              }
            ],
            extendBtn: [
              {
                text: "新增",
                icon: "",
                disabled: () => {
                  return false
                },
                permissions: true,
                onClick: data => {
                  console.log("点击新增")
                }
              }
            ]
          }
        }
      }
    }
  </script>
  ```

## 二、主要的`API`

|     参数     |   类型   | 说明             | 默认值 |
| :----------: | :------: | ---------------- | ------ |
| `selections` | `Object` | 表格选中的条数   | 空     |
|   `config`   | `Object` | 配置项，具体如上 | `{}`   |
