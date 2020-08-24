const mysql = require('mysql2');
import { mysqlConfig } from '../../config'
import { log } from '../log'
const connection = mysql.createConnection(mysqlConfig);

/**
 * 连接数据库
 */
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  log.info(`connected as id ${connection.threadId}`)
})



/**
 * 查询数据库
 * @param {要执行的sql语句} sql 
 */
const query = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) throw error;
      resolve(results)
    })
  })
}

/**
 * 断开数据库
 * 
 * 中文：这将确保在将COM_QUIT数据包发送到MySQL服务器之前，所有先前排队的查询仍然存在 。如果COM_QUIT在发送数据包之前发生致命错误，则会 err向回调提供参数，但是无论如何连接都会终止。
 * 
 * 原文：This will make sure all previously enqueued queries are still before sending a COM_QUIT packet to the MySQL server. If a fatal error occurs before the COM_QUIT packet can be sent, an err argument will be provided to the callback, but the connection will be terminated regardless of that.
 */
const end = () => {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err)
      }
      resolve(1)
    })
  })
}

/**
 * 新增
 * @param {表名称} tableName 
 * @param {键值对的集合} models 
 */
const add = async ({ tableName, models }) => {
  console.log('add -> models', models)
  // 判断是否为对象

  if (!(models instanceof Object)) return
  // 需要修改的列
  let columns = ''
  // 需要修改列对应的值
  let datas = ''
  Object.keys(models).forEach(item => {
    columns += `${item},`
    datas += `"${models[item]}",`
  })
  const sql = `INSERT INTO ${tableName} (${sql_replace(columns)}) VALUES (${sql_replace(datas)});`
  global.log.info(sql)
  const res = await query(sql)
  console.log('add -> res', res)
}
/**
 * 更新
 * @param {*} param0 
 */
const update = async ({ tableName, models, where }) => {
  if (!(models instanceof Object)) {
    throw new global.errs.HttpException('参数错误')
  }
  // 条件不可为空否则更新整张表
  if (!(where instanceof Object) || !where) {
    throw new global.errs.HttpException('更新的条件错误或缺失')
  }
  let columns_values = ''
  let where_str = ''
  Object.keys(models).forEach(item => {
    columns_values += `${item}="${models[item]}",`
  })
  Object.keys(where).forEach(item => {
    if (where[item]) {
      where_str += `${item}="${where[item]}"`
    }
  })
  /**
   * 拼接sql
   */
  const sql = `UPDATE ${tableName} SET ${sql_replace(columns_values)} WHERE ${sql_replace(where_str)};`
  global.log.info(sql)
  const res = await query(sql)
  console.log('update -> res', res)
}

/**
 * 查询数据
 * @param {*} param0 
 */
const find = async ({
  tableName,
  where
}) => {
  if (!(typeof where === "object")) {
    throw new global.errs.HttpException('类型错误')
  }
  let wheres_str = ''
  Object.keys(where).forEach(item => {
    // 如果有值
    if (where[item]) {
      if (item === 'name') {
        wheres_str += ` ${item} LIKE "%${where[item]}%" AND`
      } else {
        wheres_str += ` ${item} = "${where[item]}" AND`
      }
    }
  })
  let sql = ''
  if (wheres_str) {
    sql = `SELECT * FROM ${tableName} WHERE ${wheres_str.replace(/AND$/, '')}`
  } else {
    sql = `SELECT * FROM ${tableName} `
  }

  global.log.info(sql)
  const res = await query(sql)

  return {
    total: res.length,
    data: res
  }
}

/**
 * 去除最后一个逗号
 * @param {要去除的字符串} str 
 */
const sql_replace = (str) => {
  return str.replace(/,$/, '')
}


/**
 * 断开数据库
 * 中文：终止连接的另一种方法是调用destroy()方法。这将导致基础套接字立即终止。另外，destroy()保证不会为该连接触发更多事件或回调。
 * 
 * 原文：
 * An alternative way to end the connection is to call the destroy() method. This will cause an immediate termination of the underlying socket. Additionally destroy() guarantees that no more events or callbacks will be triggered for the connection.
 * 
 */
const destroy = () => {
  connection.destroy()
}

export {
  destroy,
  end,
  query,
  add,
  update,
  find
}