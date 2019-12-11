import React from 'react'
import { shallow } from 'enzyme'
import EquipmentDetailsEvents from 'common/pages/equipment_details_page/equipment-details-events'
import { Button } from '@material-ui/core'
import sinon from 'sinon'

describe('EquipmentDetailsEvents', () => {
  let props

  beforeEach(() => {
    props = {
      ascending: true,
      eventCount: 0,
      events: [],
      onAddClick: sinon.stub(),
      onDeleteClick: sinon.stub(),
      onEditClick: sinon.stub(),
      onPageChange: sinon.stub(),
      onPerPageChange: sinon.stub(),
      onSortChange: sinon.stub(),
      page: 0,
      perPage: 10,
      sortBy: 'updatedAt',
    }
  })

  const render = () => shallow(<EquipmentDetailsEvents {...props} />)

  it('calls onAddClick when add button is clicked', () => {
    const node = render()
    node
      .find(Button)
      .props()
      .onClick()
    expect(props.onAddClick.called).toBe(true)
  })
})
