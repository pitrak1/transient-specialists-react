import React from 'react'
import { shallow } from 'enzyme'
import DetailsHeader from 'common/display/details-header'
import { Button } from '@material-ui/core'
import sinon from 'sinon'

describe('DetailsHeader', () => {
  let props

  beforeEach(() => {
    props = {
      label: 'Some Label',
      onClick: sinon.stub(),
    }
  })

  const render = () => shallow(<DetailsHeader {...props} />)

  it('calls onClick when edit button is clicked', () => {
    const node = render()
    node
      .find(Button)
      .props()
      .onClick()
    expect(props.onClick.called).toBe(true)
  })
})
