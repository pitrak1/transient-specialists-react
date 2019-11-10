import React from 'react'
import IndexPage from 'common/pages/index-page'
import ErrorAlert from 'common/display/error-alert'
import { shallow } from 'enzyme'
import { Button, Checkbox } from '@material-ui/core'
import sinon from 'sinon'
import Spinner from 'common/display/spinner'
import SearchField from 'common/display/search-field'
import FullTable from 'common/display/table/full-table'
import api from 'src/api'

describe('IndexPage', () => {
  let props

  beforeEach(() => {
    api.getIndex = sinon.stub()
    api.deleteDestroy = sinon.stub()
    props = {
      defaultSortBy: 'someColumn',
      headers: [],
      history: { push: sinon.stub() },
      resource: 'resource',
      title: 'Some Title',
      transformData: data => data,
    }
  })

  const render = () => shallow(<IndexPage {...props} />)

  it('renders Spinner when loading is true', () => {
    const node = render()
    expect(node.find(Spinner).length).toBe(1)
  })

  it('renders ErrorAlert if error on initial load', () => {
    api.getIndex = sinon.stub().callsArgWith(3, 'Some Error')
    const node = render()
    expect(node.find(ErrorAlert).length).toBe(1)
    expect(node.find(ErrorAlert).props().text).toBe('Some Error')
  })

  describe('when initial load succeeds', () => {
    beforeEach(() => {
      api.getIndex = sinon.stub().callsArgWith(2, { data: [], count: '5' })
      window.confirm = () => true
    })

    it('redirects to add page if add is clicked', () => {
      const node = render()
      node
        .find(Button)
        .props()
        .onClick()
      expect(props.history.push.firstCall.args[0]).toBe('/resource/create')
    })

    it('changes searchValue when search value is changed', () => {
      const node = render()
      node
        .find(SearchField)
        .props()
        .onSearchChange({ target: { value: 'asdf' } })
      expect(node.state().searchValue).toBe('asdf')
    })

    it('reloads data when search button is clicked', () => {
      const node = render()
      node
        .find(SearchField)
        .props()
        .onSearchClick()
      expect(api.getIndex.secondCall).toBeTruthy()
    })

    it('passes count as a number to FullTable', () => {
      const node = render()
      expect(node.find(FullTable).props().count).toBe(5)
    })

    describe('callback transformation on data', () => {
      it('shows details page if data is a button with details callback', () => {
        api.getIndex = sinon.stub().callsArgWith(2, {
          data: [
            {
              id: 1,
              cells: [{ type: 'button', callback: 'details' }],
            },
          ],
        })
        const node = render()
        node
          .find(FullTable)
          .props()
          .data[0].cells[0].callback(1)
        expect(props.history.push.firstCall.args[0]).toBe('/resource/details/1')
      })

      it('shows equipment page if data is a button with showEquipment callback', () => {
        api.getIndex = sinon.stub().callsArgWith(2, {
          data: [
            {
              id: 1,
              cells: [{ type: 'button', callback: 'showEquipment' }],
              name: 'Some Name',
            },
          ],
        })
        const node = render()
        node
          .find(FullTable)
          .props()
          .data[0].cells[0].callback(1)
        expect(props.history.push.firstCall.args[0]).toBe(
          '/equipment/search/Some Name',
        )
      })

      it('shows models page if data is a button with showModels callback', () => {
        api.getIndex = sinon.stub().callsArgWith(2, {
          data: [
            {
              id: 1,
              cells: [{ type: 'button', callback: 'showModels' }],
              name: 'Some Name',
            },
          ],
        })
        const node = render()
        node
          .find(FullTable)
          .props()
          .data[0].cells[0].callback(1)
        expect(props.history.push.firstCall.args[0]).toBe(
          '/models/search/Some Name',
        )
      })

      it('shows edit page if data is a button with edit callback', () => {
        api.getIndex = sinon.stub().callsArgWith(2, {
          data: [
            {
              id: 1,
              cells: [{ type: 'button', callback: 'edit' }],
            },
          ],
        })
        const node = render()
        node
          .find(FullTable)
          .props()
          .data[0].cells[0].callback(1)
        expect(props.history.push.firstCall.args[0]).toBe('/resource/edit/1')
      })

      describe('when data is a button with delete callback', () => {
        it('calls deleteDestroy', () => {
          api.getIndex = sinon.stub().callsArgWith(2, {
            data: [
              {
                id: 1,
                cells: [{ type: 'button', callback: 'delete' }],
              },
            ],
          })
          const node = render()
          node
            .find(FullTable)
            .props()
            .data[0].cells[0].callback(1)
          expect(api.deleteDestroy.firstCall).toBeTruthy()
        })

        it('calls deleteDestroy and reloads data if delete was successful', () => {
          api.getIndex = sinon.stub().callsArgWith(2, {
            data: [
              {
                id: 1,
                cells: [{ type: 'button', callback: 'delete' }],
              },
            ],
          })
          api.deleteDestroy = sinon.stub().callsArg(2)
          const node = render()
          node
            .find(FullTable)
            .props()
            .data[0].cells[0].callback(1)
          expect(api.getIndex.secondCall).toBeTruthy()
        })

        it('calls deleteDestroy and sets alert if delete was unsuccessful', () => {
          api.getIndex = sinon.stub().callsArgWith(2, {
            data: [
              {
                id: 1,
                cells: [{ type: 'button', callback: 'delete' }],
              },
            ],
          })
          api.deleteDestroy = sinon.stub().callsArgWith(3, 'Some Alert')
          const node = render()
          node
            .find(FullTable)
            .props()
            .data[0].cells[0].callback(1)
          expect(node.find(ErrorAlert).length).toBe(1)
          expect(node.find(ErrorAlert).props().text).toBe('Some Alert')
        })
      })
    })
  })
})
