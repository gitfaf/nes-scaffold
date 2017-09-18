const path = require('path')

const old = {
  assert: console.assert.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console),
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  self: console
}

const announcement = (dir, file, prefix) => {
  dir = dir || __dirname
  file = file || __filename
  file = file.split('/').pop()
  return `\n[${prefix} ${dir}${path.delimiter}${file} ${Date.now()}]`
}

const announceWarning = (dir, file) => announcement(dir, file, 'Warning')
const announceError = (dir, file) => announcement(dir, file, 'Error')
const announceInfo = (dir, file) => announcement(dir, file, 'Info')
const announceLog = (dir, file) => announcement(dir, file, 'Log')
const announceAssert = (dir, file) => announcement(dir, file, 'Assert')

function installConsole (dir, file) {
  console.log = function () {
    old.log(announceLog(dir, file))
    old.log.apply(console, Array.from(arguments))
  }
  console.error = function () {
    old.error(announceError(dir, file))
    old.error.apply(console, Array.from(arguments))
  }
  console.info = function () {
    old.info(announceInfo(dir, file))
    old.info(Array.from(arguments))
  }
  console.warn = function () {
    old.warn(announceWarning(dir, file))
    old.warn(Array.from(arguments))
  }
  console.assert = function () {
    const args = Array.from(arguments)
    old.log(announceAssert(dir, file))
    old.log(`Asserting: ${args}`)
    old.assert()
  }
}

const uninstallConsole = () => {
  console.log = old.log.bind(old.self)
  console.error = old.error.bind(old.self)
  console.info = old.info.bind(old.self)
  console.warn = old.warn.bind(old.self)
  console.assert = old.assert.bind(old.self)
}

module.exports = {
  old,
  announceError,
  announceInfo,
  announceLog,
  announceWarning,
  announcement,
  installConsole,
  uninstallConsole
}
