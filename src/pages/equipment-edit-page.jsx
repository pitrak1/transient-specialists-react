import React from 'react'
import EquipmentEditCreatePage from 'common/pages/equipment-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function EquipmentEditPage(props) {
  const get = (id, success, failure) => {
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

  const submit = (state, success, failure) => {
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

  return (
    <EquipmentEditCreatePage
      get={get}
      history={props.history}
      id={props.match.params.id}
      submit={submit}
      title='Edit Equipment'
    />
  )
}

export default withRouter(EquipmentEditPage)
