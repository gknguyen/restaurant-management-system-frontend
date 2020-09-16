export const SessionDuration = 1;
export const backendBaseUrl = 'http://localhost:3000/api/';
export const baseUrl = '/api/';

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

/** main screen */
export const mainScreenUrl = baseUrl + 'main/';
export const getListProductForMainScreenUrl = mainScreenUrl + 'getList/';

/** product screen */
export const productScreenUrl = baseUrl + 'product/';
export const getListProductUrl = productScreenUrl + 'getList/';
export const getOneProductUrl = productScreenUrl + 'getOne/';
export const searchListProductUrl = productScreenUrl + 'searchList/';
export const createOneProductUrl = productScreenUrl + 'createOne/';
export const editOneProductUrl = productScreenUrl + 'editOne/';
export const deleteListProductUrl = productScreenUrl + 'deleteList/';

/** user screen */
export const userScreenUrl = baseUrl + 'user/';
export const getListUserUrl = userScreenUrl + 'getList/';
export const getOneUserUrl = userScreenUrl + 'getOne/';
export const searchListUserUrl = userScreenUrl + 'searchList/';
export const createOneUserUrl = userScreenUrl + 'createOne/';
export const editOneUserUrl = userScreenUrl + 'editOne/';
export const deleteListUserUrl = userScreenUrl + 'deleteList/';
