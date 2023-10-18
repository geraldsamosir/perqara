'use strict'

const Lawyers = require('../')

const mockResultFilter = {
  perqara_lawyers_id: 'perqara_lawyers_id',
  perqara_lawyers_name: 'perqara_lawyers_name',
  perqara_lawyers_office_address: 'perqara_lawyers_office_address',
  perqara_lawyers_experience: 'perqara_lawyers_experience'
}

describe('Lawyers.filterById', () => {
  test('should be success', async () => {
    jest.spyOn(Lawyers.lawyerRepo, 'findById').mockResolvedValueOnce(mockResultFilter)

    const lawyers = await Lawyers.filterById('id')

    expect(lawyers).toEqual({
      message: 'Berhasil mendapatkan data Pengacara',
      data: {
        lawyers_id: 'perqara_lawyers_id',
        lawyers_name: 'perqara_lawyers_name',
        lawyers_office_address: 'perqara_lawyers_office_address',
        lawyers_experience: 'perqara_lawyers_experience'
      }
    })
  })
})
