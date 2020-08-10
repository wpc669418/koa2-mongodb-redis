import combineRoutes from 'koa-combine-routers'

import demoRouter from './demoRouter'
import userRouter from './userRouter'

export default combineRoutes(demoRouter, userRouter)
