import React from 'react'
import FullTable from '../full-table.jsx'
import { Button, TableCell, TableRow, TableSortLabel } from '@material-ui/core'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FullTable', () => {
  let ascending
  let count
  let data
  let headers
  let onPageChange
  let onPerPageChange
  let onSort
  let page
  let perPage
  let perPageOptions
  let sortBy

  beforeEach(() => {
    ascending = true
    count = 0
    data = []
    headers = []
    onPageChange = () => {}
    onPerPageChange = () => {}
    onSort = sinon.stub()
    page = 0
    perPage = 5
    perPageOptions = [5, 10, 25]
    sortBy = 'name'
  })

  const render = () =>
    shallow(
      <FullTable
        ascending={ascending}
        count={count}
        data={data}
        headers={headers}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        onSort={onSort}
        page={page}
        perPage={perPage}
        perPageOptions={perPageOptions}
        sortBy={sortBy}
      />,
    )

  it('renders if given no data', () => {
    const node = render()
    expect(node.length).toBe(1)
  })

  it('renders button headers', () => {
    headers = [{ type: 'button', id: 'someId' }]
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.find(TableCell).text()).toBe('')
  })

  it('renders value headers', () => {
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.find(TableCell).text()).toBe('Some Header')
  })

  it('shows sort arrow if rendered header is currently being used to sort', () => {
    sortBy = 'someId'
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    expect(node.find(TableSortLabel).props().active).toBe(true)
  })

  it('hides sort arrow if rendered header is not currently being used to sort', () => {
    sortBy = 'someOtherId'
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    expect(node.find(TableSortLabel).props().active).toBe(false)
  })

  it('shows sort arrow upward if ascending is true', () => {
    ascending = true
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    expect(node.find(TableSortLabel).props().direction).toBe('asc')
  })

  it('shows sort arrow downward if ascending is false', () => {
    ascending = false
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    expect(node.find(TableSortLabel).props().direction).toBe('desc')
  })

  it('calls onSort with column id and true if not currently being used to sort', () => {
    sortBy = 'someOtherId'
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    node
      .find(TableSortLabel)
      .props()
      .onClick()
    expect(onSort.firstCall.args).toEqual(['someId', true])
  })

  it('calls onSort with column id and true if currently being used to sort descending', () => {
    sortBy = 'someId'
    ascending = false
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    node
      .find(TableSortLabel)
      .props()
      .onClick()
    expect(onSort.firstCall.args).toEqual(['someId', true])
  })

  it('calls onSort with column id and false if currently being used to sort ascending', () => {
    sortBy = 'someId'
    ascending = true
    headers = [{ type: 'value', id: 'someId', label: 'Some Header' }]
    const node = render()
    node
      .find(TableSortLabel)
      .props()
      .onClick()
    expect(onSort.firstCall.args).toEqual(['someId', false])
  })

  it('renders a row for each row of data given plus one for headers', () => {
    data = [{ id: 1, cells: [] }, { id: 2, cells: [] }, { id: 3, cells: [] }]
    const node = render()
    expect(node.find(TableRow).length).toEqual(4)
  })

  it('renders value cells', () => {
    data = [
      {
        id: 1,
        cells: [
          {
            type: 'value',
            id: 'someId',
            value: 'Some Value',
          },
        ],
      },
    ]
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.find(TableCell).text()).toBe('Some Value')
  })

  it('renders button cells', () => {
    data = [
      {
        id: 1,
        cells: [
          {
            type: 'button',
            id: 'someId',
            value: 'Some Value',
            callback: sinon.stub(),
          },
        ],
      },
    ]
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.find(TableCell).text()).toBe('Some Value')
  })

  it('calls cell callback with row id when button is clicked', () => {
    data = [
      {
        id: 1,
        cells: [
          {
            type: 'button',
            id: 'someId',
            value: 'Some Value',
            callback: sinon.stub(),
          },
        ],
      },
    ]
    const node = render()
    node
      .find(Button)
      .props()
      .onClick()
    expect(data[0].cells[0].callback.firstCall.args).toEqual([1])
  })
})
