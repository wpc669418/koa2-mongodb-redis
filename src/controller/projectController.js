import { add, update, find } from '../utils/mysql'

class ProjectController {
  async getAllProject () {

  }
  /**
   * 添加项目
   * @param {*} ctx 
   */
  async addProject (ctx) {
    const body = ctx.request.body
    await add({
      tableName: 'work_project',
      models: body
    })
    ctx.body = ctx.body = new global.success.info()
  }

  /**
     * 更新项目
     * @param {*} ctx 
     */
  async updateProject (ctx) {
    ctx.body = ctx.request.body
    const { code } = ctx.request
    const { name } = ctx.request
    await update({
      tableName: 'work_project',
      models: {
        code,
        name
      },
      where: {
        uid: '123'
      }
    })
    ctx.body = new global.success.info()
  }

  async findProject (ctx) {
    ctx.body = ctx.request.query
    const { code } = ctx.request.query
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