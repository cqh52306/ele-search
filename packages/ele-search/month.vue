<!--
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-09-12 14:24:50
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-12 17:59:46
 -->
<template>
  <div class="one-block">
    <el-date-picker v-model="localValue" :picker-options="pickerOptions" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
  </div>
</template>

<script>
// 深度复制
function deepCopy (value) {
  let datas = JSON.stringify(value)
  datas = JSON.parse(datas)
  return datas
}

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: ['value', 'month'],   // eslint-disable-line
  data () {
    return {
      localValue: '',
      selectDate: '',
      once: false,
      // 日期选择范围在一个月内
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectDate = minDate.getTime()
          if (maxDate) {
            this.selectDate = ''
          }
        }, disabledDate: (time) => {
          if (this.selectDate !== '') {
            const one = 30 * 24 * 3600 * 1000
            const minTime = this.selectDate - one
            const maxTime = this.selectDate + one
            // return time.getTime() < minTime || time.getTime() > maxTime || time.getTime() > Date.now()
            return time.getTime() < minTime || time.getTime() > maxTime
          }
          // 禁止选择当日之后的时间
          // return time.getTime() > Date.now()
        }
      }
    }
  },
  watch: {
    localValue: {
      handler (newValue) {
        if (Array.isArray(newValue) && newValue.length > 1) {
          const tempNewValue = deepCopy(newValue)
          tempNewValue[0] = tempNewValue[0] + ' 00:00:00'
          tempNewValue[1] = tempNewValue[1] + ' 23:59:59'
          this.$emit('input', tempNewValue)
        } else {
          this.$emit('input', [])
        }
      },
      deep: true
    },
    value: function () {
      if (this.value == '' || this.value == undefined) {
        // 清空日期控件
        this.localValue = ''
      }
      if (!this.once) {
        this.once = true
        const tempArray = this.value
        if (Array.isArray(tempArray) && tempArray.length > 1) {
          const first = tempArray[0].split(' ')[0]
          const second = tempArray[1].split(' ')[0]
          this.localValue = [first, second]
        }
      }
    }
  }
}
</script>

<style lang='scss'>
@import "./variables.scss";
.one-block {
  .el-input__inner {
    max-width: 220px;
    width: 212px;
  }
  .el-date-editor .el-range-separator {
    width: 3%;
  }
  .el-input__icon {
    width: 18px;
  }
  .el-date-editor .el-range__close-icon {
    width: 14px;
  }
}
</style>
