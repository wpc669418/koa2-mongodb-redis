import { add, update, find } from '../utils/mysql'

class ProjectController {
  async getAllProject () {

  }
  /**
   * 添加项目
   * @param {*} ctx 
   */
  async addProject (ctx) {
    await add({
      tableName: 'work_project',
      models: {
        code: '123111',
        attribute: '你好吗？？？'
      }
    })
    ctx.body = ctx.body = new global.success.info()
  }

  /**
     * 更新项目
     * @param {*} ctx 
     */
  async updateProject (ctx) {
    const { code } = ctx.request
    const { name } = ctx.request
    await update({
      tableName: 'work_project',
      models: {
        code,
        name
      },
      where: {
        code: '123'
      }
    })
    ctx.body = new global.success.info()
  }

  async findProject (ctx) {
    const { code } = ctx.query
    const { name } = ctx.query
    const res = await find({
      tableName: 'work_project',
      where: {
        name,
        code,
      },
    })
    ctx.body = new global.success.info({
      data: res
    })
  }
}

export default new ProjectController()