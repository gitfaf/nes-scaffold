module.exports = {
  PORT: process.env.PORT || 54321,
  db: {
    database: process.env.DB_NAME || 'nesbootstrap',
    username: process.env.DB_USER || 'nesbootstrap',
    password: process.env.DB_PASS || 'nesbootstrap',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './nesbootstrap.sqlite'
    }
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'nesbootstrap'
  },
  policies: {
    password: /^[a-zA-Z0-9 ]{8,12}$/
  }
}
