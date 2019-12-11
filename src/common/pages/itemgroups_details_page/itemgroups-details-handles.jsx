import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'
import Subtitle from 'common/display/subtitle'
import FormTextField from 'common/forms/form-text-field'

function ItemGroupsDetailsHandles(props) {
  const [state, setState] = useState({
    handle: '',
    handleValid: false,
  })

  useEffect(() => {
    setState({ handle: '', handleValid: false })
  }, [props.handles])

  const handleChange = (identifier, value, valid) => {
    const updatedState = {}
    updatedState[identifier] = value
    updatedState[`${identifier}Valid`] = valid
    setState(updatedState)
  }

  const handles = props.handles.map(handle => (
    <div key={`${handle.handle}${handle.id}`}>
      <Button
        onClick={props.onDeleteClick.bind(null, handle.id)}
        size='large'
        startIcon={<Delete />}
      >
        {handle.handle}
      </Button>
    </div>
  ))

  return (
    <div>
      <Subtitle label='Handles' />
      {handles}
      <br />
      <div>
        <div>
          <FormTextField
            identifier='handle'
            label='Handle'
            onChange={handleChange}
            required={true}
            value={state.handle}
          />
        </div>
        <Button
          disabled={!state.handleValid}
          onClick={props.onAddClick.bind(null, state.handle)}
          size='large'
          startIcon={<Add />}
        >
          Add Handle
        </Button>
      </div>
    </div>
  )
}

ItemGroupsDetailsHandles.propTypes = {
  handles: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default ItemGroupsDetailsHandles
