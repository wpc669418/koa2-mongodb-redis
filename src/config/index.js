const redisConfig = {
  host: 'localhost',
  port: '6379',
  password: '123456',
  detect_buffers: true,
  db: 1
}

const systemConfig = {
  serverPort: 3000
}

export {
  redisConfig,
  systemConfig
}