import React from 'react'
import PageTemplate from '../page-template'
import { shallow } from 'enzyme'
import { Table } from '@instructure/ui-table'
import { TextInput } from '@instructure/ui-text-input'
import sinon from 'sinon'

describe('PageTemplate', () => {
  let ascending
  const columns = [
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'OEM Name', key: 'oemName' },
    { label: 'Model Name', key: 'modelName' },
    { label: 'Type Name', key: 'typeName' },
  ]
  let data
  const nameLink = 'equipment'
  const namePlural = 'Equipment'
  const nameSingular = 'Equipment'
  let onChange
  let searchValue
  let sortBy

  beforeEach(() => {
    ascending = true
    data = [
      {
        id: 1,
        serialNumber: 'Equipment a 1',
        oemName: 'OEM c 7',
        modelName: 'Model b 4',
        typeName: 'Type a 10',
      },
      {
        id: 2,
        serialNumber: 'Equipment b 2',
        oemName: 'OEM b 8',
        modelName: 'Model a 5',
        typeName: 'Type c 11',
      },
      {
        id: 3,
        serialNumber: 'Equipment c 3',
        oemName: 'OEM a 9',
        modelName: 'Model c 6',
        typeName: 'Type b 12',
      },
    ]
    onChange = sinon.stub()
    searchValue = ''
    sortBy = 'serialNumber'
  })

  const render = () =>
    shallow(
      <PageTemplate
        ascending={ascending}
        columns={columns}
        data={data}
        nameLink={nameLink}
        namePlural={namePlural}
        nameSingular={nameSingular}
        onChange={onChange}
        searchValue={searchValue}
        sortBy={sortBy}
      />,
    )

  const setSearchValue = (node, value) => {
    node
      .find(TextInput)
      .props()
      .onChange(null, value)
  }

  const setSort = (node, colNumber, colKey) =>
    node
      .find(Table.ColHeader)
      .at(colNumber - 1)
      .props()
      .onRequestSort(null, { id: colKey })

  it('shows all data if search is blank', () => {
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('hides data if no cell starts with the search value', () => {
    searchValue = 'Equipment a'
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('hides all data if no rows have cells starting with the search value', () => {
    searchValue = 'asdf'
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('searches with case insensitivity', () => {
    searchValue = 'TYPE A'
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('calls onChange with ascending true and sortBy column when clicking nonsorted column header', () => {
    const node = render()
    setSort(node, 3, 'modelName')
    expect(onChange.firstCall.args[0]).toEqual({
      ascending: true,
      sortBy: 'modelName',
    })
  })

  it('calls onChange with ascending negated when clicking sorted column header', () => {
    const node = render()
    setSort(node, 3, 'serialNumber')
    expect(onChange.firstCall.args[0]).toEqual({ ascending: false })
  })

  it('calls onChange with searchValue and value when changing the search', () => {
    const node = render()
    setSearchValue(node, 'Equipment 1')
    expect(onChange.firstCall.args[0]).toEqual({ searchValue: 'Equipment 1' })
  })
})
