import React from 'react'
import FullTableHead from 'common/display/table/full-table-head'
import FullTableHeader from 'common/display/table/full-table-header'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FullTableHead', () => {
  let ascending
  let handleSort
  let headers
  let sortBy

  beforeEach(() => {
    ascending = true
    handleSort = sinon.stub()
    headers = [
      { id: 'someHeader', type: 'value', value: 'Some Header' },
      { id: 'someHeader2', type: 'value', value: 'Some Header 2' },
      { id: 'someHeader3', type: 'value', value: 'Some Header 3' },
    ]
    sortBy = 'sortColumn'
  })

  const render = () =>
    shallow(
      <FullTableHead
        ascending={ascending}
        handleSort={handleSort}
        headers={headers}
        sortBy={sortBy}
      />,
    )

  it('renders a FullTableHeader for each header given', () => {
    const node = render()
    expect(node.find(FullTableHeader).length).toBe(3)
  })
})
