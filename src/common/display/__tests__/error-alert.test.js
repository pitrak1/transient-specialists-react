import React from 'react'
import ErrorAlert from 'common/display/error-alert'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Alert } from '@instructure/ui-alerts'

describe('ErrorAlert', () => {
  let closable
  let text

  beforeEach(() => {
    closable = true
    text = 'Some Text'
  })

  const render = () => shallow(<ErrorAlert closable={closable} text={text} />)

  it('sets renderCloseButtonLabel to Close if closable is true', () => {
    const node = render()
    expect(node.find(Alert).props().renderCloseButtonLabel).toBe('Close')
  })

  it('sets renderCloseButtonLabel to null if closable is false', () => {
    closable = false
    const node = render()
    expect(node.find(Alert).props().renderCloseButtonLabel).toBe(null)
  })
})
