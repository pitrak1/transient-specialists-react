import React from 'react'
import EventsEditCreatePage from 'common/pages/events-edit-create-page'
import ErrorAlert from 'common/display/error-alert'
import { shallow } from 'enzyme'
import { Button } from '@material-ui/core'
import sinon from 'sinon'
import Spinner from 'common/display/spinner'
import FormTextField from 'common/forms/form-text-field'

describe('EventsEditCreatePage', () => {
  let props

  beforeEach(() => {
    props = {
      equipmentId: '4',
      get: sinon.stub(),
      history: { push: sinon.stub() },
      submit: sinon.stub(),
      title: 'Some Title',
    }
  })

  const render = () => shallow(<EventsEditCreatePage {...props} />)

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
      props.get = sinon.stub().callsArgWith(1, {})
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

    it('sets submit button disabled to true if status is not valid', () => {
      const node = render()
      node.setState({ statusValid: false })
      expect(node.find(Button).props().disabled).toBe(true)
    })

    it('sets submit button disabled to false if status is valid', () => {
      const node = render()
      node.setState({ statusValid: true })
      expect(node.find(Button).props().disabled).toBe(false)
    })

    it('redirects to equipment details page if submit succeeds', () => {
      props.submit = sinon.stub().callsArg(2)
      const node = render()
      node
        .find(Button)
        .props()
        .onClick()
      expect(props.history.push.firstCall.args[0]).toBe('/equipment/4')
    })

    it('displays error if submit fails', () => {
      props.submit = sinon.stub().callsArgWith(3, 'Some Error')
      const node = render()
      node
        .find(Button)
        .props()
        .onClick()
      expect(node.find(ErrorAlert).length).toBe(1)
      expect(node.find(ErrorAlert).props().text).toBe('Some Error')
    })

    it('hides updatedAt field if eventId is not given', () => {
      const node = render()
      expect(
        node.findWhere(n => n.props().identifier === 'updatedAt').length,
      ).toBe(0)
    })

    it('shows updatedAt field if eventId is given', () => {
      props.eventId = '1'
      const node = render()
      expect(
        node.findWhere(n => n.props().identifier === 'updatedAt').length,
      ).toBe(1)
    })

    it('sets updatedAt on load if eventId is not given', () => {
      const node = render()
      expect(node.state('updatedAt')).not.toBeNull()
    })

    it('does not set updatedAt on load if eventId is given', () => {
      props.eventId = '1'
      const node = render()
      expect(node.state('updatedAt')).toBeNull()
    })
  })
})
