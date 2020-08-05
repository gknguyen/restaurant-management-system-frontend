import { trimDate } from '../../components/utils/utils';
import * as routes from '../../configs/APIs';
import Axios from '../../configs/axios';
import { User, UserHeadCell } from '../../configs/interfaces';
import * as ActionType from '../constant';

export const actionReceiveLoginUserData = (loginUser: User) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_LOGIN_USER_DATA,
      data: loginUser,
    });
  };
};

export const actionGetUserListUrl = () => {
  return (dispatch: any) => {
    Axios({
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
            loginDatetime: serverUser.loginDatetime ? trimDate(serverUser.loginDatetime, 20) : null,
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
    Axios({
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

export const actionReceiveUsernameValue = (username: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_USERNAME,
      data: username,
    });
  };
};

export const actionReceivePasswordValue = (password: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_PASSWORD,
      data: password,
    });
  };
};

export const actionReceiveFullNameValue = (fullName: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_FULLNAME,
      data: fullName,
    });
  };
};

export const actionReceiveAgeValue = (age: number) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_AGE,
      data: age,
    });
  };
};

export const actionReceivePhoneNumberValue = (phoneNumber: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_PHONENUMBER,
      data: phoneNumber,
    });
  };
};

export const actionReceiveEmailValue = (email: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_EMAIL,
      data: email,
    });
  };
};

export const actionReceiveErrorMessages = (errorMessages: User) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES,
      data: errorMessages,
    });
  };
};

export const actionReceiveErrorMessageUsername = (usernameErrorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES_USERNAME,
      data: usernameErrorMessage,
    });
  };
};

export const actionReceiveErrorMessagePassword = (passwordErrorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES_PASSWORD,
      data: passwordErrorMessage,
    });
  };
};

export const actionReceiveErrorMessageFullName = (fullNameErrorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES_FULLNAME,
      data: fullNameErrorMessage,
    });
  };
};

export const actionReceiveErrorMessageAge = (ageErrorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES_AGE,
      data: ageErrorMessage,
    });
  };
};

export const actionReceiveErrorMessagePhone = (phoneErrorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES_PHONE,
      data: phoneErrorMessage,
    });
  };
};

export const actionReceiveErrorMessageEmail = (emailErrorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES_EMAIL,
      data: emailErrorMessage,
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
