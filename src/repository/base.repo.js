'use strict'

const { Database } = require('../config')

class BaseRepository {
  constructor () {
    this.database = new Database().getInstance()
    this.tableName = null
    this.tablePrimaryKey = null
    this.deletedField = null
  }

  /**
    * find collection by id
    *
    * @param {string} id - uuid
    * @returns
    */
  async findById (id) {
    return await this.database.from(this.tableName)
      .select(
        this.database.raw(`*, BIN_TO_UUID(${this.tablePrimaryKey}) as ${this.tablePrimaryKey}`)
      )
      .where(this.database.raw(`${this.tablePrimaryKey} = UUID_TO_BIN('${id}')`))
      .where({ [this.deletedField]: null })
      .first()
  }

  /**
    * find data
    *
    * @param {Object} where - object name that related to table fields
    *
    * @returns {object}
    */
  async find (where) {
    return await this.database
      .select(
        this.database.raw(`*, BIN_TO_UUID(${this.tablePrimaryKey}) as ${this.tablePrimaryKey}`)
      )
      .from(this.tableName).where({ ...where, [this.deletedField]: null }).first()
  }

  /**
    * create data
    *
    * @param {Object} data
    *
    * @returns {boolean}
    */
  async create (data) {
    await this.database.insert(data).into(this.tableName)
    return true
  }

  /**
    * Update data
    *
    * @param {Object} where
    * @param {Object} data
    *
    * @returns {number}
    */
  async update (where, data) {
    const affected = await this.database.where({ ...where, [this.deletedField]: null }).into(this.tableName).update(data)
    return affected
  }

  /**
    * delete data
    *
    * @param {string} id
    *
    * @returns {boolean}
    */
  async delete (id) {
    await this.update(
      { [this.tablePrimaryKey]: this.database.raw(`UUID_TO_BIN('${id}')`) },
      { [this.deletedField]: new Date() }
    )

    return true
  }
}

module.exports = BaseRepository
