import React from 'react'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
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
      return <CircularProgress size={120} />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    return (
      <Grid container>
        {this.state.alert && (
          <Grid item xs={12}>
            {this.state.alert}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant='h6'>Add Model</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='name'
            label='Name'
            onChange={this.handleChange}
            required={true}
            value={this.state.name}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!(this.state.nameValid && this.state.oemIdValid)}
            onClick={this.handleClick}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(ModelsCreatePage)
