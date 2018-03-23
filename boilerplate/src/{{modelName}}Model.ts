import {Document, Model, Schema, Types} from 'mongoose'
import {Const} from './Const'

export const modelSchema = {
  userId: {type: String, require: true, index: true},         //   用户 ID
  noteId: {type: String, ref: 'Note', index: true},           //  关联的标的
  no: Number,           // 编号
  status: {
    type: String,
    required: true,
    enum: Object.values(Const.STATUS),
    default: Const.STATUS.PENDING
  },                    // 状态
  amount: Number,       // 金额
}

const {{modelName}}Schema: Schema = new Schema(modelSchema)

export const methods = {
  updateStatus: async function updateStatus (status) {
    this.status = status
    return await this.save()
  },
  done: async function done () {
    return await this.updateStatus(Const.STATUS.DONE)
  },
  fail: async function fail () {
    return await this.updateStatus(Const.STATUS.FAIL)
  }
}
{{modelName}}Schema.methods = methods
// {{modelName}}Schema.index({noteId: 1, status: 1})
{{modelName}}Schema.set('timestamps', true)        // createAt, updatedAt -> UTC
export {{{modelName}}Schema}
