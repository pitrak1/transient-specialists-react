import React from 'react'
import ReactDOM from 'react-dom'
import TestComponent from './components/test-component.jsx'

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<TestComponent />, wrapper) : false
