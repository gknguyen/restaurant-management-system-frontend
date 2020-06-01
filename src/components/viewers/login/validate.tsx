import { loginInputType } from '../../../configs/inputType';
import { LoginForm } from '../../../configs/interfaces';

interface Results {
  flag: boolean;
  errorMessagesForm: LoginForm;
}

export const validate = (loginForm: LoginForm) => {
  const results = {
    flag: true,
    errorMessagesForm: {},
  } as Results;

  if (!loginForm.username) {
    results.errorMessagesForm.username = 'please input your username';
    results.flag = false;
  } else {
    results.errorMessagesForm.username = '';
  }

  if (!loginForm.password) {
    results.errorMessagesForm.password = 'please input your password';
    results.flag = false;
  } else {
    results.errorMessagesForm.password = '';
  }

  return results;
};
