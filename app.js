'use strict'

require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  next()
})

app.use('/lawyer', require('./src/handler/lawyer'))

app.use((error, req, res, next) => {
  const status = error?.errorForm ? 422 : 500

  console.log(error)

  return res.status(status).json({ error: error.code ? { message: 'something goes wrong' } : error })
})

module.exports = app
