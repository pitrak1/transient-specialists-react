import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading, Text } from '@instructure/ui-elements'
import api from '../api.js'

class ModelsDetailsPage extends LoadPage {
  apiGet = () => {
    api.show(
      'models',
      this.props.match.params.id,
      this.apiSuccess,
      this.apiFailure,
    )
  }

  renderOutput = () => {
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

    return (
      <div>
        <Heading level='h1' margin='medium'>
          {model.name}
        </Heading>
        {fields}
      </div>
    )
  }
}

export default ModelsDetailsPage
