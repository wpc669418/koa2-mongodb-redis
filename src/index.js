import koa from 'koa'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'
import './utils/mysql'
import './utils/redis'
import { log } from './utils/log'
import { systemConfig } from './config'
import catchError from './middlewares/catchError'
import { InitManager } from './core/init'
// 全局异常中间件监听、处理，放在所有中间件的最前面 洋葱模型最外层

const app = new koa()
InitManager.init_global()
const isDevMode = process.env.NODE_ENV === 'production' ? false : true

app.use(catchError)

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
])

if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(systemConfig.serverPort, () => {
  log.info(`server is running in ${systemConfig.serverPort}`)
})
