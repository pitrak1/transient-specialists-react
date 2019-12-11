import React from 'react'
import { shallow } from 'enzyme'
import EquipmentDetailsDeleteButton from 'common/pages/equipment_details_page/equipment-details-delete-button'
import { Button } from '@material-ui/core'
import sinon from 'sinon'

describe('EquipmentDetailsDeleteButton', () => {
  let props

  beforeEach(() => {
    props = {
      onDeleteClick: sinon.stub(),
    }
  })

  const render = () => shallow(<EquipmentDetailsDeleteButton {...props} />)

  it('calls onDeleteClick when delete button is clicked', () => {
    const node = render()
    node
      .find(Button)
      .props()
      .onClick()
    expect(props.onDeleteClick.called).toBe(true)
  })
})
