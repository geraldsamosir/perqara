'use strict'

const { query, body, param } = require('express-validator')

module.exports = {
  filterLawyer: [
    query('name')
      .optional({ checkFalsy: true })
      .isString()
      .withMessage('wrong format'),
    query('experience')
      .optional({ checkFalsy: true })
      .isNumeric()
      .withMessage('wrong format')
      .toInt(),
    query('lat')
      .optional({ checkFalsy: true })
      .isNumeric({ min: -90, max: 90 })
      .withMessage('wrong format'),
    query('long')
      .optional()
      .isNumeric({ min: -180, max: 180 })
      .withMessage('wrong format')
  ],
  createLawyer: [
    body('name')
      .isString()
      .withMessage('wrong format')
      .trim(),
    body('experience')
      .isNumeric({ min: 1 })
      .withMessage('wrong format')
      .toInt(),
    body('office_coordinate.lat')
      .isNumeric()
      .withMessage('wrong format'),
    body('office_coordinate.long')
      .isNumeric()
      .withMessage('wrong format'),
    body('office_address')
      .isString()
      .withMessage('wrong format')
  ],
  filterById: [
    param('lawyer_id')
      .isString()
      .trim()
  ],
  updateLawyer: [
    param('lawyer_id')
      .isString()
      .trim(),
    body('name')
      .isString()
      .withMessage('wrong format')
      .trim(),
    body('experience')
      .isNumeric({ min: 1 })
      .withMessage('wrong format')
      .toInt(),
    body('office_coordinate.lat')
      .isNumeric()
      .withMessage('wrong format'),
    body('office_coordinate.long')
      .isNumeric()
      .withMessage('wrong format'),
    body('office_address')
      .isString()
      .withMessage('wrong format')
  ],
  deleteLawyer: [
    param('lawyer_id')
      .isString()
      .trim()
  ]
}
