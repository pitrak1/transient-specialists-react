import React from 'react'
import PropTypes from 'prop-types'
import { TableRow } from '@material-ui/core'
import FullTableCell from './full-table-cell.jsx'

const FullTableRow = props => {
  const cells = props.cells.map(cell => (
    <FullTableCell
      callback={cell.callback}
      id={cell.id}
      key={cell.id}
      type={cell.type}
      value={cell.value}
    />
  ))
  return <TableRow>{cells}</TableRow>
}

FullTableRow.propTypes = {
  cells: PropTypes.array.isRequired,
}

export default FullTableRow
