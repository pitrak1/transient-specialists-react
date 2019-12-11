import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'
import Subtitle from 'common/display/subtitle'
import FormSelect from 'common/forms/form-select'

function ItemGroupsDetailsModels(props) {
  const [state, setState] = useState({
    oemId: 0,
    oemIdValid: false,
    modelId: 0,
    modelIdValid: false,
  })

  useEffect(() => {
    setState({ ...state, modelId: 0, modelIdValid: false })
  }, [props.associatedModels])

  const handleChange = (identifier, value, valid) => {
    const updatedState = {}
    updatedState[identifier] = value
    updatedState[`${identifier}Valid`] = valid
    setState({ ...state, ...updatedState })
  }

  const models = props.associatedModels.map(model => (
    <div key={`${model.name}${model.id}`}>
      <Button
        onClick={props.onDeleteClick.bind(null, model.id)}
        size='large'
        startIcon={<Delete />}
      >
        {model.name}
      </Button>
    </div>
  ))

  return (
    <div>
      <Subtitle label='Models' />
      {models}
      <br />
      <div>
        <FormSelect
          defaultOptionLabel='Select an OEM'
          disabled={false}
          identifier={'oemId'}
          label='OEM'
          onChange={handleChange}
          options={props.oems}
          required={true}
          value={state.oemId}
        />
        <FormSelect
          defaultOptionLabel='Select a Model'
          disabled={!state.oemId}
          identifier={'modelId'}
          label='Model'
          onChange={handleChange}
          options={props.models.filter(model => model.oemId === state.oemId)}
          required={true}
          value={state.modelId}
        />
        <Button
          disabled={!state.modelIdValid}
          onClick={props.onAddClick.bind(null, state.modelId)}
          size='large'
          startIcon={<Add />}
        >
          Add Model
        </Button>
      </div>
    </div>
  )
}

ItemGroupsDetailsModels.propTypes = {
  associatedModels: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  oems: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default ItemGroupsDetailsModels
