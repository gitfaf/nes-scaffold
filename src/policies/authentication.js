require('extended-logger').installConsole(__dirname, __filename)
const Joi = require('joi')
const config = require('configs/local')

const schema = {
  email: Joi.string().email(),
  password: Joi.string().regex(config.policies.password)
}

module.exports = {
  register (req, res, next) {
    const { error, value } = Joi.validate(req.body, schema)

    if (error) {
      console.log(error)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide valid email.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `
            Password must be at least 8 characters and at most 12 characters long.
            <br>Password can contain a to z.
            <br>Password can contain A to Z.
            <br>Password can contain 0 to 9.
            <br>Password can contain space.
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration details.'
          })
      }
    } else {
      console.log(value)
      next()
    }
  }
}
