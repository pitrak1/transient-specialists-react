import React, { useState } from 'react'
import api from 'src/api'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'
import Spinner from 'common/display/spinner'
import ErrorAlert from 'common/display/error-alert'

function ReportsPage(props) {
  const [state, setState] = useState({
    alert: null,
    loading: false,
  })

  const download = data => {
    const blob = new Blob([data], { type: 'text/csv' })
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = 'countReport.csv'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }

  const onClick = () => {
    setState({ ...state, loading: true })

    api.getReport(
      'count',
      result => {
        download(result.result)
        setState({ ...state, loading: false })
      },
      error => {
        setState({ ...state, alert: error, loading: false })
      },
    )
  }

  if (state.loading) {
    return <Spinner />
  }

  return (
    <div>
      {state.alert && <ErrorAlert closable={true} text={state.alert} />}
      <Button onClick={onClick}>Generate Count Report</Button>
    </div>
  )
}

export default withRouter(ReportsPage)
