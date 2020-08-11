const redisConfig = {
  host: 'localhost',
  port: '6379',
  password: '123456',
  detect_buffers: true,
  db: 1
}

const mysqlConfig = {
  host: 'localhost',
  port: '3306',
  user: 'jkadmin',
  password: '1111qqqq',
  database: 'week_work'
}

const systemConfig = {
  serverPort: 3000
}

export {
  mysqlConfig,
  redisConfig,
  systemConfig
}