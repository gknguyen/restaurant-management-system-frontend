import { LoginForm } from '../../../configs/interfaces';

export const loginMessagesForm: any = {};

export const validate = (loginForm: LoginForm) => {
  let result = true;

  if (!loginForm.username) {
    loginMessagesForm.username = 'please input your username';
    result = false;
  } else {
    loginMessagesForm.username = '';
  }

  if (!loginForm.password) {
    loginMessagesForm.password = 'please input your password';
    result = false;
  } else {
    loginMessagesForm.password = '';
  }

  return result;
};
