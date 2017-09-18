require('node-path-choice').blatant(__dirname)
require('extended-logger').installConsole(__dirname, __filename)

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {
  sequelize
} = require('models')
const config = require('configs/local')
const {
  authentication
} = require('routes')

const express = require('express')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

authentication.register(app)
authentication.login(app)

sequelize.sync()
  .then(() => {
    app.listen(config.PORT)
    console.log(`server started at ${config.PORT}`)
  })

app.get('/', (req, res) => {
  res.send('<a href="/hello">/hello</a>')
})

app.get('/hello', (req, res) => {
  res.send({
    message: 'hello, world!'
  })
})

module.exports = app
