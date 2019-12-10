import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import Title from 'common/display/title'
import FormTextField from 'common/forms/form-text-field'

export default class ItemGroupsEditCreatePage extends React.Component {
  state = {
    alert: null,
    error: null,
    loading: true,
    name: '',
    nameValid: false,
  }

  componentDidMount() {
    this.props.get(
      this.props.id,
      result => {
        this.setState({ loading: false, ...result })
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
    this.props.submit(
      this.state,
      result => {
        this.props.history.push('/itemgroups')
      },
      error => {
        this.setState({ loading: false, alert: error })
      },
    )
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }

    if (this.state.error) {
      return <ErrorAlert closable={false} text={this.state.error} />
    }

    return (
      <Grid container>
        {this.state.alert && (
          <ErrorAlert closable={true} text={this.state.alert} />
        )}
        <Grid item xs={12}>
          <Title label={this.props.title} />
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

ItemGroupsEditCreatePage.propTypes = {
  get: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  id: PropTypes.string,
  submit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

ItemGroupsEditCreatePage.defaultProps = {
  id: null,
}
