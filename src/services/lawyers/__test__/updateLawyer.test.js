'use strict'

const Lawyers = require('../')

describe('Lawyers.updateLawyer', () => {
  test('should be success', async () => {
    const lawyers = await Lawyers.updateLawyer()

    expect(lawyers).toEqual({
      message: 'Berhasil menambahkan mengubah data Pengacara'
    })
  })

  test('should be success', async () => {
    jest.spyOn(Lawyers.lawyerRepo, 'updateNewLawyer').mockResolvedValueOnce(true)

    const lawyers = await Lawyers.updateLawyer('id', { name: 'name' })

    expect(lawyers).toEqual({
      message: 'Berhasil menambahkan mengubah data Pengacara'
    })
  })
})
