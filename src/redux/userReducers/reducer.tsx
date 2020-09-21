import * as ActionType from '../constant';

const initialState = {
  loginUser: {},
  searchValue: '',
  userList: [],
  userIdList: [],
  user: {
    id: '',
    username: '',
    password: '',
    loginDateTime: '',
    authToken: '',
    activeStatus: false,
  },
  errorMessages: {
    userTypeName: '',
    username: '',
    password: '',
  },
  open: false,
};

const userReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return login user data */
    case ActionType.RECEIVE_LOGIN_USER_DATA:
      state.loginUser = action.data;
      return { ...state };
    /* return user search value */
    case ActionType.RECEIVE_USER_SEARCH_VALUE:
      state.searchValue = action.data;
      return { ...state };
    /* return user list value */
    case ActionType.RECEIVE_USER_LIST:
      state.userList = action.data;
      return { ...state };
    /* return user id list value */
    case ActionType.RECEIVE_USER_ID_LIST:
      state.userIdList = action.data;
      return { ...state };
    /* return user values */
    case ActionType.RECEIVE_USER:
      state.user = action.data;
      return { ...state };
    /* return each user value */
    case ActionType.RECEIVE_USER_USERNAME:
      state.user.username = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_PASSWORD:
      state.user.password = action.data;
      return { ...state };
    /* return user error message */
    case ActionType.RECEIVE_USER_ERROR_MESSAGES:
      state.errorMessages = action.data;
      return { ...state };
    /* return each user error message */
    case ActionType.RECEIVE_USER_ERROR_MESSAGE_USER_TYPE:
      state.errorMessages.userTypeName = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_ERROR_MESSAGE_USERNAME:
      state.errorMessages.username = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_ERROR_MESSAGE_PASSWORD:
      state.errorMessages.password = action.data;
      return { ...state };
    /* return edit open flag */
    case ActionType.RECEIVE_USER_EDIT_OPEN_FLAG:
      state.open = action.data;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default userReducer;
