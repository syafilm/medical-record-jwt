import React from 'react';

const Index = React.lazy(() => import('./Index'))
const StaffsNew = React.lazy(() => import('./Staffs/New'))
const StaffsIndex = React.lazy(() => import('./Staffs/Index'))
const StaffsDetail = React.lazy(() => import('./Staffs/Detail'))

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
    }
  ]
  
export default SuperadminRoutes