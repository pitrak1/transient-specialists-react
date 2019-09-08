import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading, Text } from '@instructure/ui-elements'
import { Link } from 'react-router-dom'
import { Button } from '@instructure/ui-buttons'
import api from '../api.js'
import { withRouter } from 'react-router'

class TypesDetailsPage extends LoadPage {
  apiGet = () => {
    api.getShow(
      'types',
      this.props.match.params.id,
      this.apiSuccess,
      this.apiFailure,
    )
  }

  handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this type?')) {
      const success = _response => {
        this.props.history.push('/types')
      }

      const failure = error => {
        console.log('FAILURE')
        console.log(error)
      }
      api.deleteDestroy('types', this.state.data.id, success, failure)
    }
  }

  renderOutput = () => {
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

    return (
      <div>
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
