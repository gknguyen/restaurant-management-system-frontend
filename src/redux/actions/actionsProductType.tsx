import axios from 'axios';
import { Product, ProductType } from '../../configs/interfaces';
import * as routes from '../../configs/APIs';
import * as ActionType from '../constants/actionTypes';

export const actionGetProductTypeListUrl = () => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getListProductTypeUrl,
    })
      .then((res) => {
        dispatch({
          type: ActionType.GET_PRODUCT_TYPE_LIST,
          data: res.data.values,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionGetProductTypeIdUrl = (productTypeName: string) => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getOneProductTypeUrl,
      params: { typeName: productTypeName },
    })
      .then((res) => {
        dispatch({
          type: ActionType.GET_PRODUCT_TYPE_ID,
          data: res.data.values.id,
        });
      })
      .catch((err) => {
        console.log(err);
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
