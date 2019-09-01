import React from 'react'
import PageTemplate from '../page-template'
import { shallow } from 'enzyme'
import { Table } from '@instructure/ui-table'
import { TextInput } from '@instructure/ui-text-input'
import sinon from 'sinon'

describe('PageTemplate', () => {
  let apiGet
  const columns = [
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'OEM Name', key: 'oemName' },
    { label: 'Model Name', key: 'modelName' },
    { label: 'Type Name', key: 'typeName' },
  ]
  const link = '/equipment/'
  const namePlural = 'Equipment'
  const nameSingular = 'Equipment'
  let startingSearch
  let startingSortBy

  beforeEach(() => {
    apiGet = sinon.stub().callsArgWith(0, [
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
    ])
    startingSearch = ''
    startingSortBy = 'serialNumber'
  })

  const render = () =>
    shallow(
      <PageTemplate
        apiGet={apiGet}
        columns={columns}
        link={link}
        namePlural={namePlural}
        nameSingular={nameSingular}
        startingSearch={startingSearch}
        startingSortBy={startingSortBy}
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

  it('renders data table if loading and error are falsy', () => {
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('renders spinner if loading and no error', () => {
    apiGet = sinon.stub()
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('renders error if error', () => {
    apiGet = sinon.stub().callsArgWith(1, 'Some Error')
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('shows all data if search is blank', () => {
    const node = render()
    setSearchValue(node, '')
    expect(node).toMatchSnapshot()
  })

  it('hides data if no cell starts with the search value', () => {
    const node = render()
    setSearchValue(node, 'Equipment a')
    expect(node).toMatchSnapshot()
  })

  it('hides all data if no rows have cells starting with the search value', () => {
    const node = render()
    setSearchValue(node, 'asdf')
    expect(node).toMatchSnapshot()
  })

  it('searches with case insensitivity', () => {
    const node = render()
    setSearchValue(node, 'TYPE A')
    expect(node).toMatchSnapshot()
  })

  it('searches by starting search', () => {
    startingSearch = 'Type a'
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('sorts by column ascending when clicking nonsorted column header', () => {
    startingSortBy = 'serialNumber'
    const node = render()
    setSort(node, 3, 'modelName')
    expect(node).toMatchSnapshot()
  })

  it('sorts by column descending when clicking nonsorted column header', () => {
    startingSortBy = 'serialNumber'
    const node = render()
    setSort(node, 3, 'modelName')
    setSort(node, 3, 'modelName')
    expect(node).toMatchSnapshot()
  })

  it('sorts by column ascending when given starting sort', () => {
    startingSortBy = 'typeName'
    const node = render()
    expect(node).toMatchSnapshot()
  })

  it('passes none for sort order to nonsorted column headers', () => {
    const node = render()
    setSort(node, 4, 'typeName')
    expect(node).toMatchSnapshot()
  })

  it('passes ascending for sort order when column is sorted ascending', () => {
    const node = render()
    setSort(node, 4, 'typeName')
    expect(node).toMatchSnapshot()
  })

  it('passes ascending for sort order when column is sorted ascending', () => {
    const node = render()
    setSort(node, 4, 'typeName')
    setSort(node, 4, 'typeName')
    expect(node).toMatchSnapshot()
  })
})
