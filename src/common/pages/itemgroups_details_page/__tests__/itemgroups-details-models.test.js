import React from 'react'
import ItemGroupsDetailsModels from 'common/pages/itemgroups_details_page/itemgroups-details-models'
import { shallow } from 'enzyme'
import { Button } from '@material-ui/core'
import sinon from 'sinon'
import FormSelect from 'common/forms/form-select'

describe('ItemGroupsDetailsModels', () => {
  let props

  beforeEach(() => {
    props = {
      associatedModels: [{ id: 2, name: 'Some Associated Model' }],
      models: [{ id: 1, name: 'Some Model' }],
      oems: [{ id: 1, name: 'Some OEM' }],
      onAddClick: sinon.stub(),
      onDeleteClick: sinon.stub(),
    }
  })

  const render = () => shallow(<ItemGroupsDetailsModels {...props} />)

  it('sets submit button disabled to true if model and oem are not valid', () => {
    const node = render()
    node
      .find(FormSelect)
      .first()
      .props()
      .onChange('oemId', 0, false)
    node
      .find(FormSelect)
      .last()
      .props()
      .onChange('modelId', 0, false)
    expect(
      node
        .find(Button)
        .last()
        .props().disabled,
    ).toBe(true)
  })

  it('sets submit button disabled to false if model and oem are valid', () => {
    const node = render()
    node
      .find(FormSelect)
      .first()
      .props()
      .onChange('oemId', 1, true)
    node
      .find(FormSelect)
      .last()
      .props()
      .onChange('modelId', 1, true)
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
    expect(props.onDeleteClick.calledWith(2)).toBe(true)
  })

  it('calls onAddClick prop if add button is clicked', () => {
    const node = render()
    node
      .find(FormSelect)
      .first()
      .props()
      .onChange('oemId', 1, true)
    node
      .find(FormSelect)
      .last()
      .props()
      .onChange('modelId', 1, true)
    node
      .find(Button)
      .last()
      .props()
      .onClick()
    expect(props.onAddClick.calledWith(1)).toBe(true)
  })
})
