'use strict'

const {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  DATABASE_USER
} = process.env

const conection = require('knex')({
  client: 'mysql2',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
  }
})

class Database {
  constructor () {
    if (!Database.instance) {
      Database.instance = conection
    }
  }

  getInstance () {
    return Database.instance
  }
}

module.exports = Database
