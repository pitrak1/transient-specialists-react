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

  describe('index', () => {
    it('calls success with converted data on success', () => {
      mock.onGet(`${process.env.LAMBDA_ENDPOINT}resource`).reply(200, {
        body: [{ some_key: 'some value', some_other_key: 'some other value' }],
      })
      return api.index('resource', success, failure).then(data => {
        expect(success.firstCall.args[0]).toEqual([
          {
            someKey: 'some value',
            someOtherKey: 'some other value',
          },
        ])
      })
    })
  })
})
