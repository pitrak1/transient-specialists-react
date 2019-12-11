import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'
import Subtitle from 'common/display/subtitle'
import utils from 'src/utils'

function EquipmentDetailsInfo(props) {
  const {
    oemName,
    modelName,
    typeName,
    eventStatus,
    eventJobNumber,
    eventCompanyNotes,
    notes,
    calCompany,
    calDue,
  } = props.equipment

  return (
    <Grid container>
      <Grid item xs={12}>
        OEM:
        <Button
          onClick={() => {
            props.history.push(`/oems/search/${oemName}`)
          }}
        >
          {oemName}
        </Button>
      </Grid>
      <Grid item xs={12}>
        Model:
        <Button
          onClick={() => {
            props.history.push(`/models/search/${modelName}`)
          }}
        >
          {modelName}
        </Button>
      </Grid>
      <Grid item xs={12}>
        Type:
        <Button
          onClick={() => {
            props.history.push(`/types/search/${typeName}`)
          }}
        >
          {typeName}
        </Button>
      </Grid>
      <Grid item xs={12}>
        Status: {eventStatus}
      </Grid>
      <Grid item xs={12}>
        Job Number: {eventJobNumber}
      </Grid>
      <Grid item xs={12}>
        Company/Notes: {eventCompanyNotes}
      </Grid>
      <Grid item xs={12}>
        <Subtitle label='Notes' />
      </Grid>
      <Grid item xs={12}>
        {notes}
      </Grid>
      <Grid item xs={12}>
        <Subtitle label='Calibration Info' />
      </Grid>
      <Grid item xs={12}>
        Calibration Company: {calCompany}
      </Grid>
      <Grid item xs={12}>
        Calibration Due: {utils.displayDateFromISO(calDue)}
      </Grid>
    </Grid>
  )
}

EquipmentDetailsInfo.propTypes = {
  equipment: PropTypes.shape({
    calCompany: PropTypes.string,
    calDue: PropTypes.string,
    eventCompanyNotes: PropTypes.string,
    eventJobNumber: PropTypes.string,
    eventStatus: PropTypes.string,
    modelName: PropTypes.string,
    notes: PropTypes.string,
    oemName: PropTypes.string,
    typeName: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired,
}

export default EquipmentDetailsInfo
