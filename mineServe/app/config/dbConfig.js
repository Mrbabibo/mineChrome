module.exports = {
  env: process.env.NODE_ENV, // development or production
  database: {
    // 本地数据库地址
    development: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      database: 'weekly',
    },
    // 线上数据库地址
    production: {},
  },
};
