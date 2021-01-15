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
import ItemGroupsPage from 'pages/itemgroups-page'
import ItemGroupsEditPage from 'pages/itemgroups-edit-page'
import ItemGroupsCreatePage from 'pages/itemgroups-create-page'
import ItemGroupsDetailsPage from 'pages/itemgroups-details-page'
import ReportsPage from 'pages/reports-page'
import AWS from 'aws-sdk'

theme.use()

const credentials = new AWS.Credentials({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})
AWS.config.update({
  credentials
})

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/equipment/create'>
            <EquipmentCreatePage />
          </Route>
          <Route path='/equipment/details/:id'>
            <EquipmentDetailsPage />
          </Route>
          <Route path='/equipment/search/:search'>
            <EquipmentPage />
          </Route>
          <Route path='/equipment/edit/:id'>
            <EquipmentEditPage />
          </Route>
          <Route path='/events/:id/create/'>
            <EventsCreatePage />
          </Route>
          <Route path='/events/:equipmentId/edit/:eventId'>
            <EventsEditPage />
          </Route>
          <Route path='/oems/create'>
            <OemsCreatePage />
          </Route>
          <Route path='/oems/search/:search'>
            <OemsPage />
          </Route>
          <Route path='/oems/edit/:id'>
            <OemsEditPage />
          </Route>
          <Route path='/oems'>
            <OemsPage />
          </Route>
          <Route path='/models/create'>
            <ModelsCreatePage />
          </Route>
          <Route path='/models/search/:search'>
            <ModelsPage />
          </Route>
          <Route path='/models/edit/:id'>
            <ModelsEditPage />
          </Route>
          <Route path='/models'>
            <ModelsPage />
          </Route>
          <Route path='/types/create'>
            <TypesCreatePage />
          </Route>
          <Route path='/types/search/:search'>
            <TypesPage />
          </Route>
          <Route path='/types/edit/:id'>
            <TypesEditPage />
          </Route>
          <Route path='/types'>
            <TypesPage />
          </Route>
          <Route path='/itemgroups/create'>
            <ItemGroupsCreatePage />
          </Route>
          <Route path='/itemgroups/edit/:id'>
            <ItemGroupsEditPage />
          </Route>
          <Route path='/itemgroups/details/:id'>
            <ItemGroupsDetailsPage />
          </Route>
          <Route path='/itemgroups'>
            <ItemGroupsPage />
          </Route>
          <Route path='/reports'>
            <ReportsPage />
          </Route>
          <Route path='/'>
            <EquipmentPage />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false
