export const SessionDuration = 1;
export const backendBaseUrl = 'http://localhost:3000/api/';
export const baseUrl = '/api/';

/** ================================================================================== */
/**
general APIs
*/

export const loginUrl = '/auth/login/';
export const getSignedUrl = '/awsS3/getSignedUrl/';
export const uploadFileToS3Url = '/awsS3/uploadFileToS3/';

/** common APIs */
export const menuTypeUrl = baseUrl + 'common/menuType/';
export const getListMenuTypeUrl = menuTypeUrl + 'getList/';
export const getOneMenuTypeUrl = menuTypeUrl + 'getOne/';

export const productTypeUrl = baseUrl + 'common/productType/';
export const getListProductTypeUrl = productTypeUrl + 'getList/';
export const getOneProductTypeUrl = productTypeUrl + 'getOne/';

export const userTypeUrl = baseUrl + 'common/userType/';
export const getListUserTypeUrl = userTypeUrl + 'getList/';

/** ================================================================================== */
/**
screen APIs
*/

/** main screen */
export const mainScreenUrl = baseUrl + 'main/';
export const getListProductForMainScreenUrl = mainScreenUrl + 'getList/';

/** product screen */
export const productScreenUrl = baseUrl + 'product/';
export const getListProductForProductScreenUrl = productScreenUrl + 'getList/';
export const getOneProductForProductScreenUrl = productScreenUrl + 'getOne/';
export const searchListProductForProductScreenUrl = productScreenUrl + 'searchList/';
export const createOneProductForProductScreenUrl = productScreenUrl + 'createOne/';
export const editOneProductForProductScreenUrl = productScreenUrl + 'editOne/';
export const deleteListProductForProductScreenUrl = productScreenUrl + 'deleteList/';

/** user screen */
export const userScreenUrl = baseUrl + 'user/';
export const getListUserForUserScreenUrl = userScreenUrl + 'getList/';
export const getOneUserForUserScreenUrl = userScreenUrl + 'getOne/';
export const searchListUserForUserScreenUrl = userScreenUrl + 'searchList/';
export const createOneUserForUserScreenUrl = userScreenUrl + 'createOne/';
export const editOneUserForUserScreenUrl = userScreenUrl + 'editOne/';
export const deleteOneUserForUserScreenUrl = userScreenUrl + 'deleteOne/';
export const deleteListUserForUserScreenUrl = userScreenUrl + 'deleteList/';
