import axios from 'axios';
import { MenuType } from '../../configs/interfaces';
import * as routes from '../../configs/APIs';
import * as ActionType from '../constants/actionTypes';

export const actionGetMenuTypeListUrl = () => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getListMenuTypeUrl,
    })
      .then((res) => {
        dispatch({
          type: ActionType.GET_MENU_TYPE_LIST,
          data: res.data.values,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionGetMenuTypeIdUrl = (menuTypeName: string) => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getOneMenuTypeUrl,
      params: { typeName: menuTypeName },
    })
      .then((res) => {
        dispatch({
          type: ActionType.GET_MENU_TYPE_ID,
          data: res.data.values.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionReceiveMenuType = (menuType: MenuType) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_MENU_TYPE,
      data: menuType,
    });
  };
};
