'use strict'

const { createTerminus } = require('@godaddy/terminus')
const http = require('http')
const app = require('./app')
const PORT = 3000

const serverApi = http.createServer(app)

createTerminus(serverApi, {
  logger: console.log,
  healthChecks: {
    '/healthz': () => Promise.resolve()
  }
}).listen(PORT)
