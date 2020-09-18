import axios from 'axios';
import STATUS_CODE from 'http-status';
import { HTTPdata } from './interfaces';
import { getAuthToken } from './localStore';
import MESSAGE from './messages';
import { showSnackBarAlert } from './utils';

/** ================================================================================== */
/**
for login
*/
const auth = axios.create({
  baseURL: '',
  timeout: 10000,
});

/** POST */
export const authPost = (url: string, data: object) =>
  auth({
    method: 'POST',
    url: url,
    data: data,
  })
    .then((res) => res.data as HTTPdata)
    .catch((err) => handleApiError(err));

/** ================================================================================== */
/**
for main APIs
*/
const token = getAuthToken();

const api = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: { token: token },
});

/** Add a request interceptor */
// api.interceptors.request.use(
//   function(config) {
//     if (!config.headers.token) {
//       window.location.replace('/auth/logout');
//       showSnackBarAlert(60000, 'error', MESSAGE.HTTP.ERROR_401 + ' : token not found');
//     }
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   },
// );

/** Add a response interceptor */
api.interceptors.response.use(
  function(res) {
    return res;
  },
  function(err) {
    handleApiError(err);
    return Promise.reject(err);
  },
);

/** GET */
export const apiGet = (url: string, params?: object) =>
  api({
    method: 'GET',
    url: url,
    params: params,
  })
    .then((res) => res.data as HTTPdata)
    .catch((err) => handleApiError(err));

/** POST */
export const apiPost = (url: string, data?: object) =>
  api({
    method: 'POST',
    url: url,
    data: data,
  })
    .then((res) => res.data as HTTPdata)
    .catch((err) => handleApiError(err));

/** PUT */
export const apiPut = (url: string, params?: object, data?: object) =>
  api({
    method: 'PUT',
    url: url,
    params: params,
    data: data,
  })
    .then((res) => res.data as HTTPdata)
    .catch((err) => handleApiError(err));

/** DELETE */
export const apiDelete = (url: string, params?: object) =>
  api({
    method: 'DELETE',
    url: url,
    params: params,
  })
    .then((res) => res.data as HTTPdata)
    .catch((err) => handleApiError(err));

/** Error handler */
function handleApiError(err: any) {
  const HTTPdata = err.response.data as HTTPdata;
  switch (err.response.status) {
    case STATUS_CODE.UNAUTHORIZED:
      window.location.replace('/auth/logout');
      showSnackBarAlert(60000, 'error', MESSAGE.HTTP.ERROR_401 + ' : ' + HTTPdata.message);
      break;
    case STATUS_CODE.PRECONDITION_FAILED:
      showSnackBarAlert(10000, 'error', MESSAGE.HTTP.ERROR_412 + ' : ' + HTTPdata.message);
      break;
    case STATUS_CODE.FORBIDDEN:
      showSnackBarAlert(10000, 'error', MESSAGE.HTTP.ERROR_403 + ' : ' + HTTPdata.message);
      break;
    case STATUS_CODE.NOT_FOUND:
      showSnackBarAlert(10000, 'error', MESSAGE.HTTP.ERROR_404 + ' : ' + HTTPdata.message);
      break;
    case STATUS_CODE.INTERNAL_SERVER_ERROR:
      showSnackBarAlert(10000, 'error', MESSAGE.HTTP.ERROR_500 + ' : ' + HTTPdata.message);
      break;
    default:
      showSnackBarAlert(10000, 'error', MESSAGE.HTTP.ERROR_500 + ' : ' + HTTPdata.message);
      break;
  }
  return HTTPdata;
}

export default api;
