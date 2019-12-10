import React from 'react'
import { Button, Grid, Toolbar, Typography } from '@material-ui/core'
import { Modal } from '@instructure/ui-modal'
import { Delete, Add } from '@material-ui/icons'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import Title from 'common/display/title'
import Subtitle from 'common/display/subtitle'
import FullTable from 'common/display/table/full-table'
import api from 'src/api'
import utils from 'src/utils'
import { withRouter } from 'react-router'
import FormSelect from 'common/forms/form-select'

export class ItemGroupsAddModelModal extends React.Component {
  state = {
    modelId: 0,
    modelIdValid: false,
  }

  handleChange = (identifier, value, valid) => {
    const state = {}
    state[identifier] = value
    state[`${identifier}Valid`] = valid
    this.setState(state)
  }

  handleSubmit = () => {
    console.log('Submitted')
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onDismiss={this.props.onDismiss}
        size='auto'
        shouldCloseOnDocumentClick
      >
        <Modal.Header>
          <Subtitle label='Add Model' />
        </Modal.Header>
        <Modal.Body>
          <FormSelect
            defaultOptionLabel='Select a Model'
            disabled={false}
            identifier={'modelId'}
            label='Model'
            onChange={this.handleChange}
            options={this.props.models}
            required={true}
            value={this.state.modelId}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onDismiss}>Close</Button>&nbsp;
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default withRouter(ItemGroupsAddModelModal)
