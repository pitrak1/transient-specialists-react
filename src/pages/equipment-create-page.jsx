import React from 'react'
import EquipmentEditCreatePage from 'common/pages/equipment-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function EquipmentCreatePage(props) {
  const get = (id, success, failure) => {
    api.getNew('equipment', success, failure)
  }

  const submit = (state, success, failure) => {
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

  return (
    <EquipmentEditCreatePage
      get={get}
      history={props.history}
      submit={submit}
      title='Create Equipment'
    />
  )
}

export default withRouter(EquipmentCreatePage)
