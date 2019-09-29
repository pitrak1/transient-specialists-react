import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'

class LoadPage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
  }

  // Abstract method to fetch data, apiSuccess and apiFailure must be provided as callbacks to the API module
  apiGet = () => {}

  // Abstract method to render anything outside of the loading/error elements for page loading
  renderOutput = () => {}

  componentDidMount() {
    this.apiGet()
  }

  apiSuccess = result => {
    this.setState({ loading: false, data: result })
  }

  apiFailure = error => {
    this.setState({ loading: false, error })
  }

  handleChange = object => {
    this.setState(object)
  }

  render() {
    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
        {this.renderOutput()}
      </div>
    )
  }
}

export default LoadPage
