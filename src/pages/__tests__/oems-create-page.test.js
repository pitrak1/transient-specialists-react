import React from 'react'
import { OemsCreatePage } from '../oems-create-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('OemsCreatePage', () => {
  it('renders form', () => {
    const node = shallow(<OemsCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('enables submit if fields are valid', () => {
    const node = shallow(<OemsCreatePage />)
    node.instance().handleChange('name', 'OEM 1', true)
    expect(node).toMatchSnapshot()
  })

  it('redirects to OEMs if submit succeeds', () => {
    api.postCreate = sinon.stub().callsArg(2)
    const push = sinon.stub()
    const node = shallow(<OemsCreatePage history={{ push }} />)
    node.instance().handleClick()
    expect(push.firstCall.args[0]).toBe('/oems')
  })

  it('displays alert if submit fails', () => {
    api.postCreate = sinon.stub().callsArgWith(3, 'some error')
    const node = shallow(<OemsCreatePage />)
    node.instance().handleClick()
    expect(node).toMatchSnapshot()
  })
})
