import Router from 'koa-router'
import projectController from '../controller/projectController'

const router = new Router()

router.prefix('/project')
// 添加项目
router.post('/add', projectController.addProject)
// 更新项目
router.post('/update', projectController.updateProject)
// 获取项目
router.get('/find', projectController.findProject)
// 导出excel
router.get('/download', projectController.downloadExcel)
// 获取全部字典 用以前端翻译
router.get('/dic', projectController.getDicObj)
// 同步字典内存
router.get('/synchro', projectController.synchro)

export default router