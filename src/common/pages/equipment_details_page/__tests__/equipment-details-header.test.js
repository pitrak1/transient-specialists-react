import React from 'react'
import { shallow } from 'enzyme'
import EquipmentDetailsHeader from 'common/pages/equipment_details_page/equipment-details-header'
import { Button } from '@material-ui/core'
import sinon from 'sinon'

describe('EquipmentDetailsHeader', () => {
  let props

  beforeEach(() => {
    props = {
      label: 'Some Label',
      onClick: sinon.stub(),
    }
  })

  const render = () => shallow(<EquipmentDetailsHeader {...props} />)

  it('calls onClick when edit button is clicked', () => {
    const node = render()
    node
      .find(Button)
      .props()
      .onClick()
    expect(props.onClick.called).toBe(true)
  })
})
