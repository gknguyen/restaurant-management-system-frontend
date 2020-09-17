import { Product, ProductHeadCell } from '../../configs/interfaces';
import * as ActionType from '../constant';

/* =============================================================================== */
/*
 receive product search value
*/
export const actionReceiveSearchValue = (searchValue: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_SEARCH_VALUE,
      data: searchValue,
    });
  };
};

/* =============================================================================== */
/*
 receive product list
*/
export const actionReceiveProductList = (productList: Product[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_LIST,
      data: productList,
    });
  };
};

/* =============================================================================== */
/*
 receive product id list
*/
export const actionReceiveProductIdList = (productIdList: string[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ID_LIST,
      data: productIdList,
    });
  };
};

/* =============================================================================== */
/*
 receive product all value
*/
export const actionReceiveProduct = (product: Product) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT,
      data: product,
    });
  };
};

/* =============================================================================== */
/*
 receive product each value
*/
export const actionReceiveNameValue = (name: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_NAME,
      data: name,
    });
  };
};

export const actionReceivePriceValue = (price: number) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_PRICE,
      data: price,
    });
  };
};

export const actionReceiveUnitValue = (unit: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_UNIT,
      data: unit,
    });
  };
};

export const actionReceiveAmountValue = (amount: number) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_AMOUNT,
      data: amount,
    });
  };
};

export const actionReceiveDescriptionValue = (description: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_DESCRIPTION,
      data: description,
    });
  };
};

/* =============================================================================== */
/*
 receive product error messages
*/
export const actionReceiveErrorMessages = (errorMessages: Product) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES,
      data: errorMessages,
    });
  };
};

/* =============================================================================== */
/*
 receive product each error message
*/
export const actionReceiveErrorMessageProductTypeName = (productTypeName: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES_PRODUCT_TYPE,
      data: productTypeName,
    });
  };
};

export const actionReceiveErrorMessageMenuTypeName = (menuTypeName: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES_MENU_TYPE,
      data: menuTypeName,
    });
  };
};

export const actionReceiveErrorMessageName = (name: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES_NAME,
      data: name,
    });
  };
};

export const actionReceiveErrorMessagePrice = (price: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES_PRICE,
      data: price,
    });
  };
};

export const actionReceiveErrorMessageUnit = (unit: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES_UNIT,
      data: unit,
    });
  };
};

export const actionReceiveErrorMessageAmount = (amount: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES_AMOUNT,
      data: amount,
    });
  };
};

/* =============================================================================== */
/*
 receive edit open flag
*/
export const actionReceiveEditOpenFlag = (open: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_EDIT_OPEN_FLAG,
      data: open,
    });
  };
};
