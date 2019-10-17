import React from 'react'
import FullTableRow from 'common/display/table/full-table-row'
import FullTableCell from 'common/display/table/full-table-cell'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FullTableRow', () => {
  let rowId
  let cells

  beforeEach(() => {
    rowId = 5
    cells = [
      { id: 3, type: 'text', value: 'Cell 3' },
      { id: 4, type: 'text', value: 'Cell 4' },
      { id: 5, type: 'text', value: 'Cell 5' },
    ]
  })

  const render = () => shallow(<FullTableRow cells={cells} rowId={rowId} />)

  it('renders a FullTableCell for each cell given', () => {
    const node = render()
    expect(node.find(FullTableCell).length).toBe(3)
  })
})
