import React, { useState, useEffect } from 'react'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import api from 'src/api'
import { withRouter } from 'react-router'
import DetailsHeader from 'common/display/details-header'
import ItemGroupsDetailsModels from 'common/pages/itemgroups_details_page/itemgroups-details-models'
import ItemGroupsDetailsHandles from 'common/pages/itemgroups_details_page/itemgroups-details-handles'
import DetailsDeleteButton from 'common/display/details-delete-button'

function ItemGroupsDetailsPage(props) {
  const [state, setState] = useState({
    alert: null,
    data: { models: [], oems: [] },
    error: null,
    loading: true,
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setState({ ...state, loading: true })
    api.getShow(
      'itemgroups',
      props.match.params.id,
      {},
      result => {
        setState({ ...state, loading: false, data: result })
      },
      error => {
        setState({ ...state, loading: false, error })
      },
    )
  }

  const handleModelAddClick = id => {
    setState({ ...state, loading: true })
    api.patchUpdate(
      'itemgroups',
      {
        id,
        itemGroupId: state.data.itemGroup.id,
        add: true,
        model: true,
      },
      result => {
        getData()
      },
      error => {
        setState({ ...state, loading: false, error })
      },
    )
  }

  const handleModelDeleteClick = id => {
    setState({ ...state, loading: true })
    api.patchUpdate(
      'itemgroups',
      {
        id,
        itemGroupId: state.data.itemGroup.id,
        remove: true,
        model: true,
      },
      result => {
        getData()
      },
      error => {
        setState({ ...state, loading: false, error })
      },
    )
  }

  const handleHandleAddClick = handle => {
    setState({ ...state, loading: true })
    api.patchUpdate(
      'itemgroups',
      {
        id: state.data.itemGroup.id,
        handle,
        add: true,
      },
      result => {
        getData()
      },
      error => {
        setState({ ...state, loading: false, error })
      },
    )
  }

  const handleHandleDeleteClick = id => {
    setState({ ...state, loading: true })
    api.patchUpdate(
      'itemgroups',
      { handleId: id, remove: true },
      result => {
        getData()
      },
      error => {
        setState({ ...state, loading: false, error })
      },
    )
  }

  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this item group?')) {
      setState({ ...state, loading: true })

      const success = _response => {
        props.history.push('/itemgroups')
      }

      const failure = error => {
        setState({ ...state, loading: false, alert: error })
      }

      api.deleteDestroy('itemgroups', state.data.itemGroup.id, success, failure)
    }
  }

  const handleEditClick = () => {
    props.history.push(`/itemgroups/edit/${state.data.itemGroup.id}`)
  }

  if (state.loading) {
    return <Spinner />
  }

  return (
    <div>
      {state.alert && <ErrorAlert closable={true} text={state.alert} />}
      <DetailsHeader
        label={state.data.itemGroup.name}
        onClick={handleEditClick}
      />
      <ItemGroupsDetailsModels
        associatedModels={state.data.itemGroup.models}
        models={state.data.models}
        oems={state.data.oems}
        onAddClick={handleModelAddClick}
        onDeleteClick={handleModelDeleteClick}
      />
      <br />
      <ItemGroupsDetailsHandles
        handles={state.data.itemGroup.handles}
        onAddClick={handleHandleAddClick}
        onDeleteClick={handleHandleDeleteClick}
      />
      <DetailsDeleteButton
        label='Delete Item Group'
        onDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default withRouter(ItemGroupsDetailsPage)
