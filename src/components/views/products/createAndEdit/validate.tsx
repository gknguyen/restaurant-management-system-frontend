export const errorMessagesForm: any = {};

export const checkValidate = (createDataForm: any, create: boolean) => {
  let result = true;

  if (!createDataForm.productTypeName) {
    errorMessagesForm.productTypeName = 'please select product type';
    result = false;
  } else {
    errorMessagesForm.productTypeName = null;
  }

  if (!createDataForm.menuTypeName) {
    errorMessagesForm.menuTypeName = 'please select menu type';
    result = false;
  } else {
    errorMessagesForm.menuTypeName = null;
  }

  if (!createDataForm.name) {
    errorMessagesForm.name = 'please input product name';
    result = false;
  } else {
    errorMessagesForm.name = null;
  }

  if (!createDataForm.price) {
    errorMessagesForm.price = 'please input product price';
    result = false;
  } else {
    errorMessagesForm.price = null;
  }

  if (!createDataForm.unit) {
    errorMessagesForm.unit = 'please input product unit';
    result = false;
  } else {
    errorMessagesForm.unit = null;
  }

  if (!createDataForm.amount) {
    errorMessagesForm.amount = 'please input product amount';
    result = false;
  } else {
    errorMessagesForm.amount = null;
  }

  if (create) {
    if (!createDataForm.image) {
      errorMessagesForm.image = 'please select product image';
      result = false;
    } else {
      errorMessagesForm.image = null;
    }
  }

  return result;
};
