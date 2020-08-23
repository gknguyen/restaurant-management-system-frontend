import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout: React.FC = () => {
  sessionStorage.clear();
  localStorage.clear();

  const history = useHistory();
  history.push('/auth/login');

  return <div />;
};

export default Logout;
