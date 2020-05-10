export interface LoginForm {
  username: string;
  password: string;
}

export interface ProductType {
  id: string;
  typeName: string;
}

export interface MenuType {
  id: string;
  typeName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  amount: number;
  active: boolean;
  image: string;
  description: string;
  productType: any;
  productTypeId: string;
  productTypeName: string;
  menuType: any;
  menuTypeId: string;
  menuTypeName: string;
}

export interface ProductHeadCell {
  id: keyof Product;
  disablePadding: boolean;
  numeric: boolean;
  label: string;
}

export interface User {
  id: string;
  username: string;
  fullName: number;
  age: string;
  phoneNumber: number;
  email: boolean;
  avatar: string;
  loginDatetime: Date;
  authToken: string;
  activeStatus: boolean;
  userType: any;
  userTypeId: string;
  userTypeName: string;
}

export interface UserHeadCell {
  id: keyof User;
  disablePadding: boolean;
  numeric: boolean;
  label: string;
}

export interface Image {
  name: string;
  size: number;
  type: string;
  path: string;
}

