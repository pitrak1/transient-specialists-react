import React from 'react'
import PropTypes from 'prop-types'
import { TableRow } from '@material-ui/core'
import FullTableCell from 'common/display/table/full-table-cell'

const FullTableRow = props => {
  const cells = props.cells.map(cell => (
    <FullTableCell
      callback={cell.callback}
      id={props.rowId}
      key={cell.id}
      type={cell.type}
      value={cell.value}
    />
  ))
  return <TableRow>{cells}</TableRow>
}

FullTableRow.propTypes = {
  rowId: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
}

export default FullTableRow
