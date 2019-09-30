import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading, Text } from '@instructure/ui-elements'
import { Link } from 'react-router-dom'
import { Button } from '@instructure/ui-buttons'
import api from '../api.js'
import { withRouter } from 'react-router'

class OemsDetailsPage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
  }

  componentDidMount() {
    api.getShow(
      'oems',
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
    if (confirm('Are you sure you want to delete this oem?')) {
      const success = _response => {
        this.props.history.push('/oems')
      }

      const failure = error => {
        this.setState({ loading: false, alert: error })
      }
      api.deleteDestroy('oems', this.state.data.id, success, failure)
    }
  }

  render() {
    const oem = this.state.data
    const fields = [
      { label: 'ID: ', value: oem.id },
      { label: 'Name: ', value: oem.name },
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
          {oem.name}
        </Heading>
        {fields}
        <Link to={`/models/search/${oem.name}`}>Show Models for OEM</Link>
        <Link to={`/equipment/search/${oem.name}`}>Show Equipment for OEM</Link>
        <Button onClick={this.handleDeleteClick}>Delete</Button>
      </div>
    )
  }
}

export default withRouter(OemsDetailsPage)
