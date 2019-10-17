import React from 'react'
import PropTypes from 'prop-types'
import { TableHead, TableRow } from '@material-ui/core'
import FullTableHeader from 'common/display/table/full-table-header'

const FullTableHead = props => {
  const headers = props.headers.map(header => (
    <FullTableHeader
      ascending={props.ascending}
      handleSort={props.handleSort}
      id={header.id}
      key={header.id}
      label={header.label}
      sortBy={props.sortBy}
      type={header.type}
    />
  ))

  return (
    <TableHead>
      <TableRow>{headers}</TableRow>
    </TableHead>
  )
}

FullTableHead.propTypes = {
  ascending: PropTypes.bool.isRequired,
  handleSort: PropTypes.func.isRequired,
  headers: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
}

export default FullTableHead
