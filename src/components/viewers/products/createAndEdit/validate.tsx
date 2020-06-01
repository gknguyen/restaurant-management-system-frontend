export const errorMessagesForm: any = {};

export const checkValidate = (createDataForm: any, create: boolean) => {
    let results = true;

    if (!createDataForm.productTypeName) {
      errorMessagesForm.productTypeName = 'please select product type';
      results = false;
    } else {
      errorMessagesForm.productTypeName = null;
    }

    if (!createDataForm.menuTypeName) {
      errorMessagesForm.menuTypeName = 'please select menu type';
      results = false;
    } else {
      errorMessagesForm.menuTypeName = null;
    }

    if (!createDataForm.name) {
      errorMessagesForm.name = 'please input product name';
      results = false;
    } else {
      errorMessagesForm.name = null;
    }

    if (!createDataForm.price) {
      errorMessagesForm.price = 'please input product price';
      results = false;
    } else {
      errorMessagesForm.price = null;
    }

    if (!createDataForm.unit) {
      errorMessagesForm.unit = 'please input product unit';
      results = false;
    } else {
      errorMessagesForm.unit = null;
    }

    if (!createDataForm.amount) {
      errorMessagesForm.amount = 'please input product amount';
      results = false;
    } else {
      errorMessagesForm.amount = null;
    }

    if (create) {
      if (!createDataForm.image) {
        errorMessagesForm.image = 'please select product image';
        results = false;
      } else {
        errorMessagesForm.image = null;
      }
    }

    return results;
  };