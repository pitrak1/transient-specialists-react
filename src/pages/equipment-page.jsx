import React from 'react'
import api from '../api.js'

const EquipmentPage = () => {
  const onClick = () => {
    api.getEquipment()
  }

  return (
    <div>
      EQUIPMENT
      <button onClick={onClick}>Get</button>
    </div>
  )
}

export default EquipmentPage
