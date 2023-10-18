'use strict'

const { keys } = require('lodash')

const { validationResult } = require('express-validator')

module.exports = function validationMiddleware (validations) {
  const objKeys = keys(validations)
  const obj = {}

  const each = objKeys.map((val) => {
    if (Array.isArray(validations[val])) {
      const rules = validations[val]

      function check (val) {
        return (req, res, next) => {
          const errors = validationResult(req, { strictParams: true })

          if (!errors.isEmpty()) {
            return next({ errorForm: errors.mapped() })
          }
          return next()
        }
      }

      rules.push(check(val))
      return rules
    } else {
      return validationMiddleware(validations[val])
    }
  })

  objKeys.map((val, idx) => {
    obj[val] = each[idx]
    return obj
  })

  return obj
}
