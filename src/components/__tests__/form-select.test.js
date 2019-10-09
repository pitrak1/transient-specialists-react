import React from 'react'
import FormSelect from '../form-select'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'

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
  const value = 0

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

  it('renders all options plus a default option', () => {
    const node = render()
    expect(node.find(MenuItem).length).toBe(4)
  })

  it('is disabled if disabled is true', () => {
    disabled = true
    const node = render()
    expect(node.find(FormControl).props().disabled).toBe(true)
  })

  it('calls onChange prop with identifier and numeric value when value is changed', () => {
    const node = render()
    node
      .find(Select)
      .props()
      .onChange({ target: { value: 2 } })
    expect(onChange.firstCall.args).toEqual([identifier, 2, expect.anything()])
  })

  it('sets helper text if given default option when required', () => {
    required = true
    const node = render()
    node
      .find(Select)
      .props()
      .onChange({ target: { value: 0 } })
    expect(node.find(FormHelperText).text()).toBe(`Some Label is required`)
  })

  it('calls onChange prop with false validity flag if given default value and required', () => {
    required = true
    const node = render()
    node
      .find(Select)
      .props()
      .onChange({ target: { value: 0 } })
    expect(onChange.firstCall.args[2]).toBe(false)
  })

  it('does not set helper text if given default option when not required', () => {
    const node = render()
    node
      .find(Select)
      .props()
      .onChange({ target: { value: 0 } })
    expect(node.find(FormHelperText).text()).toEqual('')
  })

  it('calls onChange prop with true validity flag if given default value and not required', () => {
    const node = render()
    node
      .find(Select)
      .props()
      .onChange({ target: { value: 0 } })
    expect(onChange.firstCall.args[2]).toBe(true)
  })
})
