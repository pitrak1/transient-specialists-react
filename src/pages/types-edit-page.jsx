import React from 'react'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import FormTextField from '../components/form-text-field.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class TypesEditPage extends React.Component {
  state = {
    alert: null,
    error: null,
    loading: true,
    name: '',
    nameValid: false,
  }

  componentDidMount() {
    api.getEdit(
      'types',
      this.props.match.params.id,
      result => {
        const { id, name } = result.type
        this.setState({ loading: false, id, name: name, nameValid: true })
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
    api.patchUpdate(
      'types',
      { id: this.state.id, name: this.state.name },
      () => {
        this.props.history.push('/types')
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
          <Typography variant='h6'>Edit Type</Typography>
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
          <Button disabled={!this.state.nameValid} onClick={this.handleClick}>
            Submit
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(TypesEditPage)
