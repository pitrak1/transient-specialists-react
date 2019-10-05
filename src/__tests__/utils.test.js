import utils from '../utils.js'

describe('Utils', () => {
  describe('convertObject', () => {
    it('returns null when given null', () => {
      expect(utils.convertObject(null)).toBe(null)
    })

    it('returns string when given string', () => {
      expect(utils.convertObject('some string')).toBe('some string')
    })

    it('returns number when given number', () => {
      expect(utils.convertObject(5)).toBe(5)
    })

    it('returns boolean when given boolean', () => {
      expect(utils.convertObject(true)).toBe(true)
    })

    it('returns converted object if given object', () => {
      const object = {
        key_one: 4,
        key_two: true,
        key_three: 'asdf',
        key_four: null,
      }
      const expected = {
        keyOne: 4,
        keyTwo: true,
        keyThree: 'asdf',
        keyFour: null,
      }
      expect(utils.convertObject(object)).toEqual(expected)
    })

    it('returns converted array of objects if given array of objects', () => {
      const object = [
        { key_one: 4 },
        { key_two: true },
        { key_three: 'asdf' },
        { key_four: null },
      ]
      const expected = [
        { keyOne: 4 },
        { keyTwo: true },
        { keyThree: 'asdf' },
        { keyFour: null },
      ]
      expect(utils.convertObject(object)).toEqual(expected)
    })

    it('returns converted object if given nested object of array and objects', () => {
      const object = {
        key_one: 4,
        key_two: [{ key_three: 'asdf' }, { key_four: null }],
        key_five: {
          key_six: 'sdfg',
          key_seven: 5,
          key_eight: { key_nine: false },
        },
      }
      const expected = {
        keyOne: 4,
        keyTwo: [{ keyThree: 'asdf' }, { keyFour: null }],
        keyFive: {
          keySix: 'sdfg',
          keySeven: 5,
          keyEight: { keyNine: false },
        },
      }
      expect(utils.convertObject(object)).toEqual(expected)
    })
  })
})
