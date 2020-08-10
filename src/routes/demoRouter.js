import Router from 'koa-router'
import demoController from '../controller/DemoController'

const router = new Router()

router.get('/demo', demoController.demo)

export default router
