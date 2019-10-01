import React from 'react'
import { TypesPage } from '../types-page'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import api from '../../api.js'

describe('TypesPage', () => {
  const data = [
    { id: 1, name: 'Type 1' },
    { id: 2, name: 'Type 2' },
    { id: 3, name: 'Type 3' },
  ]

  it('renders spinner if not yet loaded', () => {
    const node = shallow(<TypesPage />)
    expect(node).toMatchSnapshot()
  })

  it('renders an error if load fails', () => {
    api.getIndex = sinon.stub().callsArgWith(2, 'some error')
    const node = shallow(<TypesPage />)
    expect(node).toMatchSnapshot()
  })

  it('renders data if load succeeds', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<TypesPage />)
    expect(node).toMatchSnapshot()
  })

  it('sorts data descending when name column header is clicked', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<TypesPage />)
    node.instance().handleSort(null, { id: 'name' })
    expect(node).toMatchSnapshot()
  })

  it('sorts data ascending when name column header is clicked twice', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<TypesPage />)
    node.instance().handleSort(null, { id: 'name' })
    node.instance().handleSort(null, { id: 'name' })
    expect(node).toMatchSnapshot()
  })

  it('filters data based on search value', () => {
    api.getIndex = sinon.stub().callsArgWith(1, data)
    const node = shallow(<TypesPage />)
    node.instance().handleSearchChange(null, 'Type 1')
    expect(node).toMatchSnapshot()
  })
})
