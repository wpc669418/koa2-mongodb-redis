import Router from 'koa-router'
import { userController } from '../controller/userController'

const router = new Router()

router.prefix('/user')

router.get('/getCaptcha', userController.getCaptcha)

export default router