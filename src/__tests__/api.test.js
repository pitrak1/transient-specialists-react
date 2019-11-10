import api from 'src/api'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import sinon from 'sinon'

describe('API', () => {
  let mock
  let success
  let failure

  const options = {
    ascending: true,
    page: 0,
    perPage: 10,
    searchValue: '',
    sortBy: 'name',
    hideSold: false,
  }

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
      mock
        .onGet(
          `resource?ascending=true&page=0&perPage=10&searchValue=&sortBy=name&hideSold=false`,
        )
        .reply(200, {
          body: [
            { some_key: 'some value', some_other_key: 'some other value' },
          ],
        })
      return api.getIndex('resource', options, success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual([
          {
            someKey: 'some value',
            someOtherKey: 'some other value',
          },
        ])
      })
    })

    it('calls error if no result body', () => {
      mock
        .onGet(
          `resource?ascending=true&page=0&perPage=10&searchValue=&sortBy=name&hideSold=false`,
        )
        .reply(200, {
          errorType: 'string',
          errorMessage: 'Some Error',
          trace: [],
        })
      return api.getIndex('resource', options, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })

    it('calls error if returning internal code that is not 200', () => {
      mock
        .onGet(
          `resource?ascending=true&page=0&perPage=10&searchValue=&sortBy=name&hideSold=false`,
        )
        .reply(200, {
          statusCode: 500,
          body: 'Some Error',
        })
      return api.getIndex('resource', options, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })
  })

  describe('getShow', () => {
    it('calls success with converted data on success', () => {
      mock
        .onGet(
          `resource?show=true&id=3&ascending=true&page=0&perPage=10&sortBy=name`,
        )
        .reply(200, {
          body: { some_key: 'some value', some_other_key: 'some other value' },
        })
      return api
        .getShow('resource', 3, options, success, failure)
        .then(_data => {
          expect(success.firstCall.args[0]).toEqual({
            someKey: 'some value',
            someOtherKey: 'some other value',
          })
        })
    })

    it('calls error if no result body', () => {
      mock
        .onGet(
          `resource?show=true&id=3&ascending=true&page=0&perPage=10&sortBy=name`,
        )
        .reply(200, {
          errorType: 'string',
          errorMessage: 'Some Error',
          trace: [],
        })
      return api.getIndex('resource', options, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })

    it('calls error if returning internal code that is not 200', () => {
      mock
        .onGet(
          `resource?show=true&id=3&ascending=true&page=0&perPage=10&sortBy=name`,
        )
        .reply(200, {
          statusCode: 500,
          body: 'Some Error',
        })
      return api.getIndex('resource', options, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })
  })

  describe('getNew', () => {
    it('calls success with converted data on success', () => {
      mock.onGet(`resource?new=true`).reply(200, {
        body: { some_key: 'some value', some_other_key: 'some other value' },
      })
      return api.getNew('resource', success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual({
          someKey: 'some value',
          someOtherKey: 'some other value',
        })
      })
    })

    it('calls error if no result body', () => {
      mock.onGet(`resource?new=true`).reply(200, {
        errorType: 'string',
        errorMessage: 'Some Error',
        trace: [],
      })
      return api.getIndex('resource', options, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })

    it('calls error if returning internal code that is not 200', () => {
      mock.onGet(`resource?new=true`).reply(200, {
        statusCode: 500,
        body: 'Some Error',
      })
      return api.getIndex('resource', options, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })
  })

  describe('postCreate', () => {
    it('calls success with data on success', () => {
      mock.onPost(`resource`).reply(200, {
        body: {},
      })
      return api.postCreate('resource', {}, success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual({})
      })
    })

    it('calls failure with translated error on unique type name failure', () => {
      mock.onPost(`resource`).reply(200, {
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
      mock.onPost(`resource`).reply(200, {
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
      mock.onPost(`resource`).reply(200, {
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
      mock.onPost(`resource`).reply(200, {
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

    it('calls error if no result body', () => {
      mock.onPost(`resource`).reply(200, {
        errorType: 'string',
        errorMessage: 'Some Error',
        trace: [],
      })
      return api.postCreate('resource', {}, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })
  })

  describe('deleteDestroy', () => {
    it('calls success with data on success', () => {
      mock.onDelete(`resource?id=1`).reply(200, {
        body: {},
      })
      return api.deleteDestroy('resource', 1, success, failure).then(_data => {
        expect(success.firstCall.args[0]).toEqual({})
      })
    })

    it('calls failure with translated error on foreign key model id on equipment error', () => {
      mock.onDelete(`resource?id=1`).reply(200, {
        statusCode: 500,
        body:
          'update or delete on table "models" violates foreign key constraint "equipments_model_id_fkey" on table "equipments"',
      })
      return api.deleteDestroy('resource', 1, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe(
          'Model cannot be deleted because it has related equipment',
        )
      })
    })

    it('calls failure with translated error on foreign key type id on equipment error', () => {
      mock.onDelete(`resource?id=1`).reply(200, {
        statusCode: 500,
        body:
          'update or delete on table "types" violates foreign key constraint "equipments_type_id_fkey" on table "equipments"',
      })
      return api.deleteDestroy('resource', 1, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe(
          'Type cannot be deleted because it has related equipment',
        )
      })
    })

    it('calls failure with translated error on foreign key model id on OEMs error', () => {
      mock.onDelete(`resource?id=1`).reply(200, {
        statusCode: 500,
        body:
          'update or delete on table "oems" violates foreign key constraint "models_oem_id_fkey" on table "models"',
      })
      return api.deleteDestroy('resource', 1, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toBe(
          'OEM cannot be deleted because it has related models',
        )
      })
    })

    it('calls error if no result body', () => {
      mock.onDelete(`resource?id=1`).reply(200, {
        errorType: 'string',
        errorMessage: 'Some Error',
        trace: [],
      })
      return api.deleteDestroy('resource', 1, success, failure).then(_data => {
        expect(failure.firstCall.args[0]).toEqual('Some Error')
      })
    })
  })
})
