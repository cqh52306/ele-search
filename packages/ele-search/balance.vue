<!--
 * @Descripttion:
 * @version:
 * @Author: caoqinghua
 * @Date: 2019-08-27 15:27:41
 * @LastEditors: caoqinghua
 * @LastEditTime: 2019-09-12 17:59:30
 -->
<template>
  <div class="day-block">
    <el-form ref="newDate" :model="newDate" :rules="formRules" label-width="100px">
      <el-form-item prop="time1">
        <el-input v-model="newDate.time1" placeholder="起始金额" @input="handleChange" />
      </el-form-item>
      <div class="space">
        <span>至</span>
      </div>
      <el-form-item prop="time2">
        <el-input v-model="newDate.time2" placeholder="结束金额" @input="handleChange" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const r = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: ['value'],   // eslint-disable-line
  data () {
    const ruleTime1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('起始金额不能为空'))
      }
      // time1
      setTimeout(() => {
        if (!r.test(value)) {
          callback(new Error('请输入正确的金额'))
        } else {
          callback()
        }
      }, 300)
    }
    const ruleTime2 = (rule, value, callback) => {
      const time1 = this.newDate.time1
      if (this.newDate.time1 == '') {
        return callback(new Error('起始金额不能为空'))
      }
      // 初始值不能大于截止日
      if (time1 && value && (time1 / 1) > (value / 1)) {
        return callback(new Error('起始金额必须小于截止金额'))
      }
      if (!value) {
        return callback(new Error('截止金额不能为空'))
      }
      // time2
      setTimeout(() => {
        if (!r.test(value)) {
          callback(new Error('请输入正确的金额'))
        } else {
          callback()
        }
      }, 300)
    }
    return {
      newDate: {
        time1: '',
        time2: ''
      },
      once: false,
      formRules: {
        time1: [
          { validator: ruleTime1, trigger: 'blur,change' }
        ],
        time2: [
          { validator: ruleTime2, trigger: 'blur,change' }
        ]
      }
    }
  },
  watch: {
    newDate: {
      handler (newValue) {
        if (newValue.time1 == '' || newValue.time2 == '') {
          // 清空值
          this.$emit('input', [])
        }
      },
      deep: true
    },
    value: {
      handler () {
        if (!this.once) {
          this.once = true
          const tempArray = this.value
          // 有缓存时自动填充
          if (Array.isArray(tempArray) && tempArray.length > 1) {
            const first = tempArray[0]
            const second = tempArray[1]
            this.newDate = {
              time1: first,
              time2: second
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    handleChange: function () {
      const time1 = this.newDate.time1
      const time2 = this.newDate.time2
      // 不做校验
      if (time1 == '' && time2 == '') {
        this.$refs['newDate'].clearValidate()
        return false
      }
      // 开始校验
      this.$refs['newDate'].validate((valid) => {
        if (valid) {
          if (time1 == '' || time2 == '') {
            const array = []
            this.$emit('input', array)
          } else {
            const array = [time1, time2]
            this.$emit('input', array)
          }
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "./variables.scss";
.day-block {
  display: flex;
  // border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 32px;
  max-width: $searchInWidth;
  width: $searchInWidth;
  .el-form {
    display: flex;
    width: 100%;
    .space {
      width: 52px;
      text-align: center;
    }
    .el-form-item {
      width: 100%;
      margin-right: 0;
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }

  .el-input__inner {
    width: 100%;
    padding: 0 11px;
    // height: 16px;
    // line-height: 16px;
    font-size: 12px;
    // border: none;
    cursor: pointer;
    background-color: transparent;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  /* 火狐 */
  input {
    -moz-appearance: textfield;
  }

  .el-date-editor.el-input {
    height: 16px;
    line-height: 16px;
    background-color: transparent;
    display: flex;
    &:nth-child(1) {
      border-bottom: 1px dotted rgba(220, 223, 230, 0.8);
    }
    &:nth-child(2) {
      margin-left: 1px;
    }

    .el-input__inner::-webkit-input-placeholder {
      font-size: 10px;
    }
    .el-input__inner::-moz-placeholder {
      font-size: 10px;
    }
    .el-input__inner::-ms-input-placeholder {
      font-size: 10px;
    }
    .el-input__prefix {
      height: 16px;
      line-height: 16px;
      margin-top: -1px;
      display: none;
    }
    .el-input__icon {
      height: 16px;
      line-height: 16px;
    }
    // width: auto;
    // .el-input__inner {
    //   width: 118px !important;
    //   max-width: 118px !important;
    // }
  }
}
</style>
