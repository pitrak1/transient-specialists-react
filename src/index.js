import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './common/pages/layout'
import EquipmentPage from './pages/equipment-page'
import EquipmentDetailsPage from './pages/equipment-details-page'
import EquipmentCreatePage from './pages/equipment-create-page'
import EquipmentEditPage from './pages/equipment-edit-page'
import EventsCreatePage from './pages/events-create-page'
import EventsEditPage from './pages/events-edit-page'
import ModelsPage from './pages/models-page'
import ModelsCreatePage from './pages/models-create-page'
import ModelsEditPage from './pages/models-edit-page'
import OemsPage from './pages/oems-page'
import OemsCreatePage from './pages/oems-create-page'
import OemsEditPage from './pages/oems-edit-page'
import TypesPage from './pages/types-page'
import TypesCreatePage from './pages/types-create-page'
import TypesEditPage from './pages/types-edit-page'

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
          <Route
            path='/equipment/edit/:id'
            exact
            component={EquipmentEditPage}
          />
          <Route
            path='/events/:id/create/'
            exact
            component={EventsCreatePage}
          />
          <Route
            path='/events/:equipmentId/edit/:eventId'
            exact
            component={EventsEditPage}
          />
          <Route path='/oems' exact component={OemsPage} />
          <Route path='/oems/create' exact component={OemsCreatePage} />
          <Route path='/oems/search/:search' exact component={OemsPage} />
          <Route path='/oems/edit/:id' exact component={OemsEditPage} />
          <Route path='/models' exact component={ModelsPage} />
          <Route path='/models/create' exact component={ModelsCreatePage} />
          <Route path='/models/search/:search' exact component={ModelsPage} />
          <Route path='/models/edit/:id' exact component={ModelsEditPage} />
          <Route path='/types' exact component={TypesPage} />
          <Route path='/types/create' exact component={TypesCreatePage} />
          <Route path='/types/search/:search' exact component={TypesPage} />
          <Route path='/types/edit/:id' exact component={TypesEditPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false
