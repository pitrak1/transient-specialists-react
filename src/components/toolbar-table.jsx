import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

const ToolbarTable = props => {
  const handleSort = id => {
    if (props.sortBy === id) {
      props.onSort(id, !props.ascending)
    } else {
      props.onSort(id, true)
    }
  }

  const headers = props.headers.map(header => {
    if (header.type === 'button') {
      return <TableCell key={header.id}></TableCell>
    }
    return (
      <TableCell key={header.id}>
        <TableSortLabel
          active={props.sortBy === header.id}
          direction={props.ascending ? 'asc' : 'desc'}
          onClick={handleSort.bind(null, header.id)}
        >
          {header.label}
        </TableSortLabel>
      </TableCell>
    )
  })

  const getRow = row =>
    row.cells.map(cell => {
      if (cell.type === 'button') {
        return (
          <TableCell key={cell.id}>
            <Button onClick={cell.callback.bind(null, row.id)}>
              {cell.value}
            </Button>
          </TableCell>
        )
      }
      return <TableCell key={cell.id}>{cell.value}</TableCell>
    })

  const rows = props.data.map(row => (
    <TableRow key={row.id}>{getRow(row)}</TableRow>
  ))

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
      <TablePagination
        component='div'
        count={props.count}
        onChangePage={props.onPageChange}
        onChangeRowsPerPage={props.onPerPageChange}
        page={props.page}
        rowsPerPage={props.perPage}
        rowsPerPageOptions={props.perPageOptions}
      />
    </div>
  )
}

ToolbarTable.propTypes = {
  ascending: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  perPageOptions: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
}

export default ToolbarTable
