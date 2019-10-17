import React from 'react'
import FullTableRow from 'common/display/table/full-table-row'
import FullTableBody from 'common/display/table/full-table-body'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FullTableBody', () => {
  let rows

  beforeEach(() => {
    rows = [{ id: 1, cells: [] }, { id: 2, cells: [] }, { id: 3, cells: [] }]
  })

  const render = () => shallow(<FullTableBody rows={rows} />)

  it('renders a FullTableRow for each row given', () => {
    const node = render()
    expect(node.find(FullTableRow).length).toBe(3)
  })
})
