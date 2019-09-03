import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading, Text } from '@instructure/ui-elements'
import api from '../api.js'

class OemsDetailsPage extends LoadPage {
  apiGet = () => {
    api.show(
      'oems',
      this.props.match.params.id,
      this.apiSuccess,
      this.apiFailure,
    )
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
      </div>
    )
  }
}

export default OemsDetailsPage
