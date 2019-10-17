import React from 'react'
import EquipmentForm from 'common/equipment-form'
import api from 'src/api'
import { withRouter } from 'react-router'

export class EquipmentEditPage extends React.Component {
  get = (id, success, failure) => {
    api.getEdit(
      'equipment',
      id,
      result => {
        const {
          id,
          serialNumber,
          notes,
          calCompany,
          calDue,
          oemId,
          modelId,
          typeId,
        } = result.equipment
        success({
          id,
          serialNumber,
          serialNumberValid: true,
          notes,
          notesValid: true,
          calCompany,
          calCompanyValid: true,
          calDue: calDue ? new Date(calDue) : null,
          calDueValid: true,
          oemId,
          oemIdValid: true,
          oems: result.oems,
          modelId,
          modelIdValid: true,
          models: result.models,
          typeId,
          typeIdValid: true,
          types: result.types,
        })
      },
      failure,
    )
  }

  submit = (state, success, failure) => {
    api.patchUpdate(
      'equipment',
      {
        id: state.id,
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
        id={this.props.match.params.id}
        submit={this.submit}
        title='Edit Equipment'
      />
    )
  }
}

export default withRouter(EquipmentEditPage)
