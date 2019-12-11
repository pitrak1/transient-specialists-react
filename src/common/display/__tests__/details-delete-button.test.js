import React from 'react'
import { shallow } from 'enzyme'
import DetailsDeleteButton from 'common/display/details-delete-button'
import { Button } from '@material-ui/core'
import sinon from 'sinon'

describe('DetailsDeleteButton', () => {
  let props

  beforeEach(() => {
    props = {
      label: 'Some Label',
      onDeleteClick: sinon.stub(),
    }
  })

  const render = () => shallow(<DetailsDeleteButton {...props} />)

  it('calls onDeleteClick when delete button is clicked', () => {
    const node = render()
    node
      .find(Button)
      .props()
      .onClick()
    expect(props.onDeleteClick.called).toBe(true)
  })
})
