import * as assert from 'power-assert'
import * as mongoose from 'mongoose'
import {Model} from 'mongoose'
import {TestHelper} from './TestHelper'
import {I{{modelName}}Model} from './interface/I{{modelName}}Model'
import {DbHelper} from './DbHelper'

describe('{{modelName}}CRUD test', async function () {
  let {{modelName}}: Model<I{{modelName}}Model>

  const plan = {
    userId: 'uu',
    noteId: '12',
    no: 1,
    amount: 3000
  }

  beforeAll(async () => {
    // mockgoose 会下载一个 mongodb 实例，所以这里要等待比较久
    jest.setTimeout(200e3)
    const db = await TestHelper.initMockDbConnection()
    {{modelName}} = DbHelper.initModel(db)
  })

  it(' save ', async () => {
    await new {{modelName}}(plan).save()
    const fPlans = await {{modelName}}.find()
    console.log('fPlans', fPlans)
    assert.equal(fPlans.length, 1)
    assert.equal(fPlans[0].userId, 'uu')
    assert.equal(fPlans[0].noteId, '12')
    assert.equal(fPlans[0].no, 1)
    assert.equal(fPlans[0].amount, 3000)
  })

  it(' update by save', async () => {
    const fPlan = await {{modelName}}.findOne({no: 1})
    assert.equal(fPlan.amount, 3000)
    fPlan.amount = 4000
    await fPlan.save()

    const newPlan = await {{modelName}}.findOne({no: 1})
    assert.equal(newPlan.amount, 4000)
  })

  it(' update by no', async () => {
    await {{modelName}}.update({no: 1}, {amount: 6000})

    const newPlan = await {{modelName}}.findOne({no: 1})
    assert.equal(newPlan.amount, 6000)
  })

  afterAll((done) => {
    mongoose.disconnect(done)
  })
})
