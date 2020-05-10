import * as ActionType from '../../constants/actionTypes';

const initialState = {
  loginUser: {},
  headCells: [],
  userList: [],
  user: {
    id: '',
    username: '',
    fullName: '',
    age: 0,
    phoneNumber: 0,
    email: '',
    avatar: '',
    loginDatetime: '',
    authToken: '',
    activeStatus: false,
  },
};

const userReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return login user data */
    case ActionType.RECEIVE_LOGIN_USER_DATA:
      state.loginUser = action.data;
      return { ...state };
    /* return user table head cells */
    case ActionType.RECEIVE_USER_TABLE_HEAD_CELLS:
      state.headCells = action.data;
      return { ...state };
    /* return user list */
    case ActionType.GET_USER_LIST:
      state.userList = action.data;
      return { ...state };
    /* return product */
    case ActionType.GET_USER:
      state.user = action.data;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default userReducer;
