import Router from '@koa/router'
import uploadController from '../controller/uploadController'

const router = new Router()


router.prefix('/reports')

router.get('/getReports', uploadController.getReports)

router.post('/upload', uploadController.uplodefile)

export default router