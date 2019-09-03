import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading, Text } from '@instructure/ui-elements'
import api from '../api.js'

class TypesDetailsPage extends LoadPage {
  apiGet = () => {
    api.show(
      'types',
      this.props.match.params.id,
      this.apiSuccess,
      this.apiFailure,
    )
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
      </div>
    )
  }
}

export default TypesDetailsPage
