import React from 'react'
import PageTemplate from '../page-template'
import { shallow } from 'enzyme'
import { Table } from '@instructure/ui-table'
import { TextInput } from '@instructure/ui-text-input'

describe('PageTemplate', () => {
  const columns = [
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'OEM Name', key: 'oemName' },
    { label: 'Model Name', key: 'modelName' },
    { label: 'Type Name', key: 'typeName' },
  ]
  let data
  const link = '/equipment/'
  const namePlural = 'Equipment'
  const nameSingular = 'Equipment'
  let startingSearch
  let startingSortBy

  beforeEach(() => {
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
    startingSearch = ''
    startingSortBy = 'serialNumber'
  })

  const render = () =>
    shallow(
      <PageTemplate
        columns={columns}
        data={data}
        link={link}
        namePlural={namePlural}
        nameSingular={nameSingular}
        startingSearch={startingSearch}
        startingSortBy={startingSortBy}
      />,
    )

  const getRowData = (node, rowNumber) =>
    node
      .find(Table.Row)
      .at(rowNumber)
      .children()
      .map(child => child.childAt(0).text())

  const getRowCount = node => node.find(Table.Row).length - 1

  const setSearchValue = (node, value) => {
    node
      .find(TextInput)
      .props()
      .onChange(null, value)
  }

  const getColHeaderProps = (node, colNumber) =>
    node
      .find(Table.ColHeader)
      .at(colNumber - 1)
      .props()

  const setSort = (node, colNumber, colKey) =>
    getColHeaderProps(node, colNumber).onRequestSort(null, { id: colKey })

  const getColHeaderSortDirection = (node, colNumber) =>
    getColHeaderProps(node, colNumber).sortDirection

  const expectedRowData = [
    ['Equipment a 1', 'OEM c 7', 'Model b 4', 'Type a 10', expect.anything()],
    ['Equipment b 2', 'OEM b 8', 'Model a 5', 'Type c 11', expect.anything()],
    ['Equipment c 3', 'OEM a 9', 'Model c 6', 'Type b 12', expect.anything()],
  ]

  it('renders data in a table row', () => {
    data = [data[0]]
    const node = render()
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
  })

  it('renders a table row for each datum', () => {
    const node = render()
    expect(getRowCount(node)).toBe(data.length)
  })

  it('shows all data if search is blank', () => {
    const node = render()
    setSearchValue(node, '')
    expect(getRowCount(node)).toBe(data.length)
  })

  it('hides data if no cell starts with the search value', () => {
    const node = render()
    setSearchValue(node, 'Equipment a')
    expect(getRowCount(node)).toBe(1)
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
    setSearchValue(node, 'OEM c')
    expect(getRowCount(node)).toBe(1)
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
    setSearchValue(node, 'Model b')
    expect(getRowCount(node)).toBe(1)
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
    setSearchValue(node, 'Type a')
    expect(getRowCount(node)).toBe(1)
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
  })

  it('hides all data if no rows have cells starting with the search value', () => {
    const node = render()
    setSearchValue(node, 'asdf')
    expect(getRowCount(node)).toBe(0)
  })

  it('searches with case insensitivity', () => {
    const node = render()
    setSearchValue(node, 'TYPE A')
    expect(getRowCount(node)).toBe(1)
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
  })

  it('searches by starting search', () => {
    startingSearch = 'Type a'
    const node = render()
    expect(getRowCount(node)).toBe(1)
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
  })

  it('sorts by column ascending when clicking nonsorted column header', () => {
    startingSortBy = 'serialNumber'
    const node = render()
    setSort(node, 3, 'modelName')
    expect(getRowData(node, 1)).toEqual(expectedRowData[1])
    expect(getRowData(node, 2)).toEqual(expectedRowData[0])
    expect(getRowData(node, 3)).toEqual(expectedRowData[2])
  })

  it('sorts by column descending when clicking nonsorted column header', () => {
    startingSortBy = 'serialNumber'
    const node = render()
    setSort(node, 3, 'modelName')
    setSort(node, 3, 'modelName')
    expect(getRowData(node, 1)).toEqual(expectedRowData[2])
    expect(getRowData(node, 2)).toEqual(expectedRowData[0])
    expect(getRowData(node, 3)).toEqual(expectedRowData[1])
  })

  it('sorts by column ascending when given starting sort', () => {
    startingSortBy = 'typeName'
    const node = render()
    expect(getRowData(node, 1)).toEqual(expectedRowData[0])
    expect(getRowData(node, 2)).toEqual(expectedRowData[2])
    expect(getRowData(node, 3)).toEqual(expectedRowData[1])
  })

  it('passes none for sort order to nonsorted column headers', () => {
    const node = render()
    setSort(node, 4, 'typeName')
    expect(getColHeaderSortDirection(node, 1)).toBe('none')
    expect(getColHeaderSortDirection(node, 2)).toBe('none')
    expect(getColHeaderSortDirection(node, 3)).toBe('none')
  })

  it('passes ascending for sort order when column is sorted ascending', () => {
    const node = render()
    setSort(node, 4, 'typeName')
    expect(getColHeaderSortDirection(node, 4)).toBe('ascending')
  })

  it('passes ascending for sort order when column is sorted ascending', () => {
    const node = render()
    setSort(node, 4, 'typeName')
    setSort(node, 4, 'typeName')
    expect(getColHeaderSortDirection(node, 4)).toBe('descending')
  })
})
