import React from 'react'
import FormSelect from 'common/form-select'
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

  it('calls onChange prop with identifier and numeric value when value is changed', () => {
    const node = render()
    node
      .find(Select)
      .props()
      .onChange({ target: { value: 2 } })
    expect(onChange.firstCall.args).toEqual([identifier, 2, expect.anything()])
  })

  describe('when required and changed to default option', () => {
    it('sets helper text to required text', () => {
      required = true
      const node = render()
      node
        .find(Select)
        .props()
        .onChange({ target: { value: 0 } })
      expect(node.find(FormHelperText).text()).toBe(`Some Label is required`)
    })

    it('sets error to true', () => {
      required = true
      const node = render()
      node
        .find(Select)
        .props()
        .onChange({ target: { value: 0 } })
      expect(node.find(FormControl).props().error).toBe(true)
    })

    it('calls onChange prop with false validity flag', () => {
      required = true
      const node = render()
      node
        .find(Select)
        .props()
        .onChange({ target: { value: 0 } })
      expect(onChange.firstCall.args[2]).toBe(false)
    })
  })

  describe('when not required and changed to default option', () => {
    it('sets helper text to empty string', () => {
      const node = render()
      node
        .find(Select)
        .props()
        .onChange({ target: { value: 0 } })
      expect(node.find(FormHelperText).text()).toBe('')
    })

    it('sets error to false', () => {
      const node = render()
      node
        .find(Select)
        .props()
        .onChange({ target: { value: 0 } })
      expect(node.find(FormControl).props().error).toBe(false)
    })

    it('calls onChange prop with true validity flag', () => {
      const node = render()
      node
        .find(Select)
        .props()
        .onChange({ target: { value: 0 } })
      expect(onChange.firstCall.args[2]).toBe(true)
    })
  })
})
