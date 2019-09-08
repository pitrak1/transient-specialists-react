import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './components/layout.jsx'
import EquipmentPage from './pages/equipment-page.jsx'
import EquipmentDetailsPage from './pages/equipment-details-page.jsx'
import EquipmentCreatePage from './pages/equipment-create-page.jsx'
import ModelsPage from './pages/models-page.jsx'
import ModelsCreatePage from './pages/models-create-page.jsx'
import ModelsDetailsPage from './pages/models-details-page.jsx'
import OemsPage from './pages/oems-page.jsx'
import OemsCreatePage from './pages/oems-create-page.jsx'
import OemsDetailsPage from './pages/oems-details-page.jsx'
import TypesPage from './pages/types-page.jsx'
import TypesCreatePage from './pages/types-create-page.jsx'
import TypesDetailsPage from './pages/types-details-page.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={EquipmentPage} />
          <Route
            path='/equipment/create'
            exact
            component={EquipmentCreatePage}
          />
          <Route path='/equipment/:id' exact component={EquipmentDetailsPage} />
          <Route
            path='/equipment/search/:search'
            exact
            component={EquipmentPage}
          />
          <Route path='/oems' exact component={OemsPage} />
          <Route path='/oems/create' exact component={OemsCreatePage} />
          <Route path='/oems/:id' exact component={OemsDetailsPage} />
          <Route path='/models' exact component={ModelsPage} />
          <Route path='/models/create' exact component={ModelsCreatePage} />
          <Route path='/models/:id' exact component={ModelsDetailsPage} />
          <Route path='/models/search/:search' exact component={ModelsPage} />
          <Route path='/types' exact component={TypesPage} />
          <Route path='/types/create' exact component={TypesCreatePage} />
          <Route path='/types/:id' exact component={TypesDetailsPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false
