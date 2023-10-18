'use strict'

const LawyerRepo = require('../../repository/lawyer.repo')
const LawyersDTO = require('../../dto/lawyers.dto')

class Lawyers {
  constructor() {
    this.lawyerRepo = new LawyerRepo()
  }

  /**
   * filter lawyer
   *
   * @param {Object} filter
   * @param {string} filter.name
   * @param {number} filter.experience
   * @param {Object} filter.userCoordinate
   * @param {number} filter.userCoordinate.lat
   * @param {number} filter.userCoordinate.long
   *
   * @returns {Promise<Object>}
   */
  async filterLawyer({ name, experience, userCoordinate } = {}) {
    let lawyers = await this.lawyerRepo.filter(experience, name, userCoordinate)

    lawyers = lawyers.map(lawyer => new LawyersDTO(lawyer))

    return {
      message: 'Berhasil mendapatkan data Pengacara',
      data: lawyers
    }
  }

  /**
   * filter by Id
   *
   * @param {string} id - uuid
   *
   * @returns {Promise<Object>}
   */
  async filterById(id) {
    const lawyer = await this.lawyerRepo.findById(id)

    return {
      message: 'Berhasil mendapatkan data Pengacara',
      data: new LawyersDTO(lawyer)
    }
  }

  /**
   *
   * Create data lawyer
   *
   * @param {string} name
   * @param {number} experience
   * @param {Object} officeCoordinate
   * @param {number} officeCoordinate.lat
   * @param {number} officeCoordinate.long
   * @param {string} officeAddress
   * 
   * @returns {Promise<Object>}
   */
  async createLawyer(name, experience, officeCoordinate, officeAddress) {
    await this.lawyerRepo.createNewLawyer(
      name,
      experience,
      officeCoordinate,
      officeAddress
    )

    return {
      message: 'Berhasil menambahkan data Pengacara'
    }
  }

  /**
   * Update lawyer by Id
   *
   * @param {string} id - uuid
   * @param {Object} payload
   * @param {?string} payload.name
   * @param {?number} payload.experience
   * @param {?Object} payload.officeCoordinate
   * @param {?number} payload.officeCoordinate.lat
   * @param {?number} payload.officeCoordinate.long
   * @param {?string} payload.officeAddress
   *
   * @returns {Promise<Object>}
   */

  async updateLawyer(id, { name, experience, officeCoordinate, officeAddress } = {}) {
    const updateDataLawyer = {
      name,
      experience,
      officeCoordinate,
      officeAddress
    }

    Object.keys(updateDataLawyer).forEach(key => {
      if (!updateDataLawyer[key]) {
        delete updateDataLawyer[key]
      }
    })

    const isDataUpdated = !!Object.keys(updateDataLawyer).length

    if (isDataUpdated) await this.lawyerRepo.updateNewLawyer(id, updateDataLawyer)

    return {
      message: 'Berhasil menambahkan mengubah data Pengacara'
    }
  }

  /**
   * delete lawyer by Id
   *
   * @param {string} id - uuid
   *
   * @returns {Promise<Object>}
   */
  async deleteLawyer(id) {
    await this.lawyerRepo.delete(id)
    return {
      message: 'Berhasil menghapus data Pengacara'
    }
  }
}

module.exports = new Lawyers()
