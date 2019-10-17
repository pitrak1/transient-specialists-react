import React from 'react'
import ErrorAlert from 'common/display/error-alert'
import { shallow } from 'enzyme'
import { Alert } from '@instructure/ui-alerts'

describe('ErrorAlert', () => {
  let props

  beforeEach(() => {
    props = {
      closable: true,
      text: 'Some Text',
    }
  })

  const render = () => shallow(<ErrorAlert {...props} />)

  it('sets renderCloseButtonLabel to Close if closable is true', () => {
    const node = render()
    expect(node.find(Alert).props().renderCloseButtonLabel).toBe('Close')
  })

  it('sets renderCloseButtonLabel to null if closable is false', () => {
    props.closable = false
    const node = render()
    expect(node.find(Alert).props().renderCloseButtonLabel).toBe(null)
  })
})
