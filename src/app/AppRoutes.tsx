import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../components/layouts/auth/auth';
import DashBoardLayout from '../components/layouts/dashboard/dashboard';
import Login from '../components/views/login/login';
import CreateProduct from '../components/views/products/createAndEdit/createProduct';
import ProductDetails from '../components/views/products/details/productDetails';
import ProductList from '../components/views/products/list/productList';
// import CreateUser from '../components/views/users/createAndEdit/createUser';
// import UserDetails from '../components/views/users/details/userDetails';
import UserList from '../components/views/users/list/userList';
import Logout from '../components/views/login/logout';
import Home from '../components/views/home/home';
import Customer from '../components/views/home/customer';

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
      {
        path: '/auth/logout',
        exact: true,
        component: Logout,
      },
    ],
  },
  {
    path: '*',
    component: DashBoardLayout,
    routes: [
      /* ================================ Main routes ================================ */
      {
        path: '/home',
        exact: true,
        component: Home,
      },
      {
        path: '/customer',
        exact: true,
        component: Customer,
      },
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
      // {
      //   path: '/createUser',
      //   exact: true,
      //   component: CreateUser,
      // },
      // {
      //   path: '/userDetails',
      //   exact: true,
      //   component: UserDetails,
      // },
    ],
  },
];

export default routes;
