import combineRoutes from 'koa-combine-routers'

import demoRouter from './demoRouter'
import userRouter from './userRouter'
import projectRouter from './projectRouter'

export default combineRoutes(demoRouter, userRouter, projectRouter)
