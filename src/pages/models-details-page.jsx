import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading, Text } from '@instructure/ui-elements'
import { Link } from 'react-router-dom'
import { Button } from '@instructure/ui-buttons'
import api from '../api.js'
import { withRouter } from 'react-router'

class ModelsDetailsPage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
  }

  componentDidMount() {
    api.getShow(
      'models',
      this.props.match.params.id,
      result => {
        this.setState({ loading: false, data: result })
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
  }

  handleChange = object => {
    this.setState(object)
  }

  handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this model?')) {
      const success = _response => {
        this.props.history.push('/models')
      }

      const failure = error => {
        this.setState({ loading: false, alert: error })
      }
      api.deleteDestroy('models', this.state.data.id, success, failure)
    }
  }

  render() {
    const model = this.state.data
    const fields = [
      { label: 'ID: ', value: model.id },
      { label: 'Name: ', value: model.name },
      { label: 'OEM ID: ', value: model.oemId },
      { label: 'OEM Name: ', value: model.oemName },
    ].map(field => (
      <div key={field.label}>
        <Text weight='bold'>{field.label}</Text>
        <Text>{field.value}</Text>
      </div>
    ))

    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
        <Heading level='h1' margin='medium'>
          {model.name}
        </Heading>
        {fields}
        <Link to={`/equipment/search/${model.name}`}>
          Show Equipment for Model
        </Link>
        <Button onClick={this.handleDeleteClick}>Delete</Button>
      </div>
    )
  }
}

export default withRouter(ModelsDetailsPage)
