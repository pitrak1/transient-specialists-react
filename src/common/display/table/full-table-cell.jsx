import React from 'react'
import PropTypes from 'prop-types'
import { Button, TableCell } from '@material-ui/core'
import utils from 'src/utils'

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

  if (props.type === 'date') {
    return (
      <TableCell key={props.id}>
        {utils.displayDateFromISO(props.value)}
      </TableCell>
    )
  }

  return <TableCell key={props.id}>{props.value}</TableCell>
}

FullTableCell.propTypes = {
  callback: PropTypes.func,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}

FullTableCell.defaultProps = {
  callback: () => {},
  value: '',
}

export default FullTableCell
