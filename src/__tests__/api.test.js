import api from '../api.js'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import sinon from 'sinon'

describe('API', () => {
  let mock
  let success
  let failure
  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  beforeEach(() => {
    success = sinon.stub()
    failure = sinon.stub()
  })

  afterAll(() => {
    mock.restore()
  })

  describe('getIndex', () => {
    it('calls success with converted data on success', () => {
      mock.onGet(`${process.env.LAMBDA_ENDPOINT}resource`).reply(200, {
        body: [{ some_key: 'some value', some_other_key: 'some other value' }],
      })
      return api.getIndex('resource', success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual([
          {
            someKey: 'some value',
            someOtherKey: 'some other value',
          },
        ])
      })
    })

    it('calls failure with error on failure', () => {
      mock
        .onGet(`${process.env.LAMBDA_ENDPOINT}resource`)
        .reply(500, 'some error message')
      return api.getIndex('resource', success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe('some error message')
      })
    })
  })

  describe('getShow', () => {
    it('calls success with converted data on success', () => {
      mock.onGet(`${process.env.LAMBDA_ENDPOINT}resource?id=3`).reply(200, {
        body: { some_key: 'some value', some_other_key: 'some other value' },
      })
      return api.getShow('resource', 3, success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual({
          someKey: 'some value',
          someOtherKey: 'some other value',
        })
      })
    })

    it('calls failure with error on failure', () => {
      mock
        .onGet(`${process.env.LAMBDA_ENDPOINT}resource?id=3`)
        .reply(500, 'some error message')
      return api.getShow('resource', 3, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe('some error message')
      })
    })
  })

  describe('getNew', () => {
    it('calls success with converted data on success', () => {
      mock.onGet(`${process.env.LAMBDA_ENDPOINT}resource?new=true`).reply(200, {
        body: { some_key: 'some value', some_other_key: 'some other value' },
      })
      return api.getNew('resource', success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual({
          someKey: 'some value',
          someOtherKey: 'some other value',
        })
      })
    })

    it('calls failure with error on failure', () => {
      mock
        .onGet(`${process.env.LAMBDA_ENDPOINT}resource?new=true`)
        .reply(500, 'some error message')
      return api.getNew('resource', success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe('some error message')
      })
    })
  })

  describe('postCreate', () => {
    it('calls success with data on success', () => {
      mock.onPost(`${process.env.LAMBDA_ENDPOINT}resource`).reply(200, {
        body: {},
      })
      return api.postCreate('resource', {}, success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual({})
      })
    })

    it('calls failure with translated error on unique type name failure', () => {
      mock.onPost(`${process.env.LAMBDA_ENDPOINT}resource`).reply(200, {
        statusCode: 500,
        body: 'duplicate key value violates unique constraint "idx_type_name"',
      })
      return api.postCreate('resource', {}, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe(
          'Name must be unique (case insensitive)',
        )
      })
    })

    it('calls failure with translated error on unique OEM name failure', () => {
      mock.onPost(`${process.env.LAMBDA_ENDPOINT}resource`).reply(200, {
        statusCode: 500,
        body: 'duplicate key value violates unique constraint "idx_oem_name"',
      })
      return api.postCreate('resource', {}, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe(
          'Name must be unique (case insensitive)',
        )
      })
    })

    it('calls failure with translated error on unique model name failure', () => {
      mock.onPost(`${process.env.LAMBDA_ENDPOINT}resource`).reply(200, {
        statusCode: 500,
        body: 'duplicate key value violates unique constraint "idx_model_name"',
      })
      return api.postCreate('resource', {}, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe(
          'Name must be unique (case insensitive)',
        )
      })
    })

    it('calls failure with translated error on unique equipment serial number failure', () => {
      mock.onPost(`${process.env.LAMBDA_ENDPOINT}resource`).reply(200, {
        statusCode: 500,
        body:
          'duplicate key value violates unique constraint "idx_equipment_serial_number"',
      })
      return api.postCreate('resource', {}, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe(
          'Serial Number must be unique (case insensitive)',
        )
      })
    })
  })
})
