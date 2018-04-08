import {Document} from 'mongoose'
import {I{{modelName}}} from './I{{modelName}}'

/**
 * 用于数据库持久化,会带上 mongoose 的操作方法
 */
export interface I{{modelName}}Model extends I{{modelName}}, Document {
  updateStatus (): I{{modelName}}Model

  done (): I{{modelName}}Model

  fail (): I{{modelName}}Model
}
