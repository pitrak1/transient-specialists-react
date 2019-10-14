import React from 'react'
import PropTypes from 'prop-types'
import { TableBody } from '@material-ui/core'
import FullTableRow from './full-table-row.jsx'

const FullTableBody = props => {
  const rows = props.rows.map(row => (
    <FullTableRow cells={row.cells} key={row.id} />
  ))
  return <TableBody>{rows}</TableBody>
}

FullTableBody.propTypes = {
  rows: PropTypes.array.isRequired,
}

export default FullTableBody
