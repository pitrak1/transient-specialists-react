import React from 'react'
import { Button, Grid, Toolbar, Typography } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import Title from 'common/display/title'
import Subtitle from 'common/display/subtitle'
import FullTable from 'common/display/table/full-table'
import api from 'src/api'
import utils from 'src/utils'
import { withRouter } from 'react-router'
import FormSelect from 'common/forms/form-select'
import FormTextField from 'common/forms/form-text-field'

export class ItemGroupsDetailsPage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
    handle: '',
    handleValid: false,
    modelId: 0,
    modelIdValid: false,
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

  handleChange = (identifier, value, valid) => {
    const state = {}
    state[identifier] = value
    state[`${identifier}Valid`] = valid
    this.setState(state)
  }

  handleModelAddClick = () => {
    this.setState({ loading: true })
    api.patchUpdate(
      'models',
      {
        id: this.state.modelId,
        itemGroupId: this.state.data.itemGroup.id,
        itemGroup: true,
      },
      result => {
        this.setState({ modelId: 0, modelIdValid: false })
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

  handleHandleAddClick = () => {
    this.setState({ loading: true })
    api.patchUpdate(
      'itemgroups',
      {
        id: this.state.data.itemGroup.id,
        handle: this.state.handle,
        add: true,
      },
      result => {
        this.setState({ handle: '', handleValid: false })
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
    this.setState({ loading: true })
    if (confirm('Are you sure you want to delete this item group?')) {
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

  render() {
    if (this.state.loading) {
      return <Spinner />
    }

    const itemGroup = this.state.data.itemGroup

    const models = itemGroup.models.map(model => (
      <div key={`${model.name}${model.id}`}>
        <Button
          onClick={this.handleModelDeleteClick.bind(null, model.id)}
          size='large'
          startIcon={<Delete />}
        >
          {model.name}
        </Button>
      </div>
    ))

    const handles = itemGroup.handles.map(handle => (
      <div key={`${handle.handle}${handle.id}`}>
        <Button
          onClick={this.handleHandleDeleteClick.bind(null, handle.id)}
          size='large'
          startIcon={<Delete />}
        >
          {handle.handle}
        </Button>
      </div>
    ))

    return (
      <div>
        {this.state.alert && (
          <ErrorAlert closable={true} text={this.state.alert} />
        )}
        <Toolbar>
          <Title label={itemGroup.name} />
        </Toolbar>
        <Subtitle label='Models' />
        {models}
        <br />
        <div>
          <FormSelect
            defaultOptionLabel='Select a Model'
            disabled={false}
            identifier={'modelId'}
            label='Model'
            onChange={this.handleChange}
            options={this.state.data.models}
            required={true}
            value={this.state.modelId}
          />
          <Button
            disabled={!this.state.modelIdValid}
            onClick={this.handleModelAddClick}
            size='large'
            startIcon={<Add />}
          >
            Add Model
          </Button>
        </div>
        <br />
        <Subtitle label='Handles' />
        {handles}
        <br />
        <div>
          <div>
            <FormTextField
              identifier='handle'
              label='Handle'
              onChange={this.handleChange}
              required={true}
              value={this.state.handle}
            />
          </div>
          <Button
            disabled={!this.state.handleValid}
            onClick={this.handleHandleAddClick}
            size='large'
            startIcon={<Add />}
          >
            Add Handle
          </Button>
        </div>
        <Toolbar>
          <Button
            onClick={this.handleDeleteClick}
            color='primary'
            variant='contained'
          >
            Delete Item Group
          </Button>
        </Toolbar>
      </div>
    )
  }
}

export default withRouter(ItemGroupsDetailsPage)
