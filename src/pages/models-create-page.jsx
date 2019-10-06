import React from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import FormTextField from '../components/form-text-field.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class ModelsCreatePage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
    name: '',
    nameValid: false,
    oemId: 0,
    oemIdValid: false,
  }

  componentDidMount() {
    api.getNew(
      'models',
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

  handleClick = () => {
    this.setState({ loading: true, alert: null })
    api.postCreate(
      'models',
      { name: this.state.name, oemId: this.state.oemId },
      () => {
        this.props.history.push('/models')
      },
      error => {
        this.setState({ loading: false, alert: error })
      },
    )
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Typography variant='h5'>Add Model</Typography>
        <FormTextField
          identifier='name'
          label='Name'
          onChange={this.handleChange}
          required={true}
          value={this.state.name}
        />
        <FormSelect
          defaultOptionLabel='Select an OEM'
          disabled={false}
          identifier={'oemId'}
          label='OEM'
          onChange={this.handleChange}
          options={this.state.data.oems}
          required={true}
          value={this.state.oemId}
        />
        <Button
          disabled={!(this.state.nameValid && this.state.oemIdValid)}
          onClick={this.handleClick}
        >
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(ModelsCreatePage)
