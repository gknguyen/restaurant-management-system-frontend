import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../components/layouts/auth/auth';
import DashBoardLayout from '../components/layouts/dashboard/dashboard';
import Login from '../components/viewers/login/login';
import CreateProduct from '../components/viewers/products/createAndEdit/createProduct';
import ProductDetails from '../components/viewers/products/details/productDetails';
import ProductList from '../components/viewers/products/list/productList';
import CreateUser from '../components/viewers/users/createAndEdit/createUser';
import UserDetails from '../components/viewers/users/details/userDetails';
import UserList from '../components/viewers/users/list/userList';

const routes = [
  /* ================================ Login ================================ */
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/auth/login" />,
  },
  {
    path: '/auth',
    component: Auth,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: Login,
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
        component: ProductList,
      },
      {
        path: '/menu/createProduct',
        exact: true,
        component: CreateProduct,
      },
      {
        path: '/menu/productDetails',
        exact: true,
        component: ProductDetails,
      },

      /* ================================ User routes ================================ */
      {
        path: '/userList',
        exact: true,
        component: UserList,
      },
      {
        path: '/createUser',
        exact: true,
        component: CreateUser,
      },
      {
        path: '/userDetails',
        exact: true,
        component: UserDetails,
      },
    ],
  },
];

export default routes;
