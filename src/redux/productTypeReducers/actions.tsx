import { ProductType } from '../../configs/interfaces';
import * as ActionType from '../constant';

export const actionReceiveProductTypeList = (productTypeList: ProductType[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_TYPE_LIST,
      data: productTypeList,
    });
  };
};

export const actionReceiveProductType = (productType: ProductType) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_TYPE,
      data: productType,
    });
  };
};
