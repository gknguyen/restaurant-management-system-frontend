export const SessionDuration = 1;
export const backendBaseUrl = 'http://localhost:3000/api/';
export const baseUrl = '/api/';

export const loginUrl = '/auth/login/';
export const getSignedUrl = '/awsS3/getSignedUrl/';
export const uploadFileToS3Url = '/awsS3/uploadFileToS3/';

/* common APIs */
export const menuTypeUrl = baseUrl + 'common/menuType/';
export const getListMenuTypeUrl = menuTypeUrl + 'getList/';
export const getOneMenuTypeUrl = menuTypeUrl + 'getOne/';

export const productTypeUrl = baseUrl + 'common/productType/';
export const getListProductTypeUrl = productTypeUrl + 'getList/';
export const getOneProductTypeUrl = productTypeUrl + 'getOne/';

export const userTypeUrl = baseUrl + 'common/userType/';
export const getListUserTypeUrl = userTypeUrl + 'getList/';

/* product screen */
export const productUrl = baseUrl + 'product/';
export const getListProductUrl = productUrl + 'getList/';
export const getOneProductUrl = productUrl + 'getOne/';
export const searchListProductUrl = productUrl + 'searchList/';
export const createOneProductUrl = productUrl + 'createOne/';
export const editOneProductUrl = productUrl + 'editOne/';
export const deleteListProductUrl = productUrl + 'deleteList/';

/* user screen */
export const userUrl = baseUrl + 'user/';
export const getListUserUrl = userUrl + 'getList/';
export const getOneUserUrl = userUrl + 'getOne/';
export const searchListUserUrl = userUrl + 'searchList/';
export const createOneUserUrl = userUrl + 'createOne/';
export const editOneUserUrl = userUrl + 'editOne/';
export const deleteListUserUrl = userUrl + 'deleteList/';
