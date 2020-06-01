import * as routes from '../../../configs/APIs';
import Axios from '../../../configs/axios';
import { UserType } from '../../../configs/interfaces';
import * as ActionType from '../constant';

export const actionGetUserTypeListUrl = () => {
  return (dispatch: any) => {
    Axios({
      method: 'GET',
      url: routes.getListUserTypeUrl,
    })
      .then((res) => {
        dispatch({
          type: ActionType.GET_USER_TYPE_LIST,
          data: res.data.values,
        });
      })
      .catch((err) => {
        console.log(err);
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
