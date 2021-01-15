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
import AWS, {AWSConfigsS3} from 'aws-sdk'

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
    if (state.data.files.map(x => x.name).includes(file.name)) {
      setState({ ...state, alert: 'Cannot upload identical file names to a single equipment', loading: false })
    } else {
      return uploadToDatabase(file)
    }
  }

  const uploadToDatabase = file => {
    const success = _response => {
      uploadToS3(file)
    }
    const failure = alert => {
      setState({ ...state, alert, loading: false })
    }
    return api.postCreate(
      'files',
      {
        name: file.name,
        equipmentId: state.data.equipment.id,
      },
      success,
      failure,
    )
  }

  const uploadToS3 = file => {
    const upload = new AWS.S3.ManagedUpload({
      region: process.env.REGION,
      params: {
        Bucket: process.env.S3_BUCKET,
        Key: `${state.data.equipment.id}_${file.name}`,
        Body: file
      }
    })
    upload.send((err, data) => {
      getData()
    })
  }

  const handleDeleteFile = id => {
    if (confirm('Are you sure you want to delete this file?')) {
      setState({ ...state, loading: true })
      deleteFromDatabase(id)
    }
  }

  const deleteFromDatabase = id => {
    const success = _response => {
      deleteFromS3(id)
    }

    const failure = alert => {
      setState({ ...state, alert, loading: false })
    }

    api.deleteDestroy('files', id, success, failure)
  }

  const deleteFromS3 = id => {
    const file = state.data.files.find(e => e.id == id)
    const s3 = new AWS.S3({ region: process.env.REGION })
    s3.deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key: `${state.data.equipment.id}_${file.name}`
    }, (err, data) => {
      getData()
    })
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
        equipmentId={state.data.equipment.id}
        files={state.data.files}
        onAddFile={handleAddFile}
        onDeleteFile={handleDeleteFile}
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
