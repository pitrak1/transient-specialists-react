import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading, Text } from '@instructure/ui-elements'
import { Link } from 'react-router-dom'
import { Button } from '@instructure/ui-buttons'
import api from '../api.js'
import { withRouter } from 'react-router'

class TypesDetailsPage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
  }

  componentDidMount() {
    api.getShow(
      'types',
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
    if (confirm('Are you sure you want to delete this type?')) {
      const success = _response => {
        this.props.history.push('/types')
      }

      const failure = error => {
        this.setState({ loading: false, alert: error })
      }
      api.deleteDestroy('types', this.state.data.id, success, failure)
    }
  }

  render() {
    const type = this.state.data
    const fields = [
      { label: 'ID: ', value: type.id },
      { label: 'Name: ', value: type.name },
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
          {type.name}
        </Heading>
        {fields}
        <Link to={`/equipment/search/${type.name}`}>
          Show Equipment for Type
        </Link>
        <Button onClick={this.handleDeleteClick}>Delete</Button>
      </div>
    )
  }
}

export default withRouter(TypesDetailsPage)
