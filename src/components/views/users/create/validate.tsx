export const errorMessagesForm: any = {};

export const checkValidate = (dataForm: any) => {
  let results = true;

  if (!dataForm.userTypeName) {
    errorMessagesForm.userTypeName = 'please select user type';
    results = false;
  } else {
    errorMessagesForm.userTypeName = null;
  }

  if (!dataForm.username) {
    errorMessagesForm.username = 'please input username';
    results = false;
  } else {
    errorMessagesForm.username = null;
  }

  if (!dataForm.password) {
    errorMessagesForm.password = 'please input password';
    results = false;
  } else {
    errorMessagesForm.password = null;
  }

  return results;
};
