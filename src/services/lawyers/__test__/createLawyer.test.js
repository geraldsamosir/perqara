'use strict'

const Lawyers = require('../')

describe('Lawyers.createLawyer', () => {
  test('should be success', async () => {
    jest.spyOn(Lawyers.lawyerRepo, 'createNewLawyer').mockResolvedValueOnce(true)

    const lawyers = await Lawyers.createLawyer()

    expect(lawyers).toEqual({
      message: 'Berhasil menambahkan data Pengacara'
    })
  })
})
