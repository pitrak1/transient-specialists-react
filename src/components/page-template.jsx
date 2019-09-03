import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Heading } from '@instructure/ui-elements'
import { Flex } from '@instructure/ui-layout'
import { TextInput } from '@instructure/ui-text-input'
import { Table } from '@instructure/ui-table'

const PageTemplate = props => {
  const handleSearchChange = (_e, value) => {
    props.onChange({ searchValue: value })
  }

  const handleSort = (_e, { id }) => {
    if (props.sortBy === id) {
      props.onChange({ ascending: !props.ascending })
    } else {
      props.onChange({ ascending: true, sortBy: id })
    }
  }

  const headers = () => {
    return props.columns.map(column => {
      let sortDirection = 'none'
      if (props.sortBy === column.key) {
        sortDirection = props.ascending ? 'ascending' : 'descending'
      }

      return (
        <Table.ColHeader
          key={column.key}
          id={column.key}
          onRequestSort={handleSort}
          sortDirection={sortDirection}
        >
          {column.label}
        </Table.ColHeader>
      )
    })
  }

  const rows = () => {
    const filtered = props.data.filter(datum => {
      const value = props.searchValue.toLowerCase()
      return (
        !value ||
        props.columns.filter(column =>
          datum[column.key].toLowerCase().startsWith(value),
        ).length
      )
    })

    const sorted = filtered.sort((a, b) => {
      return props.ascending
        ? a[props.sortBy].localeCompare(b[props.sortBy])
        : b[props.sortBy].localeCompare(a[props.sortBy])
    })

    return sorted.map(datum => {
      const cells = props.columns.map(column => (
        <Table.Cell key={column.key}>{datum[column.key]}</Table.Cell>
      ))
      return (
        <Table.Row key={datum.id}>
          {cells}
          <Table.Cell>
            <Link to={`/${props.nameLink}/${datum.id}`}>Details</Link>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <div>
      <Flex>
        <Flex.Item grow shrink>
          <Heading level='h1' margin='medium'>
            {props.namePlural}
          </Heading>
        </Flex.Item>
        <Flex.Item margin='small'>
          <TextInput
            onChange={handleSearchChange}
            renderLabel='Search'
            value={props.searchValue}
          />
        </Flex.Item>
        <Flex.Item>
          <Link to={`/${props.nameLink}/create`}>Add {props.nameSingular}</Link>
        </Flex.Item>
      </Flex>
      <Table caption={props.namePlural} hover={true}>
        <Table.Head>
          <Table.Row>
            {headers()}
            <Table.ColHeader id='Details'></Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>{rows()}</Table.Body>
      </Table>
    </div>
  )
}

PageTemplate.propTypes = {
  ascending: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  nameLink: PropTypes.string.isRequired,
  namePlural: PropTypes.string.isRequired,
  nameSingular: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
}

export default PageTemplate
