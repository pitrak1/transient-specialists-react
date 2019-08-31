import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './components/layout.jsx'
import EquipmentPage from './pages/equipment-page.jsx'
import ModelsPage from './pages/models-page.jsx'
import OemsPage from './pages/oems-page.jsx'
import TypesPage from './pages/types-page.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path='/' exact component={EquipmentPage} />
        <Route path='/oems/' component={OemsPage} />
        <Route path='/models/' component={ModelsPage} />
        <Route path='/types/' component={TypesPage} />
      </Layout>
    </BrowserRouter>
  )
}

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false
