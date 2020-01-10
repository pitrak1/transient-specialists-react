import React, { useState, useEffect } from 'react'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import api from 'src/api'
import { withRouter } from 'react-router'
import DetailsHeader from 'common/display/details-header'
import EquipmentDetailsInfo from 'common/pages/equipment_details_page/equipment-details-info'
import EquipmentDetailsFiles from 'common/pages/equipment_details_page/equipment-details-files'
import EquipmentDetailsEvents from 'common/pages/equipment_details_page/equipment-details-events'
import DetailsDeleteButton from 'common/display/details-delete-button'
import utils from 'src/utils'

function EquipmentDetailsPage(props) {
  const [state, setState] = useState({
    alert: null,
    data: {},
    error: null,
    loading: true,
  })
  const [tableOptions, setTableOptions] = useState({
    ascending: false,
    page: 0,
    perPage: 25,
    sortBy: 'updatedAt',
  })

  useEffect(() => {
    getData()
  }, [tableOptions])

  const getData = () => {
    setState({ ...state, loading: true })
    api.getShow(
      'equipment',
      props.match.params.id,
      tableOptions,
      result => {
        setState({ ...state, data: result, loading: false })
      },
      error => {
        setState({ ...state, error, loading: false })
      },
    )
  }

  const handleEditClick = () => {
    props.history.push(`/equipment/edit/${state.data.equipment.id}`)
  }

  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      setState({ ...state, loading: true })

      const success = _response => {
        props.history.push('/')
      }

      const failure = alert => {
        setState({ ...state, alert, loading: false })
      }

      api.deleteDestroy('equipment', state.data.equipment.id, success, failure)
    }
  }

  const handleAddEventClick = () => {
    props.history.push(`/events/${state.data.equipment.id}/create`)
  }

  const handlePageChange = (_event, page) => {
    setTableOptions({ ...tableOptions, page })
  }

  const handlePerPageChange = event => {
    setTableOptions({ ...tableOptions, perPage: event.target.value })
  }

  const handleSort = (sortBy, ascending) => {
    setTableOptions({ ...tableOptions, sortBy, ascending })
  }

  const handleEventEditClick = id => {
    props.history.push(`/events/${state.data.equipment.id}/edit/${id}`)
  }

  const handleEventDeleteClick = id => {
    if (confirm('Are you sure you want to delete this event?')) {
      setState({ ...state, loading: true })

      const success = _response => {
        getData()
      }

      const failure = alert => {
        setState({ ...state, alert, loading: false })
      }

      api.deleteDestroy('events', id, success, failure)
    }
  }

  const handleAddFile = event => {
    setState({ ...state, loading: true })
    const file = event.target.files[0]
    const success = _response => {
      getData()
    }
    const failure = alert => {
      setState({ ...state, alert, loading: false })
    }
    return utils.fileToBase64(file).then(result =>
      api.postCreate(
        'files',
        {
          name: file.name,
          contents: result,
          equipmentId: state.data.equipment.id,
        },
        success,
        failure,
      ),
    )
  }

  const handleDeleteFile = id => {
    if (confirm('Are you sure you want to delete this file?')) {
      setState({ ...state, loading: true })

      const success = _response => {
        getData()
      }

      const failure = alert => {
        setState({ ...state, alert, loading: false })
      }

      api.deleteDestroy('files', id, success, failure)
    }
  }

  const handleDownloadFile = id => {
    setState({ ...state, loading: true })

    const success = response => {
      fetch(response.file.contents)
        .then(res => res.blob())
        .then(res => {
          utils.downloadBlob(res, response.file.name)
          setState({ ...state, loading: false })
        })
    }

    const failure = alert => {
      setState({ ...state, alert, loading: false })
    }

    api.getShow('files', id, {}, success, failure)
  }

  if (state.loading) {
    return <Spinner />
  }

  if (state.error) {
    return <ErrorAlert closable={false} text={state.error} />
  }

  return (
    <div>
      {state.alert && <ErrorAlert closable={true} text={state.alert} />}
      <DetailsHeader
        label={state.data.equipment.serialNumber}
        onClick={handleEditClick}
      />
      <EquipmentDetailsInfo
        equipment={state.data.equipment}
        history={props.history}
      />
      <EquipmentDetailsFiles
        files={state.data.files}
        onAddFile={handleAddFile}
        onDeleteFile={handleDeleteFile}
        onDownloadFile={handleDownloadFile}
      />
      <EquipmentDetailsEvents
        ascending={tableOptions.ascending}
        eventCount={parseInt(state.data.count)}
        events={state.data.events}
        onAddClick={handleAddEventClick}
        onDeleteClick={handleEventDeleteClick}
        onEditClick={handleEventEditClick}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onSortChange={handleSort}
        page={tableOptions.page}
        perPage={tableOptions.perPage}
        sortBy={tableOptions.sortBy}
      />
      <DetailsDeleteButton
        label='Delete Equipment'
        onDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default withRouter(EquipmentDetailsPage)
