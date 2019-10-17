import React from 'react'
import FormTextField from 'common/forms/form-text-field'
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

  it('calls onChange prop with identifier and value when value is changed', () => {
    const node = render()
    node
      .find(TextField)
      .props()
      .onChange({ target: { value: 'some value' } })
    expect(onChange.firstCall.args).toEqual([
      identifier,
      'some value',
      expect.anything(),
    ])
  })

  describe('when required and changed to empty string', () => {
    it('sets helper text to required message', () => {
      required = true
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(node.find(TextField).props().helperText).toBe(
        `Some Label is required`,
      )
    })

    it('sets error to true', () => {
      required = true
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(node.find(TextField).props().error).toBe(true)
    })

    it('calls onChange prop with false validity flag', () => {
      required = true
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(onChange.firstCall.args[2]).toBe(false)
    })
  })

  describe('when not required and changed to empty string', () => {
    it('sets helper text to null', () => {
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(node.find(TextField).props().helperText).toBe(null)
    })

    it('sets error to false', () => {
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(node.find(TextField).props().error).toBe(false)
    })

    it('calls onChange prop with true validity flag', () => {
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(onChange.firstCall.args[2]).toBe(true)
    })
  })

  describe('when changed to be over 255 characters', () => {
    const longString = () => {
      const array = new Array(257)
      return array.join('a')
    }

    it('sets helper text to max length message', () => {
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: longString() } })
      expect(node.find(TextField).props().helperText).toBe(
        `Some Label must be 255 characters or fewer`,
      )
    })

    it('sets error to true', () => {
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: longString() } })
      expect(node.find(TextField).props().error).toBe(true)
    })

    it('calls onChange prop with false validity flag', () => {
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: longString() } })
      expect(onChange.firstCall.args[2]).toBe(false)
    })
  })
})
