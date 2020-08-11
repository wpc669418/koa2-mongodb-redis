const mysql = require('mysql2');
import { mysqlConfig } from '../../config'
const connection = mysql.createConnection(mysqlConfig);

/**
 * 连接数据库
 */
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
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
  query
}