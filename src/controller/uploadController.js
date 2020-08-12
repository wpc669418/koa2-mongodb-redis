import { query } from '../utils/mysql'
import * as redis from '../utils/redis'
import fs from 'fs'
import path from 'path'

class UploadController {
  constructor() {

  }
  async getReports (ctx, next) {
    const res = await query('select * from reports')
    await redis.setValue('reports', JSON.stringify(res))
    const reportsData = await redis.getVaule('reports')

    ctx.body = {
      code: 0,
      msg: "获取成功",
      data: JSON.parse(reportsData)
    }
    await next()
  }
  async uplodefile (ctx, next) {
    const fileName = ctx.request.body.name;
    const file = ctx.request.files.file;
    let config = './'
    // 创建可读流
    const render = fs.createReadStream(file.path);
    let filePath = path.join(config, 'upload/', fileName + '.' + file.name.split('.').pop());
    const fileDir = path.join(config, 'upload/');
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, err => {
        console.log(err)
      });
    }
    // 创建写入流
    const upStream = fs.createWriteStream(filePath);
    render.pipe(upStream);

    ctx.body = {
      code: 0,
      msg: "上传成功"
    }
    next()
  }
}

export default new UploadController()