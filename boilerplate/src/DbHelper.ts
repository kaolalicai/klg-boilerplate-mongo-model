import {Connection, Model} from 'mongoose'
import {I{{modelName}}Model} from './interface/I{{modelName}}Model'
import {{{modelName}}Schema} from './{{modelName}}Model'

export class DbHelper {
  static initModel (db: Connection, modelName = '{{modelName}}') {
    return db.model<I{{modelName}}Model>(modelName, {{modelName}}Schema, modelName)
  }
}
