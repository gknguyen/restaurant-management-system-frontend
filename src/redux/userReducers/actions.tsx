import { User } from '../../configs/interfaces';
import * as ActionType from '../constant';

export const actionReceiveLoginUserData = (loginUser: User) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_LOGIN_USER_DATA,
      data: loginUser,
    });
  };
};

export const actionReceiveUserList = (userList: User[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_LIST,
      data: userList,
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

export const actionReceiveUser = (user: User) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER,
      data: user,
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

export const actionReceiveErrorMessages = (errorMessagesForm: any) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGES,
      data: errorMessagesForm,
    });
  };
};

export const actionReceiveErrorMessagesUserType = (errorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGE_USER_TYPE,
      data: errorMessage,
    });
  };
};

export const actionReceiveErrorMessageUsername = (errorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGE_USERNAME,
      data: errorMessage,
    });
  };
};

export const actionReceiveErrorMessagePassword = (errorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_USER_ERROR_MESSAGE_PASSWORD,
      data: errorMessage,
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
