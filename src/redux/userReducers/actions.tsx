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
