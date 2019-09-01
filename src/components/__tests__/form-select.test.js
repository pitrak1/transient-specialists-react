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
  const options = [
    { id: 1, name: 'option 1' },
    { id: 2, name: 'option 2' },
    { id: 3, name: 'option 3' },
  ]
  let required
  const value = null

  beforeEach(() => {
    disabled = false
    onChange = sinon.stub()
    required = false
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

  it('renders a select with multiple options', () => {
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('is disabled if disabled is true', () => {
    disabled = true
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('calls onChange prop with identifier and numeric value when value is changed', () => {
    const node = render()
    getSelectProps(node).onChange(null, { value: '2' })
    expect(onChange.firstCall.args).toEqual([identifier, 2, expect.anything()])
  })

  it('sets messages if given default option when required', () => {
    required = true
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(node).toMatchSnapshot()
  })

  it('calls onChange prop with false validity flag if given default value and required', () => {
    required = true
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(onChange.firstCall.args[2]).toBe(false)
  })

  it('does not set messages if given default option when not required', () => {
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(getSelectProps(node).messages).toEqual([])
    expect(node).toMatchSnapshot()
  })

  it('calls onChange prop with true validity flag if given default value and not required', () => {
    const node = render()
    getSelectProps(node).onChange(null, { value: '0' })
    expect(onChange.firstCall.args[2]).toBe(true)
  })
})
