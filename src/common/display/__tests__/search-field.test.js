import React from 'react'
import SearchField from 'common/display/search-field'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { TextField } from '@material-ui/core'

describe('SearchField', () => {
  let props

  beforeEach(() => {
    props = {
      onSearchChange: sinon.stub(),
      onSearchClick: sinon.stub(),
      value: '',
    }
  })

  const render = () => shallow(<SearchField {...props} />)

  it('calls onSearchClick callback if Enter key is pressed in field', () => {
    const node = render()
    node
      .find(TextField)
      .props()
      .inputProps.onKeyPress({ charCode: 13 })
    expect(props.onSearchClick.called).toBe(true)
  })
})
