import React from 'react'
import FormSelect from '../form-select'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Select } from '@instructure/ui-forms'

describe('FormSelect', () => {
  const defaultOptionLabel = 'Select Something'
  let disabled
  const identifier = 'someIdentifier'
  const label = 'Some Label'
  let onChange
  let options
  let required
  let value

  beforeEach(() => {
    disabled = false
    onChange = sinon.stub()
    options = [
      { id: 1, name: 'option 1' },
      { id: 2, name: 'option 2' },
      { id: 3, name: 'option 3' },
    ]
    required = false
    value = null
  })

  const render = () =>
    shallow(
      <FormSelect
        defaultOptionLabel={defaultOptionLabel}
        disabled={disabled}
        identifier={identifier}
        label={label}
        onChange={onChange}
        options={options}
        required={required}
        value={value}
      />,
    )

  const getSelectProps = node => node.find(Select).props()

  const getOptionData = (node, optionNumber) => {
    const option = node.find('option').at(optionNumber - 1)
    return { value: option.props().value, text: option.text() }
  }

  it('is disabled if disabled is true', () => {
    disabled = true
    const node = render()
    expect(getSelectProps(node).disabled).toBe(true)
  })

  it('renders an option for every option given plus one for default', () => {
    const node = render()
    expect(getOptionData(node, 1)).toEqual({
      value: '0',
      text: 'Select Something',
    })
    expect(getOptionData(node, 2)).toEqual({
      value: '1',
      text: 'option 1',
    })
    expect(getOptionData(node, 3)).toEqual({
      value: '2',
      text: 'option 2',
    })
    expect(getOptionData(node, 4)).toEqual({
      value: '3',
      text: 'option 3',
    })
  })

  it('calls onChange prop with identifier and numeric value when value is changed', () => {
    const node = render()
    getSelectProps(node).onChange(null, { value: '2' })
    expect(onChange.firstCall.args).toEqual([identifier, 2, expect.anything()])
  })

  it('sets messages to required message if required and value is changed to default', () => {
    required = true
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(getSelectProps(node).messages).toEqual([
      { type: 'error', text: 'Some Label is required' },
    ])
  })

  it('calls onChange prop with false validity flag if required and value is changed to default', () => {
    required = true
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(onChange.firstCall.args[2]).toBe(false)
  })

  it('does not set messages to required message if not required and value is changed to default', () => {
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(getSelectProps(node).messages).toEqual([])
  })

  it('calls onChange prop with true validity flag if not required and value is changed to default', () => {
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(onChange.firstCall.args[2]).toBe(true)
  })
})
