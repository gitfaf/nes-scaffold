const authentication = {
  controller: require('controllers/authentication'),
  policy: require('policies/authentication')
}

const register = app => app.post('/register',
  authentication.policy.register,
  authentication.controller.register
)

const login = app => app.post('/login',
  authentication.controller.login
)

module.exports = {
  register,
  login
}
