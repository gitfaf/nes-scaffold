const ONE_WEEK = 60 * 60 * 24 * 7

const ERRORS = {
  register: `Cannot register user with email: `,
  login: {
    invalidPassword: `Invalid Password! Cannot login user with email:`,
    serverError: `Server Failed while login! Cannot login, please try again.`
  }
}

module.exports = {
  ONE_WEEK,
  ERRORS
}
