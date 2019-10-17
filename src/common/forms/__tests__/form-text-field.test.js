import React from 'react'
import FormTextField from 'common/forms/form-text-field'
import TextField from '@material-ui/core/TextField'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FormTextField', () => {
  let props

  beforeEach(() => {
    props = {
      identifier: 'someIdentifier',
      label: 'Some Label',
      onChange: sinon.stub(),
      required: false,
      value: '',
    }
  })

  const render = () => shallow(<FormTextField {...props} />)

  it('calls onChange prop with identifier and value when value is changed', () => {
    const node = render()
    node
      .find(TextField)
      .props()
      .onChange({ target: { value: 'some value' } })
    expect(props.onChange.firstCall.args).toEqual([
      props.identifier,
      'some value',
      expect.anything(),
    ])
  })

  describe('when required and changed to empty string', () => {
    it('sets helper text to required message', () => {
      props.required = true
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
      props.required = true
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(node.find(TextField).props().error).toBe(true)
    })

    it('calls onChange prop with false validity flag', () => {
      props.required = true
      const node = render()
      node
        .find(TextField)
        .props()
        .onChange({ target: { value: '' } })
      expect(props.onChange.firstCall.args[2]).toBe(false)
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
      expect(props.onChange.firstCall.args[2]).toBe(true)
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
      expect(props.onChange.firstCall.args[2]).toBe(false)
    })
  })
})
