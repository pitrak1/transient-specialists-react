import utils from 'src/utils'

describe('Utils', () => {
  describe('snakeToPascal', () => {
    it('converts from snake to pascal case', () => {
      expect(utils.snakeToPascal('some_string_here')).toBe('someStringHere')
    })

    it('returns null if given null', () => {
      expect(utils.snakeToPascal(null)).toBe(null)
    })

    it('returns null if given non string', () => {
      expect(utils.snakeToPascal(123)).toBe(null)
    })
  })

  describe('pascalToSnake', () => {
    it('converts from pascal to snake case', () => {
      expect(utils.pascalToSnake('someStringHere')).toBe('some_string_here')
    })

    it('returns null if given null', () => {
      expect(utils.pascalToSnake(null)).toBe(null)
    })

    it('returns null if given non string', () => {
      expect(utils.pascalToSnake(123)).toBe(null)
    })
  })

  describe('snakeToPascalObject', () => {
    it('returns null when given null', () => {
      expect(utils.snakeToPascalObject(null)).toBe(null)
    })

    it('returns string when given string', () => {
      expect(utils.snakeToPascalObject('some string')).toBe('some string')
    })

    it('returns number when given number', () => {
      expect(utils.snakeToPascalObject(5)).toBe(5)
    })

    it('returns boolean when given boolean', () => {
      expect(utils.snakeToPascalObject(true)).toBe(true)
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
      expect(utils.snakeToPascalObject(object)).toEqual(expected)
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
      expect(utils.snakeToPascalObject(object)).toEqual(expected)
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
      expect(utils.snakeToPascalObject(object)).toEqual(expected)
    })
  })

  describe('displayDateFromISO', () => {
    it('converts ISO to display date', () => {
      expect(utils.displayDateFromISO('2018-10-18T12:45:23.000Z')).toBe(
        '10/18/2018',
      )
    })

    it('returns null if given null', () => {
      expect(utils.displayDateFromISO(null)).toBe(null)
    })

    it('returns null if given non string', () => {
      expect(utils.displayDateFromISO(123)).toBe(null)
    })
  })
})
