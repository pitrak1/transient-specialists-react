import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './components/layout.jsx'
import EquipmentPage from './pages/equipment-page.jsx'
import EquipmentDetailsPage from './pages/equipment-details-page.jsx'
import ModelsPage from './pages/models-page.jsx'
import ModelsDetailsPage from './pages/models-details-page.jsx'
import OemsPage from './pages/oems-page.jsx'
import OemsDetailsPage from './pages/oems-details-page.jsx'
import TypesPage from './pages/types-page.jsx'
import TypesDetailsPage from './pages/types-details-page.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path='/' exact component={EquipmentPage} />
        <Route path='/equipment/:id' component={EquipmentDetailsPage} />
        <Route path='/oems/' exact component={OemsPage} />
        <Route path='/oems/:id' component={OemsDetailsPage} />
        <Route path='/models/' exact component={ModelsPage} />
        <Route path='/models/:id' component={ModelsDetailsPage} />
        <Route path='/types/' exact component={TypesPage} />
        <Route path='/types/:id' component={TypesDetailsPage} />
      </Layout>
    </BrowserRouter>
  )
}

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false
