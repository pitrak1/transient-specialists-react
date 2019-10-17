import React from 'react'
import FullTable from 'common/display/table/full-table'
import FullTableHead from 'common/display/table/full-table-head'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FullTable', () => {
  let props

  beforeEach(() => {
    props = {
      ascending: true,
      count: 123,
      data: [],
      headers: [],
      onPageChange: () => {},
      onPerPageChange: () => {},
      onSort: sinon.stub(),
      page: 5,
      perPage: 15,
      sortBy: 'someColumn',
    }
  })

  const render = () => shallow(<FullTable {...props} />)

  it('calls onSort with id and true if id does not equal sortBy', () => {
    const node = render()
    node
      .find(FullTableHead)
      .props()
      .handleSort('someOtherColumn')
    expect(props.onSort.firstCall.args).toEqual(['someOtherColumn', true])
  })

  it('calls onSort with id and true if id equals sortBy and ascending is false', () => {
    props.ascending = false
    const node = render()
    node
      .find(FullTableHead)
      .props()
      .handleSort('someColumn')
    expect(props.onSort.firstCall.args).toEqual(['someColumn', true])
  })

  it('calls onSort with id and false if id equals sortBy and ascending is true', () => {
    const node = render()
    node
      .find(FullTableHead)
      .props()
      .handleSort('someColumn')
    expect(props.onSort.firstCall.args).toEqual(['someColumn', false])
  })
})
