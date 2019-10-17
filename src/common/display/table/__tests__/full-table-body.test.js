import React from 'react'
import FullTableRow from 'common/display/table/full-table-row'
import FullTableBody from 'common/display/table/full-table-body'
import { shallow } from 'enzyme'

describe('FullTableBody', () => {
  let props

  beforeEach(() => {
    props = {
      rows: [{ id: 1, cells: [] }, { id: 2, cells: [] }, { id: 3, cells: [] }],
    }
  })

  const render = () => shallow(<FullTableBody {...props} />)

  it('renders a FullTableRow for each row given', () => {
    const node = render()
    expect(node.find(FullTableRow).length).toBe(3)
  })
})
