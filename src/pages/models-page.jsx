import React from 'react'
import FullTable from '../components/table/full-table.jsx'
import IndexToolbar from '../components/index-toolbar.jsx'
import ErrorAlert from '../components/error-alert.jsx'
import Spinner from '../components/spinner.jsx'
import { withRouter } from 'react-router'
import api from '../api.js'

export class ModelsPage extends React.Component {
  state = {
    alert: null,
    ascending: true,
    data: {},
    error: null,
    loading: true,
    page: 0,
    perPage: 10,
    searchValue: this.props.match.params.search || '',
    sortBy: 'name',
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({ loading: true })
    const { ascending, page, perPage, searchValue, sortBy } = this.state
    api.getIndex(
      'models',
      {
        ascending,
        page,
        perPage,
        searchValue,
        sortBy,
      },
      result => {
        this.setState({ loading: false, ...result })
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleShowClick = id => {
    const model = this.state.data.filter(m => m.id == id)[0]
    this.props.history.push(`/equipment/search/${model.name}`)
  }

  handleEditClick = id => {
    this.props.history.push(`/models/edit/${id}`)
  }

  handleDeleteClick = id => {
    if (confirm('Are you sure you want to delete this model?')) {
      this.setState({ loading: true })
      api.deleteDestroy(
        'models',
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
    this.props.history.push(`/models/create`)
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

    const headers = [
      { type: 'value', id: 'name', label: 'Name' },
      { type: 'value', id: 'oemName', label: 'OEM' },
      { type: 'button', id: 'showEquipment' },
      { type: 'button', id: 'edit' },
      { type: 'button', id: 'delete' },
    ]

    const data = this.state.data.map(model => ({
      id: model.id,
      cells: [
        { id: 'name', type: 'value', value: model.name },
        { id: 'oemName', type: 'value', value: model.oemName },
        {
          id: 'showEquipment',
          type: 'button',
          value: 'Equipment',
          callback: this.handleShowClick,
        },
        {
          id: 'edit',
          type: 'button',
          value: 'Edit',
          callback: this.handleEditClick,
        },
        {
          id: 'delete',
          type: 'button',
          value: 'Delete',
          callback: this.handleDeleteClick,
        },
      ],
    }))

    return (
      <div>
        {this.state.alert && (
          <ErrorAlert closable={true} text={this.state.alert} />
        )}
        <IndexToolbar
          onAddClick={this.handleAddClick}
          onSearchChange={this.handleSearchChange}
          onSearchClick={this.handleSearchClick}
          searchValue={this.state.searchValue}
          title='Models'
        />
        <FullTable
          ascending={this.state.ascending}
          count={parseInt(this.state.count)}
          data={data}
          headers={headers}
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

export default withRouter(ModelsPage)
