import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading, Text } from '@instructure/ui-elements'
import { Link } from 'react-router-dom'
import { Button } from '@instructure/ui-buttons'
import api from '../api.js'
import { withRouter } from 'react-router'

class OemsDetailsPage extends LoadPage {
  apiGet = () => {
    api.getShow(
      'oems',
      this.props.match.params.id,
      this.apiSuccess,
      this.apiFailure,
    )
  }

  handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this oem?')) {
      const success = _response => {
        this.props.history.push('/oems')
      }

      const failure = error => {
        console.log('FAILURE')
        console.log(error)
      }
      api.deleteDestroy('oems', this.state.data.id, success, failure)
    }
  }

  renderOutput = () => {
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

    return (
      <div>
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
