import React from 'react'
import api from '../api.js'

class EquipmentDetailsPage extends React.Component {
  state = {
    data: {},
    error: null,
    loading: true,
  }

  componentDidMount() {
    const success = result => {
      this.setState({ loading: false, data: result })
    }

    const failure = error => {
      this.setState({ loading: false, error })
    }

    api.show('equipment', this.props.match.params.id, success, failure)
  }

  render() {
    console.log(this.state.data)
    return <div>{this.props.match.params.id}</div>
  }
}

export default EquipmentDetailsPage
