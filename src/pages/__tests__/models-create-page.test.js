import React from 'react'
import { ModelsCreatePage } from '../models-create-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('ModelsCreatePage', () => {
  const data = {
    oems: [
      { id: 1, name: 'OEM 1' },
      { id: 2, name: 'OEM 2' },
      { id: 3, name: 'OEM 3' },
    ],
  }
  it('renders spinner if not yet loaded', () => {
    const node = shallow(<ModelsCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('renders an error if load fails', () => {
    api.getNew = sinon.stub().callsArgWith(2, 'some error')
    const node = shallow(<ModelsCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('renders form if load succeeds', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    const node = shallow(<ModelsCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('enables submit if fields are valid', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    const node = shallow(<ModelsCreatePage />)
    node.instance().handleChange('name', 'Model 1', true)
    node.instance().handleChange('oemId', 1, true)
    expect(node).toMatchSnapshot()
  })

  it('redirects to models if submit succeeds', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    api.postCreate = sinon.stub().callsArg(2)
    const push = sinon.stub()
    const node = shallow(<ModelsCreatePage history={{ push }} />)
    node.instance().handleClick()
    expect(push.firstCall.args[0]).toBe('/models')
  })

  it('displays alert if submit fails', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    api.postCreate = sinon.stub().callsArgWith(3, 'some error')
    const node = shallow(<ModelsCreatePage />)
    node.instance().handleClick()
    expect(node).toMatchSnapshot()
  })
})
