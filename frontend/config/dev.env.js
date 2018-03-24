'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER: '"http://localhost:8000"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"w6xpFf8yReas8XGIpwFAhjwSuaXeCvAnC3LPWUYZ"'
})
