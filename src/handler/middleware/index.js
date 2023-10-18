'use strict'

const validationMiddleware = require('./validate')

module.exports = validationMiddleware({
  Lawyer: require('./lawyer')
})