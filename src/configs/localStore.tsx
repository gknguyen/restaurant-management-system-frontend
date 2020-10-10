import { UserInfo } from './interfaces';

export function getAuthToken() {
  const tokenDataString = localStorage.getItem('token');
  const token = tokenDataString ? JSON.parse(tokenDataString) : '';
  return token as string;
}

export function getdUserInfo() {
  const userInfoDataString = localStorage.getItem('userInfo');
  const userInfo = userInfoDataString ? JSON.parse(userInfoDataString) : '';
  return userInfo as UserInfo;
}

export function getProductId() {
  const productId = sessionStorage.getItem('productId');
  return productId;
}

export function getUserId() {
  const userId = sessionStorage.getItem('userId');
  return userId;
}

export function getOrderId() {
  const orderId = sessionStorage.getItem('orderId');
  return orderId;
}
