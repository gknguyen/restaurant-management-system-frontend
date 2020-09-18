export interface LoginForm {
  username: string;
  password: string;
}

export interface UserInfo {
  role: string;
  fullName: string;
  avatar: string;
}

export interface ProductType {
  id: string;
  typeName: string;
}

export interface MenuType {
  id: string;
  typeName: string;
  icon: string;
}

export interface UserType {
  id: string;
  typeName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number | string;
  unit: string;
  amount: number;
  active: boolean | JSX.Element;
  image: string;
  description: string;
  productType: ProductType;
  productTypeId: string;
  productTypeName: string;
  menuType: MenuType;
  menuTypeId: string;
  menuTypeName: string;
  editDateTime: Date | string;
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
  password: string;
  fullName: string;
  age: number;
  phoneNumber: string;
  email: string;
  avatar: string;
  loginDateTime: Date | string;
  authToken: string;
  activeStatus: boolean | JSX.Element;
  userType: UserType;
  userTypeId: string;
  userTypeName: string;
}

export interface UserHeadCell {
  id: keyof User;
  disablePadding: boolean;
  numeric: boolean;
  label: string;
}

export interface HTTPdata {
  code: number;
  message: string;
  values: any;
}
