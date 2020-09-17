import { MenuType } from '../../configs/interfaces';
import * as ActionType from '../constant';

export const actionReceiveMenuTypeList = (menuTypeList: MenuType[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_MENU_TYPE_LIST,
      data: menuTypeList,
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
