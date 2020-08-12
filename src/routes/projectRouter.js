import Router from 'koa-router'
import projectController from '../controller/projectController'

const router = new Router()

router.prefix('/project')

router.get('/add', projectController.addProject)

router.get('/update', projectController.updateProject)

router.get('/find', projectController.findProject)

export default router