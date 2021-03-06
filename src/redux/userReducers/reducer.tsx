import * as ActionType from '../constant';

const initialState = {
  loginUser: {},
  searchValue: '',
  headCells: [],
  userList: [],
  userIdList: [],
  user: {
    id: '',
    username: '',
    password: '',
    fullName: '',
    age: 0,
    phoneNumber: '',
    email: '',
    avatar: '',
    loginDateTime: '',
    authToken: '',
    activeStatus: false,
  },
  errorMessages: {
    userTypeName: '',
    username: '',
    password: '',
    fullName: '',
    age: '',
    phoneNumber: '',
    email: '',
    avatar: '',
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
    case ActionType.RECEIVE_USER_FULLNAME:
      state.user.fullName = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_AGE:
      state.user.age = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_PHONENUMBER:
      state.user.phoneNumber = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_EMAIL:
      state.user.email = action.data;
      return { ...state };
    /* return user error message */
    case ActionType.RECEIVE_USER_ERROR_MESSAGES:
      state.errorMessages = action.data;
      return { ...state };
    /* return each user error message */
    case ActionType.RECEIVE_USER_ERROR_MESSAGES_USERNAME:
      state.errorMessages.username = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_ERROR_MESSAGES_PASSWORD:
      state.errorMessages.password = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_ERROR_MESSAGES_FULLNAME:
      state.errorMessages.fullName = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_ERROR_MESSAGES_AGE:
      state.errorMessages.age = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_ERROR_MESSAGES_PHONE:
      state.errorMessages.phoneNumber = action.data;
      return { ...state };
    case ActionType.RECEIVE_USER_ERROR_MESSAGES_EMAIL:
      state.errorMessages.email = action.data;
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
