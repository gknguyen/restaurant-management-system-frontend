import { UserType } from '../../configs/interfaces';
import * as ActionType from '../constant';

export const actionReceiveUserTypeList = (userTypeList: UserType[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_TYPE_LIST,
      data: userTypeList,
    });
  };
};

export const actionReceiveUserType = (userType: UserType) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_TYPE,
      data: userType,
    });
  };
};
