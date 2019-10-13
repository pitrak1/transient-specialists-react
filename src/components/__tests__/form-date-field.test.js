import React from 'react'
import FormDateField from '../form-date-field'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FormDateField', () => {
  let disabled
  const identifier = 'someIdentifier'
  const label = 'Some Label'
  let onChange
  let required
  const value = null

  beforeEach(() => {
    disabled = false
    onChange = sinon.stub()
    required = false
  })

  const render = () =>
    shallow(
      <FormDateField
        disabled={disabled}
        identifier={identifier}
        label={label}
        onChange={onChange}
        required={required}
        value={value}
      />,
    )

  it('calls onChange prop with identifier and value when value is changed', () => {
    const date = new Date('01/01/08')
    const node = render()
    node
      .find(KeyboardDatePicker)
      .props()
      .onChange(date)
    expect(onChange.firstCall.args).toEqual([
      identifier,
      date,
      expect.anything(),
    ])
  })

  describe('when required and changed to null', () => {
    it('sets helper text to required message', () => {
      required = true
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(node.find(KeyboardDatePicker).props().helperText).toBe(
        `Some Label is required`,
      )
    })

    it('sets error to true', () => {
      required = true
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(node.find(KeyboardDatePicker).props().error).toBe(true)
    })

    it('calls onChange prop with false validity flag', () => {
      required = true
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(onChange.firstCall.args[2]).toBe(false)
    })
  })

  describe('when not required and changed to null', () => {
    it('sets helper text to null', () => {
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(node.find(KeyboardDatePicker).props().helperText).toBe(null)
    })

    it('sets error to false', () => {
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(node.find(KeyboardDatePicker).props().error).toBe(false)
    })

    it('calls onChange prop with true validity flag', () => {
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(onChange.firstCall.args[2]).toBe(true)
    })
  })

  describe('when changed to invalid date', () => {
    it('sets helper text to invalid date text', () => {
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(new Date('invalid'))
      expect(node.find(KeyboardDatePicker).props().helperText).toBe(
        `Some Label is not a valid date`,
      )
    })

    it('sets error to true', () => {
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(new Date('invalid'))
      expect(node.find(KeyboardDatePicker).props().error).toBe(true)
    })

    it('calls onChange prop with false validity flag', () => {
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(new Date('invalid'))
      expect(onChange.firstCall.args[2]).toBe(false)
    })
  })
})
