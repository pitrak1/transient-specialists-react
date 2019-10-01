import React from 'react'
import { EquipmentPage } from '../equipment-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('EquipmentPage', () => {
  const data = [
    {
      id: 1,
      serialNumber: 'Equipment 1',
      oemName: 'OEM 3',
      modelName: 'Model 1',
      typeName: 'Type 2',
    },
    {
      id: 2,
      serialNumber: 'Equipment 2',
      oemName: 'OEM 1',
      modelName: 'Model 3',
      typeName: 'Type 3',
    },
    {
      id: 3,
      serialNumber: 'Equipment 3',
      oemName: 'OEM 2',
      modelName: 'Model 2',
      typeName: 'Type 1',
    },
  ]

  it('renders spinner if not yet loaded', () => {
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    expect(node).toMatchSnapshot()
  })

  it('renders an error if load fails', () => {
    api.getIndex = sinon.stub().callsArgWith(2, 'some error')
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    expect(node).toMatchSnapshot()
  })

  it('renders data if load succeeds', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    expect(node).toMatchSnapshot()
  })

  it('sorts data ascending when column header is clicked', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    node.instance().handleSort(null, { id: 'oemName' })
    expect(node).toMatchSnapshot()
  })

  it('sorts data descending when sorted column header is clicked', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    node.instance().handleSort(null, { id: 'oemName' })
    node.instance().handleSort(null, { id: 'oemName' })
    expect(node).toMatchSnapshot()
  })

  it('filters data based on serial number', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    node.instance().handleSearchChange(null, 'Equipment 1')
    expect(node).toMatchSnapshot()
  })

  it('filters data based on OEM name', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    node.instance().handleSearchChange(null, 'OEM 1')
    expect(node).toMatchSnapshot()
  })

  it('filters data based on model name', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    node.instance().handleSearchChange(null, 'Model 1')
    expect(node).toMatchSnapshot()
  })

  it('filters data based on type name', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<EquipmentPage match={{ params: {} }} />)
    node.instance().handleSearchChange(null, 'Type 1')
    expect(node).toMatchSnapshot()
  })
})
