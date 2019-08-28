import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import EquipmentPage from './pages/equipment-page.jsx'
import ModelsPage from './pages/models-page.jsx'
import OemsPage from './pages/oems-page.jsx'
import TypesPage from './pages/types-page.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Equipment</Link>
            </li>
            <li>
              <Link to='/oems/'>OEMs</Link>
            </li>
            <li>
              <Link to='/models/'>Models</Link>
            </li>
            <li>
              <Link to='/types/'>Types</Link>
            </li>
          </ul>
        </nav>

        <Route path='/' exact component={EquipmentPage} />
        <Route path='/oems/' component={OemsPage} />
        <Route path='/models/' component={ModelsPage} />
        <Route path='/types/' component={TypesPage} />
      </div>
    </BrowserRouter>
  )
}

const wrapper = document.getElementById('main')
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false
