import React from 'react'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import api from 'src/api'
import { withRouter } from 'react-router'
import DetailsHeader from 'common/display/details-header'
import ItemGroupsDetailsModels from 'common/pages/itemgroups_details_page/itemgroups-details-models'
import ItemGroupsDetailsHandles from 'common/pages/itemgroups_details_page/itemgroups-details-handles'
import DetailsDeleteButton from 'common/display/details-delete-button'

export class ItemGroupsDetailsPage extends React.Component {
  state = {
    alert: null,
    data: { models: [], oems: [] },
    error: null,
    loading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({ loading: true })
    api.getShow(
      'itemgroups',
      this.props.match.params.id,
      {},
      result => {
        this.setState({ loading: false, data: result })
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleModelAddClick = id => {
    this.setState({ loading: true })
    api.patchUpdate(
      'models',
      {
        id,
        itemGroupId: this.state.data.itemGroup.id,
        itemGroup: true,
      },
      result => {
        this.getData()
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleModelDeleteClick = id => {
    this.setState({ loading: true })
    api.patchUpdate(
      'models',
      { id, itemGroupId: null, itemGroup: true },
      result => {
        this.getData()
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleHandleAddClick = handle => {
    this.setState({ loading: true })
    api.patchUpdate(
      'itemgroups',
      {
        id: this.state.data.itemGroup.id,
        handle,
        add: true,
      },
      result => {
        this.getData()
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleHandleDeleteClick = id => {
    this.setState({ loading: true })
    api.patchUpdate(
      'itemgroups',
      { handleId: id, remove: true },
      result => {
        this.getData()
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this item group?')) {
      this.setState({ loading: true })

      const success = _response => {
        this.props.history.push('/itemgroups')
      }

      const failure = error => {
        this.setState({ loading: false, alert: error })
      }

      api.deleteDestroy(
        'itemgroups',
        this.state.data.itemGroup.id,
        success,
        failure,
      )
    }
  }

  handleEditClick = () => {
    this.props.history.push(`/itemgroups/edit/${this.state.data.itemGroup.id}`)
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }

    return (
      <div>
        {this.state.alert && (
          <ErrorAlert closable={true} text={this.state.alert} />
        )}
        <DetailsHeader
          label={this.state.data.itemGroup.name}
          onClick={this.handleEditClick}
        />
        <ItemGroupsDetailsModels
          associatedModels={this.state.data.itemGroup.models}
          models={this.state.data.models}
          oems={this.state.data.oems}
          onAddClick={this.handleModelAddClick}
          onDeleteClick={this.handleModelDeleteClick}
        />
        <br />
        <ItemGroupsDetailsHandles
          handles={this.state.data.itemGroup.handles}
          onAddClick={this.handleHandleAddClick}
          onDeleteClick={this.handleHandleDeleteClick}
        />
        <DetailsDeleteButton
          label='Delete Item Group'
          onDeleteClick={this.handleDeleteClick}
        />
      </div>
    )
  }
}

export default withRouter(ItemGroupsDetailsPage)
