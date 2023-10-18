'use strict'

class LawyersDTO {
  constructor (lawyersField) {
    this.lawyers_id = lawyersField?.perqara_lawyers_id
    this.lawyers_name = lawyersField?.perqara_lawyers_name
    this.lawyers_office_address = lawyersField?.perqara_lawyers_office_address
    this.lawyers_experience = lawyersField?.perqara_lawyers_experience
  }
}

module.exports = LawyersDTO
