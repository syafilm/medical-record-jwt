import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Index, Guest, Superadmin} from 'pages'
import {Loading} from 'components'
import GuestRoutes from './guests/GuestRoutes'
import SuperadminRoutes from './superadmins/SuperadminRoutes'

const Routes = () => {
  return(
    <>
      <React.Suspense fallback={<Loading/>}>
        <Switch>
          {SuperadminRoutes.map(any => <Superadmin {...any} key={any.path} />)}

          {GuestRoutes.map(any => <Guest {...any} key={any.path}/>)}
        </Switch>
      </React.Suspense>
    </>
  )
}

export default Routes