const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

const hashPassword = (user, options) => {
  const SALT_FACTOR = 8
  if (!user.changed('password')) {
    return
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

const options = {
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
    beforeSave: hashPassword
  }
}

module.exports = (sequelize, DataTypes) => {
  const userModel = {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }
  const User = sequelize.define('User', userModel, options)
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}
