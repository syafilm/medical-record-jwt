import React from 'react';

const Index = React.lazy(() => import('./Index'))
const Staffnew = React.lazy(() => import('./Staffnew'))

const SuperadminRoutes = [
    {
      path: `/superadmin`,
      exact: true,
      component: Index,
      title: `Index`,
      closeEnv: [],
    },
    {
      path: `/superadmin/staff/new`,
      exact: true,
      component: Staffnew,
      title: `Index`,
      closeEnv: [],
    },
  ]
  
export default SuperadminRoutes