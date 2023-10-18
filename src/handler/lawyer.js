'use strict'

const express = require('express')
const Router = express.Router()
const LawyerService = require('../services/lawyers')
const Middleware = require('./middleware').Lawyer

Router.get('/', Middleware.filterLawyer, (req, res, next) => {
  const {
    query: {
      name,
      experience,
      lat,
      long
    }
  } = req

  const userCoordinate = lat && long ? { lat, long } : undefined

  return LawyerService.filterLawyer({ name, experience, userCoordinate })
    .then(response => res.json(response))
    .catch(error => next(error))
})

Router.post('/', Middleware.createLawyer, (req, res, next) => {
  const {
    body: {
      name,
      experience,
      office_coordinate: officeCoordinate,
      office_address: officeAddress
    }
  } = req

  return LawyerService.createLawyer(name, experience, officeCoordinate, officeAddress)
    .then(response => res.json(response))
    .catch(error => next(error))
})

Router.get('/:lawyer_id', Middleware.filterById, (req, res, next) => {
  const {
    params: {
      lawyer_id: lawyerId
    }
  } = req

  return LawyerService.filterById(lawyerId)
    .then(response => res.json(response))
    .catch(error => next(error))
})

Router.patch('/:lawyer_id', Middleware.updateLawyer, (req, res, next) => {
  const {
    params: {
      lawyer_id: lawyerId
    },
    body: {
      name,
      experience,
      office_coordinate: officeCoordinate,
      office_address: officeAddress
    }
  } = req

  return LawyerService.updateLawyer(lawyerId, {
    name,
    experience,
    officeAddress,
    officeCoordinate
  })
    .then(response => res.json(response))
    .catch(error => next(error))
})

Router.delete('/:lawyer_id', Middleware.deleteLawyer, (req, res, next) => {
  const {
    params: {
      lawyer_id: lawyerId
    }
  } = req

  return LawyerService.deleteLawyer(lawyerId)
    .then(response => res.json(response))
    .catch(error => next(error))
})

module.exports = Router
