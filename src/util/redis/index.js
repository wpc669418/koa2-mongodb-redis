import redis from 'redis'
import { redisConfig } from '../../config'
import { log } from '../log'

const client = redis.createClient({
  ...redisConfig,
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeoutx and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
})

/**
 * 监听redis的连接情况
 */
client.on('connect', function () {
  // log.info('Redis is ready')
  log.info("Redis is ready");
})

/**
 * 监听redis的报错
 */
client.on("error", function (err) {
  log.error('Redis Error ' + err)
});

/**
 * redis 存入数据 字符串或者对象
 * @param {键} key 
 * @param {值} value 
 */
const setValue = (key, value) => {
  return new Promise((resolve, reject) => {
    if (value === 'undefined' || value === null || value === '') {
      return
    }
    // 字符串类型
    if (typeof value === 'string') {
      client.set(key, value, (err, res) => {
        if (err) {
          reject(err)
        } else {
          console.log('setValue -> res', res)
          resolve(res)
        }
      })
    }
    // 对象类型
    if (typeof value === 'object') {
      Object.keys(value).forEach((item) => {
        client.hset(key, item, value[item], (err, res) => {
          if (err) {
            reject(err)
          } else {
            console.log('setValue -> res', res)
            resolve(res)
          }
        })
      })
    }
  })
}

/**
 * 获取单个字符串
 * @param {*} key 
 */
const getVaule = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) {
        reject(err)
      } else {
        console.log('setValue -> res', res)
        resolve(res)
      }
    })
  })
}

/**
 * 获取哈希表的值
 * @param {*} key 
 */
const getHashVaule = (key) => {
  return new Promise((resolve, reject) => {
    client.hget(key, (err, res) => {
      if (err) {
        reject(err)
      } else {
        console.log('setValue -> res', res)
        resolve(res)
      }
    })
  })
}


export {
  client,
  setValue,
  getVaule,
  getHashVaule
}