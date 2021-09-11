import React from 'react';

const Index = React.lazy(() => import('./Index'))
const StaffsNew = React.lazy(() => import('./Staffs/New'))
const StaffsIndex = React.lazy(() => import('./Staffs/Index'))
const StaffsDetail = React.lazy(() => import('./Staffs/Detail'))
const ClientsIndex = React.lazy(() => import('./Clients/Index'))

const SuperadminRoutes = [
    {
      path: `/superadmin`,
      exact: true,
      component: Index,
      title: `Index`,
      closeEnv: [],
    },
    {
      path: `/superadmin/staffs`,
      exact: true,
      component: StaffsIndex,
      title: `Index List Staffs`,
      closeEnv: [],
    },
    {
      path: `/superadmin/staffs/new`,
      exact: true,
      component: StaffsNew,
      title: `Create staff`,
      closeEnv: [],
    },
    {
      path: `/superadmin/staffs/:slug`,
      exact: true,
      component: StaffsDetail,
      title: `Create staff`,
      closeEnv: [],
    },
    {
      path: `/superadmin/clients`,
      exact: true,
      component: ClientsIndex,
      title: `Index List Clients`,
      closeEnv: [],
    }
  ]
  
export default SuperadminRoutes