import React from 'react'
import FormDateField from 'common/forms/form-date-field'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FormDateField', () => {
  let props

  beforeEach(() => {
    props = {
      disabled: false,
      identifier: 'someIdentifier',
      label: 'Some Label',
      onChange: sinon.stub(),
      required: false,
      value: null,
    }
  })

  const render = () => shallow(<FormDateField {...props} />)

  it('calls onChange prop with identifier and value when value is changed', () => {
    const date = new Date('01/01/08')
    const node = render()
    node
      .find(KeyboardDatePicker)
      .props()
      .onChange(date)
    expect(props.onChange.firstCall.args).toEqual([
      props.identifier,
      date,
      expect.anything(),
    ])
  })

  describe('when required and changed to null', () => {
    it('sets helper text to required message', () => {
      props.required = true
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
      props.required = true
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(node.find(KeyboardDatePicker).props().error).toBe(true)
    })

    it('calls onChange prop with false validity flag', () => {
      props.required = true
      const node = render()
      node
        .find(KeyboardDatePicker)
        .props()
        .onChange(null)
      expect(props.onChange.firstCall.args[2]).toBe(false)
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
      expect(props.onChange.firstCall.args[2]).toBe(true)
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
      expect(props.onChange.firstCall.args[2]).toBe(false)
    })
  })
})
