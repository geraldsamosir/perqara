'use strict'

const Lawyers = require('../')

describe('Lawyers.deleteLawyer', () => {
  test('should be success', async () => {
    jest.spyOn(Lawyers.lawyerRepo, 'delete').mockResolvedValueOnce(true)

    const lawyers = await Lawyers.deleteLawyer('id')

    expect(lawyers).toEqual({
      message: 'Berhasil menghapus data Pengacara'
    })
  })
})
