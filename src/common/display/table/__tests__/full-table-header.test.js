import React from 'react'
import FullTableHeader from 'common/display/table/full-table-header'
import { TableCell, TableSortLabel } from '@material-ui/core'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FullTableHeader', () => {
  let ascending
  let handleSort
  let id
  let label
  let sortBy
  let type

  beforeEach(() => {
    ascending = true
    handleSort = sinon.stub()
    id = 'someColumn'
    label = 'Some Header'
    sortBy = 'sortColumn'
    type = 'value'
  })

  const render = () =>
    shallow(
      <FullTableHeader
        ascending={ascending}
        handleSort={handleSort}
        id={id}
        label={label}
        sortBy={sortBy}
        type={type}
      />,
    )

  it('renders an empty cell if type is button', () => {
    type = 'button'
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.text()).toEqual('')
  })

  it('renders a cell with label if type is value', () => {
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.text()).toEqual('Some Header')
  })

  it('sets header active to true if sortBy matches id', () => {
    id = 'sortColumn'
    const node = render()
    expect(node.find(TableSortLabel).props().active).toBe(true)
  })

  it('sets header active to false if sortBy matches id', () => {
    const node = render()
    expect(node.find(TableSortLabel).props().active).toBe(false)
  })

  it('sets header active to true if sortBy matches id', () => {
    id = 'sortColumn'
    const node = render()
    expect(node.find(TableSortLabel).props().active).toBe(true)
  })

  it('sets header direction to asc if ascending', () => {
    const node = render()
    expect(node.find(TableSortLabel).props().direction).toBe('asc')
  })

  it('sets header direction to asc if ascending', () => {
    ascending = false
    const node = render()
    expect(node.find(TableSortLabel).props().direction).toBe('desc')
  })

  it('calls handleSort with id if header is clicked', () => {
    handleSort = sinon.stub()
    const node = render()
    node
      .find(TableSortLabel)
      .props()
      .onClick()
    expect(handleSort.firstCall.args[0]).toBe('someColumn')
  })
})
