import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Heading } from '@instructure/ui-elements'
import { Flex } from '@instructure/ui-layout'
import { TextInput } from '@instructure/ui-text-input'
import { Table } from '@instructure/ui-table'

class PageTemplate extends React.Component {
  state = {
    ascending: true,
    data: this.props.data,
    searchValue: this.props.startingSearch,
    sortBy: this.props.startingSortBy,
  }

  headers = () => {
    return this.props.columns.map(column => {
      let sortDirection = 'none'
      if (this.state.sortBy === column.key) {
        sortDirection = this.state.ascending ? 'ascending' : 'descending'
      }

      return (
        <Table.ColHeader
          key={column.key}
          id={column.key}
          onRequestSort={this.handleSort}
          sortDirection={sortDirection}
        >
          {column.label}
        </Table.ColHeader>
      )
    })
  }

  rows = () => {
    const filtered = this.state.data.filter(datum => {
      const value = this.state.searchValue.toLowerCase()
      return (
        !value ||
        this.props.columns.filter(column =>
          datum[column.key].toLowerCase().startsWith(value),
        ).length
      )
    })

    const sorted = filtered.sort((a, b) => {
      return this.state.ascending
        ? a[this.state.sortBy].localeCompare(b[this.state.sortBy])
        : b[this.state.sortBy].localeCompare(a[this.state.sortBy])
    })

    return sorted.map(datum => {
      const cells = this.props.columns.map(column => (
        <Table.Cell key={column.key}>{datum[column.key]}</Table.Cell>
      ))
      return (
        <Table.Row key={datum.id}>
          {cells}
          <Table.Cell>
            <Link to={`${this.props.link}${datum.id}`}>Details</Link>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  handleSearchChange = (_e, value) => {
    this.setState({ searchValue: value })
  }

  handleSort = (_e, { id }) => {
    if (this.state.sortBy === id) {
      this.setState(prevState => ({ ascending: !prevState.ascending }))
    } else {
      this.setState({ ascending: true, sortBy: id })
    }
  }

  render() {
    return (
      <div>
        <Flex>
          <Flex.Item grow shrink>
            <Heading level='h1' margin='medium'>
              {this.props.namePlural}
            </Heading>
          </Flex.Item>
          <Flex.Item margin='small'>
            <TextInput
              onChange={this.handleSearchChange}
              renderLabel='Search'
              value={this.state.searchValue}
            />
          </Flex.Item>
          <Flex.Item>
            <Link to={`${this.props.link}create`}>
              Add {this.props.nameSingular}
            </Link>
          </Flex.Item>
        </Flex>
        <Table caption={this.props.namePlural} hover={true}>
          <Table.Head>
            <Table.Row>
              {this.headers()}
              <Table.ColHeader id='Details'></Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{this.rows()}</Table.Body>
        </Table>
      </div>
    )
  }
}

PageTemplate.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
  namePlural: PropTypes.string.isRequired,
  nameSingular: PropTypes.string.isRequired,
  startingSearch: PropTypes.string.isRequired,
  startingSortBy: PropTypes.string.isRequired,
}

export default PageTemplate
