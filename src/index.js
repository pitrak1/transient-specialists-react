import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { theme } from '@instructure/canvas-theme'
import Layout from 'common/pages/layout'
import EquipmentPage from 'pages/equipment-page'
import EquipmentDetailsPage from 'pages/equipment-details-page'
import EquipmentCreatePage from 'pages/equipment-create-page'
import EquipmentEditPage from 'pages/equipment-edit-page'
import EventsCreatePage from 'pages/events-create-page'
import EventsEditPage from 'pages/events-edit-page'
import ModelsPage from 'pages/models-page'
import ModelsCreatePage from 'pages/models-create-page'
import ModelsEditPage from 'pages/models-edit-page'
import OemsPage from 'pages/oems-page'
import OemsCreatePage from 'pages/oems-create-page'
import OemsEditPage from 'pages/oems-edit-page'
import TypesPage from 'pages/types-page'
import TypesCreatePage from 'pages/types-create-page'
import TypesEditPage from 'pages/types-edit-page'

theme.use()

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <EquipmentPage />
          </Route>
          <Route path='/equipment/create' exact>
            <EquipmentCreatePage />
          </Route>
          <Route path='/equipment/:id' exact>
            <EquipmentDetailsPage />
          </Route>
          <Route path='/equipment/search/:search' exact>
            <EquipmentPage />
          </Route>
          <Route path='/equipment/edit/:id' exact>
            <EquipmentEditPage />
          </Route>
          <Route path='/events/:id/create/' exact>
            <EventsCreatePage />
          </Route>
          <Route path='/events/:equipmentId/edit/:eventId' exact>
            <EventsEditPage />
          </Route>
          <Route path='/oems' exact>
            <OemsPage />
          </Route>
          <Route path='/oems/create' exact>
            <OemsCreatePage />
          </Route>
          <Route path='/oems/search/:search' exact>
            <OemsPage />
          </Route>
          <Route path='/oems/edit/:id' exact>
            <OemsEditPage />
          </Route>
          <Route path='/models' exact>
            <ModelsPage />
          </Route>
          <Route path='/models/create' exact>
            <ModelsCreatePage />
          </Route>
          <Route path='/models/search/:search' exact>
            <ModelsPage />
          </Route>
          <Route path='/models/edit/:id' exact>
            <ModelsEditPage />
          </Route>
          <Route path='/types' exact>
            <TypesPage />
          </Route>
          <Route path='/types/create' exact>
            <TypesCreatePage />
          </Route>
          <Route path='/types/search/:search' exact>
            <TypesPage />
          </Route>
          <Route path='/types/edit/:id' exact>
            <TypesEditPage />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false
