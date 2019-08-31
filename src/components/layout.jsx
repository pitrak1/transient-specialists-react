import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from '@instructure/ui-elements'
import { Link } from 'react-router-dom'
import { View, Flex } from '@instructure/ui-layout'
import styles from './layout.module.css'

import { theme } from '@instructure/canvas-theme'
theme.use()

const Layout = ({ children }) => {
  return (
    <div>
      <View
        as='div'
        background='info'
        display='inline-block'
        padding='medium'
        width='100%'
      >
        <Flex>
          <Flex.Item grow margin='small' shrink>
            <Heading level='h2'>Transient Specialists</Heading>
          </Flex.Item>
          <Flex.Item margin='small'>
            <Link to='/' className={styles.navlink}>
              Equipment
            </Link>
          </Flex.Item>
          <Flex.Item margin='small'>
            <Link to='/oems' className={styles.navlink}>
              OEMs
            </Link>
          </Flex.Item>
          <Flex.Item margin='small'>
            <Link to='/models' className={styles.navlink}>
              Models
            </Link>
          </Flex.Item>
          <Flex.Item margin='small'>
            <Link to='/types' className={styles.navlink}>
              Types
            </Link>
          </Flex.Item>
        </Flex>
      </View>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
