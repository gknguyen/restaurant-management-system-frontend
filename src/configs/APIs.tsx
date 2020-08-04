export const SessionDuration: any = 1;
export const backendBaseUrl: string = 'http://localhost:3000/api/';
export const baseUrl: string = '/api/';

export const loginUrl: string = '/auth/login/';
export const getSignedUrl: string = '/awsS3/getSignedUrl/';

/* common APIs */
export const menuTypeUrl: string = baseUrl + 'common/menuType/';
export const getListMenuTypeUrl: string = menuTypeUrl + 'getList/';
export const getOneMenuTypeUrl: string = menuTypeUrl + 'getOne/';

export const productTypeUrl: string = baseUrl + 'common/productType/';
export const getListProductTypeUrl: string = productTypeUrl + 'getList/';
export const getOneProductTypeUrl: string = productTypeUrl + 'getOne/';

export const userTypeUrl: string = baseUrl + 'common/userType/';
export const getListUserTypeUrl: string = userTypeUrl + 'getList/';

/* product screen */
export const productUrl: string = baseUrl + 'product/';
export const getListProductUrl: string = productUrl + 'getList/';
export const getOneProductUrl: string = productUrl + 'getOne/';
export const searchListProductUrl: string = productUrl + 'searchList/';
export const createOneProductUrl: string = productUrl + 'createOne/';
export const editOneProductUrl: string = productUrl + 'editOne/';
export const deleteListProductUrl: string = productUrl + 'deleteList/';

/* user screen */
export const userUrl: string = baseUrl + 'user/';
export const getListUserUrl: string = userUrl + 'getList/';
export const getOneUserUrl: string = userUrl + 'getOne/';
export const createOneUserUrl: string = userUrl + 'createOne/';
