import React from 'react'
import FullTableCell from 'common/display/table/full-table-cell'
import { Button, TableCell } from '@material-ui/core'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('FullTableCell', () => {
  let callback
  let id
  let type
  let value

  beforeEach(() => {
    callback = () => {}
    id = 5
    type = 'text'
    value = 'Some Value'
  })

  const render = () =>
    shallow(
      <FullTableCell callback={callback} id={id} type={type} value={value} />,
    )

  it('renders a cell with the value displayed if type is text', () => {
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.text()).toEqual('Some Value')
  })

  it('renders a cell with the converted date value displayed if type is date', () => {
    type = 'date'
    value = '2019-09-23T21:58:43.000Z'
    const node = render()
    expect(node.find(TableCell).length).toBe(1)
    expect(node.text()).toEqual('9/23/2019')
  })

  it('renders a button with the value displayed if type is button', () => {
    type = 'button'
    const node = render()
    expect(node.find(Button).length).toBe(1)
    expect(node.text()).toEqual('Some Value')
  })

  it('calls callback with id if button is clicked if type is button', () => {
    type = 'button'
    callback = sinon.stub()
    const node = render()
    node
      .find(Button)
      .props()
      .onClick()
    expect(callback.firstCall.args[0]).toBe(5)
  })
})
