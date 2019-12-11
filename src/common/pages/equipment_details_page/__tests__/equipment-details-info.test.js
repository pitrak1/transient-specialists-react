import React from 'react'
import { shallow } from 'enzyme'
import EquipmentDetailsInfo from 'common/pages/equipment_details_page/equipment-details-info'
import { Button } from '@material-ui/core'
import sinon from 'sinon'

describe('EquipmentDetailsInfo', () => {
  let props

  beforeEach(() => {
    props = {
      equipment: {
        modelName: 'Some Model',
        oemName: 'Some OEM',
        typeName: 'Some Type',
      },
      history: { push: sinon.stub() },
    }
  })

  const render = () => shallow(<EquipmentDetailsInfo {...props} />)

  it('calls history.push when OEM is clicked', () => {
    const node = render()
    node
      .find({ children: 'Some OEM' })
      .props()
      .onClick()
    expect(props.history.push.calledWith(`/oems/search/Some OEM`)).toBe(true)
  })

  it('calls history.push when model is clicked', () => {
    const node = render()
    node
      .find({ children: 'Some Model' })
      .props()
      .onClick()
    expect(props.history.push.calledWith(`/models/search/Some Model`)).toBe(
      true,
    )
  })

  it('calls history.push when type is clicked', () => {
    const node = render()
    node
      .find({ children: 'Some Type' })
      .props()
      .onClick()
    expect(props.history.push.calledWith(`/types/search/Some Type`)).toBe(true)
  })
})
