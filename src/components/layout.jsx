import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { withRouter } from 'react-router'

import { theme } from '@instructure/canvas-theme'
theme.use()

const Layout = ({ children, history }) => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Transient Specialists</Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            color='inherit'
            onClick={() => {
              history.push(`/`)
            }}
          >
            Equipment
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              history.push(`/oems`)
            }}
          >
            OEMs
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              history.push(`/models`)
            }}
          >
            Models
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              history.push(`/types`)
            }}
          >
            Types
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withRouter(Layout)
