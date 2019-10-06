import React from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import FormTextField from '../components/form-text-field.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class OemsCreatePage extends React.Component {
  state = {
    alert: null,
    loading: false,
    name: '',
    nameValid: false,
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
      'oems',
      { name: this.state.name },
      () => {
        this.props.history.push('/oems')
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

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Typography variant='h5'>Add OEM</Typography>
        <FormTextField
          identifier='name'
          label='Name'
          onChange={this.handleChange}
          required={true}
          value={this.state.name}
        />
        <Button disabled={!this.state.nameValid} onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(OemsCreatePage)
