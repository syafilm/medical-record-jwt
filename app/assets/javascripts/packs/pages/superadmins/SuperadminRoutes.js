import React from 'react';

const Index = React.lazy(() => import('./Index'))
const StaffsNew = React.lazy(() => import('./Staffs/New'))
const StaffsIndex = React.lazy(() => import('./Staffs/Index'))
const StaffsDetail = React.lazy(() => import('./Staffs/Detail'))
const ClientsNew = React.lazy(() => import('./Clients/New'))
const ClientsIndex = React.lazy(() => import('./Clients/Index'))
const ClientsDetail = React.lazy(() => import('./Clients/Detail'))

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
      title: `Create Staff`,
      closeEnv: [],
    },
    {
      path: `/superadmin/staffs/:slug`,
      exact: true,
      component: StaffsDetail,
      title: `Detail Staff`,
      closeEnv: [],
    },
    {
      path: `/superadmin/clients`,
      exact: true,
      component: ClientsIndex,
      title: `Index List Clients`,
      closeEnv: [],
    },
    {
      path: `/superadmin/clients/new`,
      exact: true,
      component: ClientsNew,
      title: `Create Client`,
      closeEnv: [],
    },
    {
      path: `/superadmin/clients/:slug`,
      exact: true,
      component: ClientsDetail,
      title: `Detail Client`,
      closeEnv: [],
    },
  ]
  
export default SuperadminRoutes