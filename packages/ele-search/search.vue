<!--
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-09-04 09:45:56
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-12 17:59:54
 -->
<template>
  <div class="search-container">
    <el-form ref="searchRef" :inline="true" :model="config.searchForm" :label-width="config.labelw?config.labelw:'100px'">
      <el-form-item v-for="(searchItem,searchIndex) in config.searchForm.sources" :key="searchIndex" :label="searchItem.label" :prop=" 'sources['+searchIndex+'].value' " :rules="typeof searchItem.rules === 'function' ? searchItem.rules({searchData:searchBarData,current:searchItem,rulesData:rulesConData,onePass:relusOnePass}) : (searchItem.rules || []) ">
        <!-- 输入框 -->
        <el-input v-if="searchItem.type == 'text' " v-model="searchItem.value" :placeholder="'请输入' + searchItem.label" />
        <!-- 下拉选择框 -->
        <el-select v-else-if="searchItem.type == 'select' " v-model="searchItem.value" filterable clearable placeholder="请选择" @change="searchItem.handleChange && searchItem.handleChange(searchItem.value) || ''">
          <el-option v-for="(optionItem,optionIndex) in searchItem.options" :key="optionIndex" :label="optionItem.label" :value="optionItem.value" />
        </el-select>
        <el-select v-else-if="searchItem.type == 'select-special-option' " v-model="searchItem.value" filterable clearable placeholder="请选择" @change="searchItem.handleChange && searchItem.handleChange(searchItem.value) || ''">
          <el-option v-for="(optionItem,optionIndex) in searchItem.options" :key="optionIndex" :label="optionItem[searchItem.specialOptions.label]" :value="optionItem[searchItem.specialOptions.value]" />
        </el-select>
        <el-select v-else-if="searchItem.type == 'select-mult' " v-model="searchItem.value" filterable clearable multiple placeholder="请选择" @change="searchItem.handleChange && searchItem.handleChange(searchItem.value) || ''">
          <el-option v-for="(optionItem,optionIndex) in searchItem.options" :key="optionIndex" :label="optionItem[searchItem.specialOptions.label]" :value="optionItem[searchItem.specialOptions.value]" />
        </el-select>
        <!-- 日期选择框 -->
        <!-- <el-date-picker v-else-if=" searchItem.type == 'datetimerange' " :format="dateFormat" :value-format="dateFormat" v-model="searchItem.value" :default-time="['00:00:00', '23:59:59']" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" /> -->
        <OneMonth v-else-if=" searchItem.type == 'datetimerange' " v-model="searchItem.value" />
        <el-date-picker v-else-if=" searchItem.type == 'datetimerangeYYMMDD' " :picker-options="dateOptions" :format="dateFormatYYMMDD" :value-format="dateFormatYYMMDD" v-model="searchItem.value" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
        <el-date-picker v-else-if=" searchItem.type == 'datetimerangeData' " :picker-options="dateOptions" :format="dateFormat" :value-format="dateFormat" v-model="searchItem.value" :default-time="['00:00:00', '23:59:59']" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        <OneMonth v-else-if=" searchItem.type == 'datetimerangeOneMonth' " v-model="searchItem.value" />
        <el-date-picker v-else-if=" searchItem.type == 'threeDays' " v-model="searchItem.value" :picker-options="pickerOptions3" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期" default-time="00:00:00" />
        <!-- 月份 -->
        <el-date-picker v-else-if=" searchItem.type == 'monthYYMM'" :format="dateFormatYYMM" :value-format="dateFormatYYMM" v-model="searchItem.value" type="month" placeholder="请选择月份" />
        <!-- 天数段 start-->
        <FormDays v-else-if=" searchItem.type == 'datetimeOneToAnother' " v-model="searchItem.value" />
        <!-- 天数段 end-->
        <!-- 金额段 start-->
        <FormBalance v-else-if=" searchItem.type == 'amount' " v-model="searchItem.value" />
        <!-- 金额段 end-->
        <el-date-picker v-else-if=" searchItem.type == 'date' " :value-format="dateFormat" v-model="searchItem.value" type="date" placeholder="选择日期" />
        <el-date-picker v-else-if=" searchItem.type == 'dateYYMMDD' " :value-format="dateFormatYYMMDD" v-model="searchItem.value" type="date" placeholder="选择日期" />
        <!-- 单选按钮组 -->
        <el-radio-group v-else-if=" searchItem.type == 'radio' " v-model="searchItem.value">
          <el-radio v-for="(optionItem,optionIndex) in searchItem.options" :key="optionIndex" :label="optionItem" />
        </el-radio-group>
      </el-form-item>
      <!-- 中间按钮组 -->
      <el-row class="mt8 mb8 pb15 bottom-dotted tc">
        <el-button v-for="(searchBtnItem,btnIndex) in config.searchBtn" v-if="searchBtnItem.permissions" :disabled="searchBtnItem.disabled && searchBtnItem.disabled(searchBarData)" :key="btnIndex" :size="searchBtnItem.size || 'small' " :icon="searchBtnItem.icon || '' " :type="searchBtnItem.type || 'primary' " @click="searchBtnItem.icon === 'el-icon-refresh'?reset(searchBtnItem.onClick):toNext(searchBtnItem.onClick,searchBtnItem)">{{ searchBtnItem.text }}</el-button>
      </el-row>
      <!-- 底部扩展按钮组 -->
      <el-row v-if="config.extendBtn" class="mt15 mb15 bottom-right">
        <div class="b-l">已选中<span class="b-green">{{ selections ? selections.length : 0 }}</span>条记录</div>
        <div class="b-r">
          <span v-for="(searchBtnItem,btnIndex) in config.extendBtn" :key="btnIndex" style="padding-left:10px;">
            <!-- 下载模版 -->
            <a v-if="searchBtnItem.mode == 'download'" :href="searchBtnItem.downLoadUrl" download>
              <el-button v-if="searchBtnItem.permissions" :key="btnIndex" :size="searchBtnItem.size || 'small' " :icon="searchBtnItem.icon || '' " :type="searchBtnItem.type || 'primary' " @click="searchBtnItem.icon === 'el-icon-refresh'?reset(searchBtnItem.onClick):toNext(searchBtnItem.onClick,searchBtnItem)">{{ searchBtnItem.text }}</el-button>
            </a>
            <span v-else>
              <el-button v-if="searchBtnItem.permissions" :disabled="searchBtnItem.disabled && searchBtnItem.disabled(searchBarData)" :size="searchBtnItem.size || 'small' " :icon="searchBtnItem.icon || '' " :type="searchBtnItem.type || 'primary' " @click="searchBtnItem.icon === 'el-icon-refresh'?reset(searchBtnItem.onClick):toNext(searchBtnItem.onClick,searchBtnItem)">{{ searchBtnItem.text }}</el-button>
            </span>
          </span>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import FormDays from './days'
import FormBalance from './balance'
import OneMonth from './month'

function formatPropData (config) {
  const tempObj = {}
  config.searchForm.sources.map((item) => {
    tempObj[item.prop] = item.value
  })
  return tempObj
}

function formatRulesData (config) {
  const tempObj = {}
  let onePass = false
  config.searchForm.sources.map((item) => {
    if (typeof item.rules === 'function') {
      tempObj[item.prop] = item.value
    }
    if ((typeof item.rules === 'function') && (item.value != '')) {
      onePass = true
    }
  })
  return { tempObj, onePass }
}
// 组件默认值
function defaultValueFn (params) {
  params.searchForm.sources.map((item) => {
    if (params.defaultValue[item.prop]) {
      item.value = params.defaultValue[item.prop]
    }
  })
  return params
}

export default {
  name: 'ele-search',
  components: {
    FormDays,
    FormBalance,
    OneMonth
  },
  props: ['config', 'menuList', 'label', 'selectKeys', 'selections'],  // eslint-disable-line
  data () {
    return {
      dateFormat: 'yyyy-MM-dd HH:mm:ss',
      dateFormatYYMMDD: 'yyyy-MM-dd',
      dateFormatYYMM: 'yyyy-MM',
      searchBarData: {},
      rulesConData: {},
      relusOnePass: false,
      datePickerDom: '',
      oncedefault: true,
      dateOptions: {
        disabledDate (time) {
          // 禁止选择当日之后的时间
          return time.getTime() > Date.now()
        },
        onPick (period) {
          const start = new Date(period.minDate)
          const end = new Date()

          // 如果起始时间加上30天小于当天,则结束时间取当前加30天后的日期
          if ((start.getTime() + 3600 * 1000 * 24 * 30) < Date.now()) {
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
          }

          // 更新值关闭组件
          // this.datePickerDom.picker.$emit('pick', [start, end])
        }
      },
      pickerOptions3: {
        disabledDate: time => {
          return (
            time.getTime() > Date.now() + 1000 * 60 * 60 * 24 * 2 || time.getTime() < Date.now() - 1000 * 60 * 60 * 24
          )
        }
      }
    }
  },
  watch: {
    config: {
      handler (newValue) {
        // 组装数据
        this.searchBarData = formatPropData(newValue)
        // 组装其一必填数据
        this.rulesConData = formatRulesData(newValue).tempObj
        // 是否通过其一必填校验
        this.relusOnePass = formatRulesData(newValue).onePass
        // 初始化的值
        if (this.oncedefault && newValue.defaultValue) {
          defaultValueFn(newValue)
          this.oncedefault = false
        }
      },
      deep: true
    }
  },
  methods: {
    toNext (onClick, currentItem) {
      if (currentItem.icon == 'el-icon-search' || currentItem.isUseSearch) {
        this.$refs['searchRef'].validate(valid => {
          if (valid) {
            // 参数放到浏览器地址
            this.$router.push({
              path: this.$route.path,
              query: {
                ...this.searchBarData
              }
            })
            this.clearValidate()
            onClick && onClick(this.searchBarData)
          } else {
            this.$message({
              type: 'warning',
              message: '请检查必填参数'
            })
          }
        })
      } else {
        onClick && onClick(this.searchBarData)
      }
    },
    // 重置
    reset () {
      this.$refs['searchRef'].resetFields()
    },
    clearValidate () {
      this.$refs['searchRef'].clearValidate()
    }
  }
}
</script>
<style lang='scss'>
@import "./variables.scss";
// 搜索表单input样式
.search-container {
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    min-height: 32px;
    font-size: 13px;
  }
  .el-form-item--small .el-form-item__error {
    z-index: 999;
  }
  .bottom-dotted {
    border-bottom: 1px dotted #d9d9d9;
  }
  .tc {
    text-align: center;
  }
  .bottom-right {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .b-l {
      width: 200px;
      text-align: left;
      font-size: 14px;

      .b-green {
        color: #79a6ff;
      }
    }

    .b-r {
      flex: 1;
      text-align: right;
    }
  }
  .mt8 {
    margin-top: 8px;
  }

  .mb8 {
    margin-bottom: 8px;
  }

  .mt15 {
    margin-top: 15px;
  }
  .pb15 {
    padding-bottom: 15px;
  }
  .mb15 {
    margin-bottom: 15px;
  }

  .el-input__inner {
    max-width: 220px;
    width: 220px;
  }

  & > form.el-form--inline > .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }

  & > .el-form .el-date-editor {
    width: auto;
  }
  .el-form-item > .el-form-item__content {
    .el-date-editor .el-range-separator {
      width: 3%;
    }

    .el-input__icon {
      width: 18px;
    }
  }
}
</style>
