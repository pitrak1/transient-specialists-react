import React from 'react'
import { ModelsPage } from '../models-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('ModelsPage', () => {
  const data = [
    { id: 1, name: 'Model 1', oemName: 'OEM 3' },
    { id: 2, name: 'Model 2', oemName: 'OEM 1' },
    { id: 3, name: 'Model 3', oemName: 'OEM 2' },
  ]

  it('renders spinner if not yet loaded', () => {
    const node = shallow(<ModelsPage match={{ params: {} }} />)
    expect(node).toMatchSnapshot()
  })

  it('renders an error if load fails', () => {
    api.getIndex = sinon.stub().callsArgWith(2, 'some error')
    const node = shallow(<ModelsPage match={{ params: {} }} />)
    expect(node).toMatchSnapshot()
  })

  it('renders data if load succeeds', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<ModelsPage match={{ params: {} }} />)
    expect(node).toMatchSnapshot()
  })

  it('sorts data ascending when column header is clicked', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<ModelsPage match={{ params: {} }} />)
    node.instance().handleSort(null, { id: 'oemName' })
    expect(node).toMatchSnapshot()
  })

  it('sorts data descending when sorted column header is clicked', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<ModelsPage match={{ params: {} }} />)
    node.instance().handleSort(null, { id: 'oemName' })
    node.instance().handleSort(null, { id: 'oemName' })
    expect(node).toMatchSnapshot()
  })

  it('filters data based on model name', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<ModelsPage match={{ params: {} }} />)
    node.instance().handleSearchChange(null, 'Model 1')
    expect(node).toMatchSnapshot()
  })

  it('filters data based on OEM name', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<ModelsPage match={{ params: {} }} />)
    node.instance().handleSearchChange(null, 'OEM 1')
    expect(node).toMatchSnapshot()
  })
})
