import React from 'react'
import EquipmentForm from '../common/equipment-form'
import api from '../api.js'
import { withRouter } from 'react-router'

export class EquipmentCreatePage extends React.Component {
  get(id, success, failure) {
    api.getNew('equipment', success, failure)
  }

  submit(state, success, failure) {
    api.postCreate(
      'equipment',
      {
        calCompany: state.calCompany,
        calDue: state.calDue ? state.calDue.toISOString() : null,
        serialNumber: state.serialNumber,
        modelId: state.modelId,
        notes: state.notes,
        typeId: state.typeId,
      },
      success,
      failure,
    )
  }

  render() {
    return (
      <EquipmentForm
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create Equipment'
      />
    )
  }
}

export default withRouter(EquipmentCreatePage)
