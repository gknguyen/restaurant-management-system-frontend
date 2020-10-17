export interface LoginForm {
  username: string;
  password: string;
}

export interface UserInfo {
  username: string;
  role: string;
}

export interface ProductType {
  readonly id: string;
  typeName: string;
}

export interface MenuType {
  readonly id: string;
  typeName: string;
  icon: string;
}

export interface UserType {
  readonly id: string;
  typeName: string;
}

export interface Product {
  readonly id: string;
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

export interface Customer {
  readonly id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  [x: string]: any;
}

export interface Order {
  readonly id: string;
  no: number;
  customer: Customer;
  orderDetails: OrderDetail[];
  finalPrice: number;
  activeStatus: boolean | JSX.Element;
  createDateTime: Date | string;
  editDateTime: Date | string;
}

export interface OrderDetail {
  readonly id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  [x: string]: any;
}

export interface User {
  readonly id: string;
  username: string;
  password: string;
  fullName: string;
  age: number;
  phoneNumber: string;
  email: string;
  avatar: string;
  loginDateTime: Date | string;
  authToken: string;
  activeStatus: boolean | JSX.Element | string;
  userType: UserType;
  userTypeId: string;
  userTypeName: string;
}

export interface HTTPdata {
  code: number;
  message: string;
  values: any;
}
