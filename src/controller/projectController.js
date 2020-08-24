import { add, update, find } from '../utils/mysql'
import exportExcel from '../utils/excel'
import { getDic, getTextList } from '../utils/dictionary'
import dayjs from 'dayjs'
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
    ctx.body = new global.success.info('添加成功')
  }

  /**
   * 更新项目
   * @param {*} ctx 
   */
  async updateProject (ctx) {
    let body = ctx.request.body
    const { uid } = ctx.request.body
    if (!uid) {
      ctx.body = new global.errs.HttpException('缺失参数uid')
      return
    }
    delete body.uid
    await update({
      tableName: 'work_project',
      models: body,
      where: {
        uid
      }
    })
    ctx.body = new global.success.info()
  }

  /**
   * 获取项目
   * @param {上下文} ctx 
   */
  async findProject (ctx) {
    const query = ctx.request.query
    const res = await find({
      tableName: 'work_project',
      where: query,
    })
    ctx.body = res
  }

  /**
   * 下载项目
   * @param {上下文} ctx 
   */
  async downloadExcel (ctx) {
    const query = ctx.request.query
    const res = await find({
      tableName: 'work_project',
      where: query,
    })
    console.log('ProjectController -> downloadExcel -> res', res)
    // 字典表是否存在
    if (!global.dicObj) {
      await getDic()
    }
    // 现有结构 [{},{},{}]
    const result = res.data
    let rowsList = []
    result.forEach(item => {
      // 删除uid
      delete item.uid
      item.start_time = dayjs(item.start_time).format('YYYY/MM/DD')
      item.promise_time = dayjs(item.promise_time).format('YYYY/MM/DD')
      // 字典翻译
      item = getTextList(item, [
        'attribute',
        'level',
        'kind',
        'project_status',
        'topic_status',
        'effect_release',
        'project_stage',
        'is_run'
      ])
      // 现有结构 {} 通过 Object.keys生成[key,key]
      // 生成目标结构 [val,val]
      const midList = Object.keys(item).map(v => {
        return item[v]
      })
      // 生成目标结构 [[val,val],[val,val]]
      rowsList.push(midList)
    })
    let data = exportExcel({
      rows: rowsList
    })
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.set("Content-Disposition", "attachment; filename=" + "reports.xlsx");
    ctx.body = data
  }

  /**
   * 获取字典表的json
   * @param {} ctx 
   */
  async getDicObj (ctx) {
    if (!global.dicObj) {
      //如果不存在则查询数据库
      await getDic()
    }
    ctx.body = global.dicObj
  }

  /**
   * 手动修改数据库后 同步内存
   * @param {} ctx 
   */
  async synchro (ctx) {
    await getDic()
  }

}

export default new ProjectController()