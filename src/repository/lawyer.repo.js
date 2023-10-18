'use strict'

const BaseRepository = require('./base.repo')

class LawyersRepository extends BaseRepository {
  constructor () {
    super()
    this.tableName = 'perqara_lawyers'
    this.tablePrimaryKey = 'perqara_lawyers_id'
    this.deletedField = 'perqara_lawyers_deleted_at'
  }

  /**
   * filter lawyer Repository
   *
   * @param {number} experience in year
   * @param {string} name
   * @param {Object} userLocationCoordinate
   * @param {number} userLocationCoordinate.lat
   * @param {number} userLocationCoordinate.long
   *
   * @returns {Promise<object[]>}
   */
  async filter (experience = null, name = null, userLocationCoordinate = null) {
    const query = this.database
      .select(
        this.database.raw(
          `bin_to_uuid(perqara_lawyers_id) as perqara_lawyers_id ,
           perqara_lawyers_name,
           perqara_lawyers_office_address,
           perqara_lawyers_experience,
           perqara_lawyers_created_at,
           perqara_lawyers_updated_at`
        )
      )
      .from(this.tableName)

    if (experience) query.where('perqara_lawyers_experience', experience)

    if (name) query.where('perqara_lawyers_name', 'like', `%${name}%`)

    if (userLocationCoordinate) {
      const ORDER_BY_DISTANCE = `ST_DISTANCE(ST_GeomFromText('POINT(${userLocationCoordinate.lat} ${userLocationCoordinate.long})'), perqara_lawyers_location_coordinate) ASC `
      query.orderByRaw(this.database.raw(ORDER_BY_DISTANCE))
    }

    const LawyerLists = await query.where({ perqara_lawyers_deleted_at: null })

    return LawyerLists
  }

  /**
   * create new Lawyer
   * 
   * @param {string} name
   * @param {number} experience
   * @param {Object} officeCoordinate
   * @param {number} officeCoordinate.lat
   * @param {number} officeCoordinate.long
   * @param {string} officeAddress
   * 
   */
  async createNewLawyer (name, experience, officeCoordinate, officeAddress) {
    const now = new Date()
    await this.create({
      perqara_lawyers_name: name,
      perqara_lawyers_experience: experience,
      perqara_lawyers_location_coordinate: this.database.raw(`POINT(${officeCoordinate.lat}, ${officeCoordinate.long})`),
      perqara_lawyers_office_address: officeAddress,
      perqara_lawyers_created_at: now,
      perqara_lawyers_updated_at: now
    })

    return true
  }

  /**
   * Update new lawyer
   * 
   * @param {string} id - uui
   * @param {Object} data 
   */
  async updateNewLawyer (id, data = {}) {
    let lawyerData = {
      perqara_lawyers_name: data.name,
      perqara_lawyers_experience: data.experience,
      perqara_lawyers_location_coordinate: data.officeCoordinate ? this.database.raw(`POINT(${data.officeCoordinate.lat}, ${data.officeCoordinate.long})`) : undefined,
      perqara_lawyers_office_address: data.officeAddress
    }

    Object.keys(data).forEach(key => {
      if (!data[key]) {
        delete lawyerData[key]
      }
    })

    lawyerData = {
      ...lawyerData,
      perqara_lawyers_updated_at: new Date()
    }

    await this.update({ [this.tablePrimaryKey]: this.database.raw(`uuid_to_bin('${id}')`) }, lawyerData)

    return true
  }
}

module.exports = LawyersRepository
