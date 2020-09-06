export const errorMessagesForm: any = {};

export const checkValidate = (createDataForm: any, create: boolean) => {
  let results = true;

  if (!createDataForm.userTypeName) {
    errorMessagesForm.userTypeName = 'please select user type';
    results = false;
  } else {
    errorMessagesForm.userTypeName = null;
  }

  if (!createDataForm.username) {
    errorMessagesForm.username = 'please input username';
    results = false;
  } else {
    errorMessagesForm.username = null;
  }

  if (!createDataForm.fullName) {
    errorMessagesForm.fullName = 'please input full name';
    results = false;
  } else {
    errorMessagesForm.fullName = null;
  }

  if (!createDataForm.age) {
    errorMessagesForm.age = 'please input age';
    results = false;
  } else {
    errorMessagesForm.age = null;
  }

  if (!createDataForm.phoneNumber) {
    errorMessagesForm.phoneNumber = 'please input phone number';
    results = false;
  } else {
    errorMessagesForm.phoneNumber = null;
  }

  if (!createDataForm.email) {
    errorMessagesForm.email = 'please input email';
    results = false;
  } else {
    errorMessagesForm.email = null;
  }

  if (create) {
    if (!createDataForm.avatar) {
      errorMessagesForm.avatar = 'please select avatar';
      results = false;
    } else {
      errorMessagesForm.avatar = null;
    }

    if (!createDataForm.password) {
      errorMessagesForm.password = 'please input password';
      results = false;
    } else {
      errorMessagesForm.password = null;
    }
  }

  return results;
};
