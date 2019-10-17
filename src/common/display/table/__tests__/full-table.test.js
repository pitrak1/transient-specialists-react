import React from 'react'
import FullTable from 'common/display/table/full-table'
import FullTableHead from 'common/display/table/full-table-head'
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
  let sortBy

  beforeEach(() => {
    ascending = true
    count = 123
    data = []
    headers = []
    onPageChange = () => {}
    onPerPageChange = () => {}
    onSort = sinon.stub()
    page = 5
    perPage = 15
    sortBy = 'someColumn'
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
        sortBy={sortBy}
      />,
    )

  it('calls onSort with id and true if id does not equal sortBy', () => {
    const node = render()
    node
      .find(FullTableHead)
      .props()
      .handleSort('someOtherColumn')
    expect(onSort.firstCall.args).toEqual(['someOtherColumn', true])
  })

  it('calls onSort with id and true if id equals sortBy and ascending is false', () => {
    ascending = false
    const node = render()
    node
      .find(FullTableHead)
      .props()
      .handleSort('someColumn')
    expect(onSort.firstCall.args).toEqual(['someColumn', true])
  })

  it('calls onSort with id and false if id equals sortBy and ascending is true', () => {
    const node = render()
    node
      .find(FullTableHead)
      .props()
      .handleSort('someColumn')
    expect(onSort.firstCall.args).toEqual(['someColumn', false])
  })
})
