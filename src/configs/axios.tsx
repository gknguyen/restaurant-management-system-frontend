import axios from 'axios';
import { getAuthToken } from '../components/utils/localStore';

const token = getAuthToken();

const Axios = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: { token },
});

export default Axios;
