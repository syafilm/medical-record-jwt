import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import {configure} from 'mobx'
import { Routes, history } from 'utils'
import {Provider} from 'context'
import { RootStore } from 'stores'
import { App } from 'pages'
import { CookiesProvider } from 'react-cookie'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-input-range/lib/css/index.css'

configure({ enforceActions: 'observed'})

const value = new RootStore()
// temporary use event turbolinks until turbolinks unused
// document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider value={value}>
      <CookiesProvider>
        <Router history={history}>
          <App />
        </Router>
      </CookiesProvider>
    </Provider>,
    document.getElementById('main-app')
  )}
)
