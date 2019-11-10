import React from 'react'
import PropTypes from 'prop-types'
import FullTable from 'common/display/table/full-table'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import Title from 'common/display/title'
import SearchField from 'common/display/search-field'
import { Button, Toolbar, Checkbox, FormControlLabel } from '@material-ui/core'
import api from 'src/api'

export default class IndexPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    hideSold: false,
    loading: true,
    page: 0,
    perPage: 25,
    searchValue: this.props.defaultSearchValue,
    sortBy: this.props.defaultSortBy,
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({ loading: true })
    const {
      ascending,
      page,
      perPage,
      searchValue,
      sortBy,
      hideSold,
    } = this.state
    api.getIndex(
      this.props.resource,
      {
        ascending,
        page,
        perPage,
        searchValue,
        sortBy,
        hideSold,
      },
      result => {
        this.setState({ loading: false, ...result })
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleDetailsClick = id => {
    this.props.history.push(`/${this.props.resource}/details/${id}`)
  }

  handleShowEquipmentClick = id => {
    const datum = this.state.data.filter(o => o.id == id)[0]
    this.props.history.push(`/equipment/search/${datum.name}`)
  }

  handleShowModelsClick = id => {
    const datum = this.state.data.filter(o => o.id == id)[0]
    this.props.history.push(`/models/search/${datum.name}`)
  }

  handleEditClick = id => {
    this.props.history.push(`/${this.props.resource}/edit/${id}`)
  }

  handleDeleteClick = id => {
    if (confirm('Are you sure you want to delete this?')) {
      this.setState({ loading: true })
      api.deleteDestroy(
        this.props.resource,
        id,
        _response => {
          this.getData()
        },
        error => {
          this.setState({ loading: false, alert: error })
        },
      )
    }
  }

  handleAddClick = _event => {
    this.props.history.push(`/${this.props.resource}/create`)
  }

  handleSearchChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  handleSearchClick = () => {
    this.getData()
  }

  handlePageChange = (_event, newPage) => {
    this.setState({ page: newPage }, this.getData)
  }

  handlePerPageChange = event => {
    this.setState({ perPage: event.target.value }, this.getData)
  }

  handleHideSoldChange = event => {
    this.setState({ hideSold: event.target.checked }, this.getData)
  }

  handleSort = (sortBy, ascending) => {
    this.setState({ sortBy, ascending }, this.getData)
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }

    if (this.state.error) {
      return <ErrorAlert closable={false} text={this.state.error} />
    }

    const transformedData = this.props
      .transformData(this.state.data)
      .map(row => {
        const cells = row.cells.map(cell => {
          const result = { ...cell }
          if (cell.type === 'button') {
            if (cell.callback === 'details') {
              result.callback = this.handleDetailsClick
            } else if (cell.callback === 'showEquipment') {
              result.callback = this.handleShowEquipmentClick
            } else if (cell.callback === 'showModels') {
              result.callback = this.handleShowModelsClick
            } else if (cell.callback === 'edit') {
              result.callback = this.handleEditClick
            } else if (cell.callback === 'delete') {
              result.callback = this.handleDeleteClick
            }
          }
          return result
        })
        return { id: row.id, cells }
      })

    return (
      <div>
        {this.state.alert && (
          <ErrorAlert closable={true} text={this.state.alert} />
        )}
        <Toolbar>
          <Title label={this.props.title} />
          <Button onClick={this.handleAddClick}>Add</Button>
          <div style={{ flexGrow: 1 }}></div>
          {this.props.title === 'Equipment' && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.hideSold}
                  onChange={this.handleHideSoldChange}
                  color='primary'
                />
              }
              label='Hide Sold'
            />
          )}
          <SearchField
            onSearchChange={this.handleSearchChange}
            onSearchClick={this.handleSearchClick}
            value={this.state.searchValue}
          />
        </Toolbar>
        <FullTable
          ascending={this.state.ascending}
          count={parseInt(this.state.count)}
          data={transformedData}
          headers={this.props.headers}
          onPageChange={this.handlePageChange}
          onPerPageChange={this.handlePerPageChange}
          onSort={this.handleSort}
          page={this.state.page}
          perPage={this.state.perPage}
          perPageOptions={[5, 10, 25]}
          sortBy={this.state.sortBy}
        />
      </div>
    )
  }
}

IndexPage.propTypes = {
  defaultSearchValue: PropTypes.string,
  defaultSortBy: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  resource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  transformData: PropTypes.func.isRequired,
}

IndexPage.defaultProps = {
  defaultSearchValue: '',
}
