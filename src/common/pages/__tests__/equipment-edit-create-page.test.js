import React from 'react'
import EquipmentEditCreatePage from 'common/pages/equipment-edit-create-page'
import ErrorAlert from 'common/display/error-alert'
import { shallow } from 'enzyme'
import { Button } from '@material-ui/core'
import sinon from 'sinon'
import Spinner from 'common/display/spinner'
import FormTextField from 'common/forms/form-text-field'

describe('EquipmentEditCreatePage', () => {
  let props

  beforeEach(() => {
    props = {
      get: sinon.stub(),
      history: { push: sinon.stub() },
      submit: sinon.stub(),
      title: 'Some Title',
    }
  })

  const render = () => shallow(<EquipmentEditCreatePage {...props} />)

  it('renders Spinner when loading is true', () => {
    const node = render()
    expect(node.find(Spinner).length).toBe(1)
  })

  it('renders ErrorAlert if error on initial load', () => {
    props.get = sinon.stub().callsArgWith(2, 'Some Error')
    const node = render()
    expect(node.find(ErrorAlert).length).toBe(1)
    expect(node.find(ErrorAlert).props().text).toBe('Some Error')
  })

  describe('when initial load succeeds', () => {
    beforeEach(() => {
      props.get = sinon
        .stub()
        .callsArgWith(1, { oems: [], models: [], types: [] })
    })

    it('changes a value and its valid flag when a field is changed', () => {
      const node = render()
      node
        .find(FormTextField)
        .at(0)
        .props()
        .onChange('name', 'asdf', true)
      expect(node.state().name).toBe('asdf')
      expect(node.state().nameValid).toBe(true)
    })

    it('sets submit button disabled to true if serialNumber is not valid', () => {
      const node = render()
      node.setState({
        serialNumberValid: false,
        modelIdValid: true,
        oemIdValid: true,
        typeIdValid: true,
      })
      expect(node.find(Button).props().disabled).toBe(true)
    })

    it('sets submit button disabled to true if modelId is not valid', () => {
      const node = render()
      node.setState({
        serialNumberValid: true,
        modelIdValid: false,
        oemIdValid: true,
        typeIdValid: true,
      })
      expect(node.find(Button).props().disabled).toBe(true)
    })

    it('sets submit button disabled to true if oemId is not valid', () => {
      const node = render()
      node.setState({
        serialNumberValid: true,
        modelIdValid: true,
        oemIdValid: false,
        typeIdValid: true,
      })
      expect(node.find(Button).props().disabled).toBe(true)
    })

    it('sets submit button disabled to true if typeId is not valid', () => {
      const node = render()
      node.setState({
        serialNumberValid: true,
        modelIdValid: true,
        oemIdValid: true,
        typeIdValid: false,
      })
      expect(node.find(Button).props().disabled).toBe(true)
    })

    it('sets submit button disabled to false if required fieldsd are valid', () => {
      const node = render()
      node.setState({
        serialNumberValid: true,
        modelIdValid: true,
        oemIdValid: true,
        typeIdValid: true,
      })
      expect(node.find(Button).props().disabled).toBe(false)
    })

    it('redirects to equipment details page if submit succeeds', () => {
      props.submit = sinon.stub().callsArgWith(1, { equipment: { id: 4 } })
      const node = render()
      node
        .find(Button)
        .props()
        .onClick()
      expect(props.history.push.firstCall.args[0]).toBe('/equipment/details/4')
    })

    it('displays error if submit fails', () => {
      props.submit = sinon.stub().callsArgWith(2, 'Some Error')
      const node = render()
      node
        .find(Button)
        .props()
        .onClick()
      expect(node.find(ErrorAlert).length).toBe(1)
      expect(node.find(ErrorAlert).props().text).toBe('Some Error')
    })
  })
})
