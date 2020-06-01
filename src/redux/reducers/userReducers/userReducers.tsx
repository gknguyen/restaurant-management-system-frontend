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
    phoneNumber: 0,
    email: '',
    avatar: '',
    loginDatetime: '',
    authToken: '',
    activeStatus: false,
  },
  errorMessages: {
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
    /* return user table head cells */
    case ActionType.RECEIVE_USER_TABLE_HEAD_CELLS:
      state.headCells = action.data;
      return { ...state };
    /* return user list */
    case ActionType.GET_USER_LIST:
      state.userList = action.data;
      return { ...state };
    /* return user */
    case ActionType.GET_USER:
      state.user = action.data;
      return { ...state };
    /* return user id list value */
    case ActionType.RECEIVE_USER_ID_LIST:
      state.userIdList = action.data;
      return { ...state };
    /* return user values */
    case ActionType.RECEIVE_USER:
      state.user.username = action.data.username;
      state.user.password = action.data.password;
      state.user.fullName = action.data.fullName;
      state.user.age = action.data.age;
      state.user.phoneNumber = action.data.phoneNumber;
      state.user.email = action.data.email;
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
