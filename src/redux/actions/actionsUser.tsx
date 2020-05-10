import axios from 'axios';
import { trimDate } from '../../components/utils/utils';
import * as routes from '../../configs/APIs';
import { User, UserHeadCell } from '../../configs/interfaces';
import * as ActionType from '../constants/actionTypes';

export const actionReceiveLoginUserData = (loginUser: any) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_LOGIN_USER_DATA,
      data: loginUser,
    });
  };
};

export const actionGetUserListUrl = () => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getListUserUrl,
    })
      .then((res) => {
        const userList: User[] = [];
        const serverUserList: any[] = res.data.values;
        // console.log('serverUserList: ', serverUserList);
        serverUserList.forEach((serverUser) => {
          console.log('serverUser: ', serverUser);
          const user = {
            id: serverUser.id ? serverUser.id : null,
            username: serverUser.username ? serverUser.username : null,
            fullName: serverUser.fullName ? serverUser.fullName : null,
            phoneNumber: serverUser.phoneNumber ? serverUser.phoneNumber : null,
            email: serverUser.email ? serverUser.email : null,
            activeStatus: serverUser.activeStatus ? serverUser.activeStatus : null,
            loginDatetime: serverUser.loginDatetime
              ? trimDate(serverUser.loginDatetime, 20)
              : null,
            userTypeName: serverUser.userType ? serverUser.userType.typeName : null,
          } as User;
          console.log('user: ', user);
          userList.push(user);
        });
        // console.log('userList: ', userList);
        dispatch({
          type: ActionType.GET_USER_LIST,
          data: userList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionSearchUserListUrl = (searchValue: string) => {};

export const actionGetUserUrl = (userId: string) => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getOneUserUrl,
      params: { userId },
    })
      .then((res) => {
        const serverUser: any = res.data.values;
        const user = {
          id: serverUser.id ? serverUser.id : null,
          username: serverUser.username ? serverUser.username : null,
          fullName: serverUser.fullName ? serverUser.fullName : null,
          age: serverUser.age ? serverUser.age : null,
          phoneNumber: serverUser.phoneNumber ? serverUser.phoneNumber : null,
          email: serverUser.email ? serverUser.email : null,
          avatar: serverUser.avatar ? serverUser.avatar : null,
          loginDatetime: serverUser.loginDatetime ? serverUser.loginDatetime : null,
          activeStatus: serverUser.activeStatus ? serverUser.activeStatus : null,
        } as User;
        dispatch({
          type: ActionType.GET_USER,
          data: user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionReceiveUserTableHeadCells = (headCells: UserHeadCell[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_TABLE_HEAD_CELLS,
      data: headCells,
    });
  };
};

export const actionReceiveUser = (user: User) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER,
      data: user,
    });
  };
};

export const actionReceiveUserIdList = (userIdList: string[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ID_LIST,
      data: userIdList,
    });
  };
};

export const actionReceiveEditOpenFlag = (open: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_EDIT_OPEN_FLAG,
      data: open,
    });
  };
};
