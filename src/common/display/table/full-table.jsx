import React from 'react'
import PropTypes from 'prop-types'
import { Table, TablePagination } from '@material-ui/core'
import FullTableHead from 'common/display/table/full-table-head'
import FullTableBody from 'common/display/table/full-table-body'

const FullTable = props => {
  const handleSort = id => {
    if (props.sortBy === id) {
      props.onSort(id, !props.ascending)
    } else {
      props.onSort(id, true)
    }
  }

  return (
    <div>
      <Table>
        <FullTableHead
          ascending={props.ascending}
          handleSort={handleSort}
          headers={props.headers}
          sortBy={props.sortBy}
        />
        <FullTableBody rows={props.data} />
      </Table>
      <TablePagination
        component='div'
        count={props.count}
        onChangePage={props.onPageChange}
        onChangeRowsPerPage={props.onPerPageChange}
        page={props.page}
        rowsPerPage={props.perPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </div>
  )
}

FullTable.propTypes = {
  ascending: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
}

export default FullTable
