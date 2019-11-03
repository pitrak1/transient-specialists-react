import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableSortLabel } from '@material-ui/core'

const FullTableHeader = props => {
  if (props.type === 'button') {
    return <TableCell key={props.id} style={{ width: '1px' }}></TableCell>
  }
  return (
    <TableCell key={props.id}>
      <TableSortLabel
        active={props.sortBy === props.id}
        direction={props.ascending ? 'asc' : 'desc'}
        onClick={props.handleSort.bind(null, props.id)}
      >
        {props.label}
      </TableSortLabel>
    </TableCell>
  )
}

FullTableHeader.propTypes = {
  ascending: PropTypes.bool.isRequired,
  handleSort: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  sortBy: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

FullTableHeader.defaultProps = {
  label: '',
}

export default FullTableHeader
