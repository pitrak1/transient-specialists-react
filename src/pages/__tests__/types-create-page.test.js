import React from 'react'
import { TypesCreatePage } from '../types-create-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('TypesCreatePage', () => {
  it('renders form', () => {
    const node = shallow(<TypesCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('enables submit if fields are valid', () => {
    const node = shallow(<TypesCreatePage />)
    node.instance().handleChange('name', 'Type 1', true)
    expect(node).toMatchSnapshot()
  })

  it('redirects to types if submit succeeds', () => {
    api.postCreate = sinon.stub().callsArg(2)
    const push = sinon.stub()
    const node = shallow(<TypesCreatePage history={{ push }} />)
    node.instance().handleClick()
    expect(push.firstCall.args[0]).toBe('/types')
  })

  it('displays alert if submit fails', () => {
    api.postCreate = sinon.stub().callsArgWith(3, 'some error')
    const node = shallow(<TypesCreatePage />)
    node.instance().handleClick()
    expect(node).toMatchSnapshot()
  })
})
