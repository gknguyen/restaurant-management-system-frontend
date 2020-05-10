export const SessionDuration: any = 1;
export const backendBaseUrl: string = 'http://localhost:3000/api/';
export const baseUrl: string = '/api/';

export const loginUrl: string = '/auth/login';
export const getSignedUrl: string = '/awsS3/getSignedUrl';

/* menu type */
export const menuTypeUrl: string = '/api/menuType/';
export const getListMenuTypeUrl: string = menuTypeUrl + 'getList';
export const getOneMenuTypeUrl: string = menuTypeUrl + 'getOne';

/* product type */
export const productTypeUrl: string = '/api/productType/';
export const getListProductTypeUrl: string = productTypeUrl + 'getList';
export const getOneProductTypeUrl: string = productTypeUrl + 'getOne';

/* product */
export const productUrl: string = '/api/product/';
export const getListProductUrl: string = productUrl + 'getList';
export const getOneProductUrl: string = productUrl + 'getOne';
export const searchListProductUrl: string = productUrl + 'searchList';
export const createOneProductUrl: string = productUrl + 'createOne';
export const updateOneProductUrl: string = productUrl + 'updateOne';
export const deleteListProductUrl: string = productUrl + 'deleteList';

/* user */
export const userUrl: string = '/api/user/';
export const getListUserUrl: string = userUrl + 'getList';
export const getOneUserUrl: string = userUrl + 'getOne';
