import React from 'react'
import PropTypes from 'prop-types'
import { Button, TableCell } from '@material-ui/core'

const FullTableCell = props => {
  if (props.type === 'button') {
    return (
      <TableCell key={props.id}>
        <Button onClick={props.callback.bind(null, props.id)}>
          {props.value}
        </Button>
      </TableCell>
    )
  }
  return <TableCell key={props.id}>{props.value}</TableCell>
}

FullTableCell.propTypes = {
  callback: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}

FullTableCell.defaultProps = {
  callback: () => {},
  value: '',
}

export default FullTableCell
