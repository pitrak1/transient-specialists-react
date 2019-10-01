import React from 'react'
import { EquipmentCreatePage } from '../equipment-create-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('EquipmentCreatePage', () => {
  const data = {
    oems: [
      { id: 1, name: 'OEM 1' },
      { id: 2, name: 'OEM 2' },
      { id: 3, name: 'OEM 3' },
    ],
    models: [
      { id: 4, name: 'Model 1', oemId: 1 },
      { id: 5, name: 'Model 2', oemId: 2 },
      { id: 6, name: 'Model 3', oemId: 3 },
    ],
    types: [
      { id: 7, name: 'Type 1' },
      { id: 8, name: 'Type 2' },
      { id: 9, name: 'Type 3' },
    ],
  }

  it('renders spinner if not yet loaded', () => {
    const node = shallow(<EquipmentCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('renders an error if load fails', () => {
    api.getNew = sinon.stub().callsArgWith(2, 'some error')
    const node = shallow(<EquipmentCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('renders form if load succeeds', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentCreatePage />)
    expect(node).toMatchSnapshot()
  })

  it('enables model select if OEM ID is set', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentCreatePage />)
    node.instance().handleChange('oemId', 1, true)
    expect(node).toMatchSnapshot()
  })

  it('enables submit if fields are valid', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentCreatePage />)
    node.instance().handleChange('serialNumber', 'Equipment 1', true)
    node.instance().handleChange('oemId', 1, true)
    node.instance().handleChange('modelId', 4, true)
    node.instance().handleChange('typeId', 7, true)
    expect(node).toMatchSnapshot()
  })

  it('redirects to equipment if submit succeeds', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    api.postCreate = sinon.stub().callsArg(2)
    const push = sinon.stub()
    const node = shallow(<EquipmentCreatePage history={{ push }} />)
    node.instance().handleClick()
    expect(push.firstCall.args[0]).toBe('/')
  })

  it('displays alert if submit fails', () => {
    api.getNew = sinon.stub().callsArgWith(1, data)
    api.postCreate = sinon.stub().callsArgWith(3, 'some error')
    const node = shallow(<EquipmentCreatePage />)
    node.instance().handleClick()
    expect(node).toMatchSnapshot()
  })
})
