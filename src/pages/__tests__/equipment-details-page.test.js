import React from 'react'
import { EquipmentDetailsPage } from '../equipment-details-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('EquipmentDetailsPage', () => {
  const data = {
    id: 1,
    serialNumber: 'some serail number',
    oemId: 2,
    oemName: 'OEM 2',
    modelId: 3,
    modelName: 'Model 3',
    typeId: 4,
    typeName: 'Type 4',
  }

  window.confirm = () => true

  it('renders spinner if not yet loaded', () => {
    const node = shallow(<EquipmentDetailsPage match={{ params: { id: 1 } }} />)
    expect(node).toMatchSnapshot()
  })

  it('renders an error if load fails', () => {
    api.getShow = sinon.stub().callsArgWith(3, 'some error')
    const node = shallow(<EquipmentDetailsPage match={{ params: { id: 1 } }} />)
    expect(node).toMatchSnapshot()
  })

  it('renders page if load succeeds', () => {
    api.getShow = sinon.stub().callsArgWith(2, data)
    const node = shallow(<EquipmentDetailsPage match={{ params: { id: 1 } }} />)
    expect(node).toMatchSnapshot()
  })

  it('redirects to equipment if submit succeeds', () => {
    api.getShow = sinon.stub().callsArgWith(2, data)
    api.deleteDestroy = sinon.stub().callsArg(2)
    const push = sinon.stub()
    const node = shallow(
      <EquipmentDetailsPage match={{ params: { id: 1 } }} history={{ push }} />,
    )
    node.instance().handleDeleteClick()
    expect(push.firstCall.args[0]).toBe('/')
  })

  it('displays alert if submit fails', () => {
    api.getShow = sinon.stub().callsArgWith(2, data)
    api.deleteDestroy = sinon.stub().callsArgWith(3, 'some error')
    const node = shallow(<EquipmentDetailsPage match={{ params: { id: 1 } }} />)
    node.instance().handleDeleteClick()
    expect(node).toMatchSnapshot()
  })
})
