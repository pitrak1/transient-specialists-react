import React from 'react'
import PropTypes from 'prop-types'
import { Button, Toolbar, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function EquipmentDetailsFiles(props) {
  AWS.config.update({
      signatureVersion: 'v4'
  })
  const s3 = new AWS.S3({region: process.env.REGION})
  const getSignedUrl = (file) => {
    return s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: `${props.equipmentId}_${file.name}`
    })
  }

  const table = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell style={{ width: '1px' }}></TableCell>
          <TableCell style={{ width: '1px' }}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.files.map(file => (
          <TableRow key={file.name}>
            <TableCell>{file.name}</TableCell>
            <TableCell>
              <Button href={getSignedUrl(file)}>
                Download
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={props.onDeleteFile.bind(null, file.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div>
      <Toolbar>
        <Typography variant='h5'>Files</Typography>
        <input
          accept='*'
          id='add-file-button'
          type='file'
          onChange={props.onAddFile}
          style={{ display: 'none' }}
        />
        <label htmlFor='add-file-button'>
          <Button size='large' component='span'>
            Upload
          </Button>
        </label>
      </Toolbar>
      {table()}
    </div>
  )
}

EquipmentDetailsFiles.propTypes = {
  equipmentId: PropTypes.number.isRequired,
  files: PropTypes.array.isRequired,
  onAddFile: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired
}

export default EquipmentDetailsFiles
