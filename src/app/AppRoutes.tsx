import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../components/layouts/auth/auth';
import DashBoardLayout from '../components/layouts/dashboard/dashboard';
import Login from '../components/views/login/login';
import CreateProduct from '../components/views/products/createAndEdit/createProduct';
import ProductDetails from '../components/views/products/details/productDetails';
import ProductList from '../components/views/products/list/productList';
import UserList from '../components/views/users/list/userList';
import Logout from '../components/views/login/logout';
import Home from '../components/views/home/home';
import CustomerInfo from '../components/views/home/customer';
import OrderList from '../components/views/order/list/orderList';
import OrderDetails from '../components/views/order/details/orderDetails';
import CustomerList from '../components/views/customer/list/customerList';

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
        component: CustomerInfo,
      },
      /* ================================ Order routes ================================ */
      {
        path: '/orderList',
        exact: true,
        component: OrderList,
      },
      {
        path: '/orderDetails',
        exact: true,
        component: OrderDetails,
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
      /* ================================ Customer routes ================================ */
      {
        path: '/customerList',
        exact: true,
        component: CustomerList,
      },
      /* ================================ User routes ================================ */
      {
        path: '/userList',
        exact: true,
        component: UserList,
      },
    ],
  },
];

export default routes;
