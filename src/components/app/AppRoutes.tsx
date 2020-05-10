/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from '../layouts/auth';
import DashBoardLayout from '../layouts/dashboard';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/auth/login' />,
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('../viewers/login')),
      },
    ],
  },
  {
    path: '*',
    component: DashBoardLayout,
    routes: [
      /* ================================ Product routes ================================ */
      {
        path: '/menu/productList',
        exact: true,
        component: lazy(() => import('../viewers/products/list')),
      },
      {
        path: '/menu/createProduct',
        exact: true,
        component: lazy(() => import('../viewers/products/createAndEdit/createProduct')),
      },
      {
        path: '/menu/productDetails',
        exact: true,
        component: lazy(() => import('../viewers/products/details')),
      },

      /* ================================ User routes ================================ */
      {
        path: '/userList',
        exact: true,
        component: lazy(() => import('../viewers/users/list')),
      },
      {
        path: '/userDetails',
        exact: true,
        component: lazy(() => import('../viewers/users/details')),
      },
    ],
  },
];

export default routes;
