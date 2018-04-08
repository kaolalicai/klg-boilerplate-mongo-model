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
    const f{{modelName}}s = await {{modelName}}.find()
    console.log('f{{modelName}}s', f{{modelName}}s)
    expect(f{{modelName}}s.length).toEqual(1)
    expect(f{{modelName}}s[0].userId).toEqual('uu')
    expect(f{{modelName}}s[0].noteId).toEqual('12')
    expect(f{{modelName}}s[0].no).toEqual(1)
    expect(f{{modelName}}s[0].amount).toEqual(3000)
  })

  it(' update by save', async () => {
    const f{{modelName}} = await {{modelName}}.findOne({no: 1})
    expect(f{{modelName}}.amount).toEqual(3000)
    f{{modelName}}.amount = 4000
    await f{{modelName}}.save()

    const new{{modelName}} = await {{modelName}}.findOne({no: 1})
    expect(new{{modelName}}.amount).toEqual(4000)
  })

  it(' update by no', async () => {
    await {{modelName}}.update({no: 1}, {amount: 6000})

    const new{{modelName}} = await {{modelName}}.findOne({no: 1})
    expect(new{{modelName}}.amount).toEqual(6000)
  })

  afterAll((done) => {
    // TODO 这里释放链接后 测试还是不会停止，需要继续排查
    mongoose.disconnect(done)
  })
})
