import {Document, Model, Schema, Types} from 'mongoose'
import {Const} from './Const'

export const modelSchema = {
  userId: {type: String, require: true, index: true},         //   用户 ID
  noteId: {type: String, ref: 'Note', index: true},           //  关联的标的
  no: Number,           // 还款编号
  time: Number,         // 创建时间
  startDate: {type: Date, require: true, index: true},      // 此计划的开始时间
  endDate: {type: Date, require: true, index: true},        // 此计划的结束时间 = repayDate
  days: {type: Number, require: true},                      // 此计划的 持续时间
  rateYear: {type: Number},                                 // 此计划的利率
  status: {
    type: String,
    required: true,
    enum: Object.values(Const.REPAYMENT_PLAN_STATUS),
    default: Const.REPAYMENT_PLAN_STATUS.PENDING
  },                    // 计划的状态
  remark: String,       // 备注
  amount: Number,       // 还款本息
  principal: Number,    // 还款本金
  interest: Number      // 还款利息
}

const {{modelName}}Schema: Schema = new Schema(modelSchema)

export const methods = {
  isPay: function isPay () {
    return this.status === Const.REPAYMENT_PLAN_STATUS.DONE
  },
  updateStatus: async function updateStatus (status) {
    this.status = status
    return await this.save()
  },
  payed: async function payed () {
    return await this.updateStatus(Const.REPAYMENT_PLAN_STATUS.DONE)
  },
  fail: async function fail () {
    return await this.updateStatus(Const.REPAYMENT_PLAN_STATUS.FAIL)
  }
}
{{modelName}}Schema.methods = methods
{{modelName}}Schema.index({noteId: 1, no: 1, status: 1})
{{modelName}}Schema.set('timestamps', true)        // createAt, updatedAt -> UTC
export {{{modelName}}Schema}
