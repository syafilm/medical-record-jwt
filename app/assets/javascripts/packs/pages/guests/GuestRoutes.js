import React from 'react';

const Index = React.lazy(() => import('./Index'))
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));

const GuestRoutes = [
    {
      path: `/`,
      exact: true,
      component: Index,
      title: `Index`,
      closeEnv: [],
    },
    {
      path: `/:slug/login`,
      exact: true,
      component: Login,
      title: `Login`,
      closeEnv: [],
    },
    {
      path: `/:slug/register`,
      exact: true,
      component: Register,
      title: `Register`,
      closeEnv: [],
    }
  ]
  
export default GuestRoutes