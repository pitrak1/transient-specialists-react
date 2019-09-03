import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'

class LoadPage extends React.Component {
  state = {
    data: {},
    error: null,
    loading: true,
  }

  componentDidMount() {
    this.apiGet()
  }

  apiGet = () => {
    // ABSTRACT
  }

  apiSuccess = result => {
    this.setState({ loading: false, data: result })
  }

  apiFailure = error => {
    this.setState({ loading: false, error })
  }

  renderOutput = () => {
    // Abstract
  }

  render() {
    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    return this.renderOutput()
  }
}

export default LoadPage
