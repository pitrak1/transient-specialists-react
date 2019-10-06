import React from 'react'
import FormTextField from '../form-text-field'
import TextField from '@material-ui/core/TextField'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FormTextField', () => {
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
      <FormTextField
        identifier={identifier}
        label={label}
        onChange={onChange}
        required={required}
        value={value}
      />,
    )

  const getTextInputProps = node => node.find(TextField).props()

  const longString = () => {
    const array = new Array(257)
    return array.join('a')
  }

  it('calls onChange prop with identifier and value when value is changed', () => {
    const node = render()
    getTextInputProps(node).onChange({ target: { value: 'some value' } })
    expect(onChange.firstCall.args).toEqual([
      identifier,
      'some value',
      expect.anything(),
    ])
  })

  it('sets helper text to required message if required and value is changed to empty string', () => {
    required = true
    const node = render()
    getTextInputProps(node).onChange({ target: { value: '' } })
    expect(getTextInputProps(node).helperText).toBe(`Some Label is required`)
  })

  it('sets error to true if required and value is changed to empty string', () => {
    required = true
    const node = render()
    getTextInputProps(node).onChange({ target: { value: '' } })
    expect(getTextInputProps(node).error).toBe(true)
  })

  it('calls onChange prop with false validity flag if required and value is changed to empty string', () => {
    required = true
    const node = render()
    getTextInputProps(node).onChange({ target: { value: '' } })
    expect(onChange.firstCall.args[2]).toBe(false)
  })

  it('does not helper text to required message if not required and value is changed to empty string', () => {
    const node = render()
    getTextInputProps(node).onChange({ target: { value: '' } })
    expect(getTextInputProps(node).helperText).toBe(null)
  })

  it('calls onChange prop with true validity flag if not required and value is changed to empty string', () => {
    const node = render()
    getTextInputProps(node).onChange({ target: { value: '' } })
    expect(onChange.firstCall.args[2]).toBe(true)
  })

  it('sets helper text to max length message if value is changed to be over 255 characters', () => {
    const node = render()
    getTextInputProps(node).onChange({ target: { value: longString() } })
    expect(getTextInputProps(node).helperText).toBe(
      `Some Label must be 255 characters or fewer`,
    )
  })

  it('calls onChange prop with false validity flag if value is changed to be over 255 characters', () => {
    const node = render()
    getTextInputProps(node).onChange({ target: { value: longString() } })
    expect(onChange.firstCall.args[2]).toBe(false)
  })
})
