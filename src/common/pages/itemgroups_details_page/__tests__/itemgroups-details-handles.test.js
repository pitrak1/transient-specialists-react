import React from 'react'
import ItemGroupsDetailsHandles from 'common/pages/itemgroups_details_page/itemgroups-details-handles'
import ErrorAlert from 'common/display/error-alert'
import { shallow } from 'enzyme'
import { Button } from '@material-ui/core'
import sinon from 'sinon'
import FormTextField from 'common/forms/form-text-field'

describe('ItemGroupsDetailsHandles', () => {
  let props

  beforeEach(() => {
    props = {
      handles: [{ id: 1, handle: 'asdf' }],
      onAddClick: sinon.stub(),
      onDeleteClick: sinon.stub(),
    }
  })

  const render = () => shallow(<ItemGroupsDetailsHandles {...props} />)

  it('sets submit button disabled to true if handle is not valid', () => {
    const node = render()
    node
      .find(FormTextField)
      .props()
      .onChange('handle', '', false)
    expect(
      node
        .find(Button)
        .last()
        .props().disabled,
    ).toBe(true)
  })

  it('sets submit button disabled to false if handle is valid', () => {
    const node = render()
    node
      .find(FormTextField)
      .props()
      .onChange('handle', 'asdf', true)
    expect(
      node
        .find(Button)
        .last()
        .props().disabled,
    ).toBe(false)
  })

  it('calls onDeleteClick prop if delete button is clicked', () => {
    const node = render()
    node
      .find(Button)
      .first()
      .props()
      .onClick()
    expect(props.onDeleteClick.calledWith(1)).toBe(true)
  })

  it('calls onAddClick prop if add button is clicked', () => {
    const node = render()
    node
      .find(FormTextField)
      .props()
      .onChange('handle', 'asdf', true)
    node
      .find(Button)
      .last()
      .props()
      .onClick()
    expect(props.onAddClick.calledWith('asdf')).toBe(true)
  })
})
