import React from 'react'
import FormTextInput from '../form-text-input'
import { shallow } from 'enzyme'
import { TextInput } from '@instructure/ui-text-input'
import sinon from 'sinon'

describe('FormTextInput', () => {
  const identifier = 'someIdentifier'
  const label = 'Some Label'
  let onChange
  let required
  const value = ''

  beforeEach(() => {
    onChange = sinon.stub()
    required = false
  })

  const render = () =>
    shallow(
      <FormTextInput
        identifier={identifier}
        label={label}
        onChange={onChange}
        required={required}
        value={value}
      />,
    )

  const getTextInputProps = node => node.find(TextInput).props()

  const longString = () => {
    const array = new Array(257)
    return array.join('a')
  }

  it('calls onChange prop with identifier and value when value is changed', () => {
    const node = render()
    getTextInputProps(node).onChange(null, 'some value')
    expect(onChange.firstCall.args).toEqual([
      identifier,
      'some value',
      expect.anything(),
    ])
  })

  it('sets messages to required message if required and value is changed to empty string', () => {
    required = true
    const node = render()
    getTextInputProps(node).onChange(null, '')
    expect(node).toMatchSnapshot()
  })

  it('calls onChange prop with false validity flag if required and value is changed to empty string', () => {
    required = true
    const node = render()
    getTextInputProps(node).onChange(null, '')
    expect(onChange.firstCall.args[2]).toBe(false)
  })

  it('does not set messages to required message if not required and value is changed to empty string', () => {
    const node = render()
    getTextInputProps(node).onChange(null, '')
    expect(node).toMatchSnapshot()
  })

  it('calls onChange prop with true validity flag if not required and value is changed to empty string', () => {
    const node = render()
    getTextInputProps(node).onChange(null, '')
    expect(onChange.firstCall.args[2]).toBe(true)
  })

  it('sets messages to max length message if value is changed to be over 255 characters', () => {
    const node = render()
    getTextInputProps(node).onChange(null, longString())
    expect(node).toMatchSnapshot()
  })

  it('calls onChange prop with false validity flag if value is changed to be over 255 characters', () => {
    const node = render()
    getTextInputProps(node).onChange(null, longString())
    expect(onChange.firstCall.args[2]).toBe(false)
  })
})
