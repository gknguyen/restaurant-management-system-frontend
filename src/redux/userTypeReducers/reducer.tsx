import * as ActionType from '../constant';

const initialState = {
  userTypeList: [],
  userType: {
    id: '',
    typeName: '',
  },
};

const userTypeReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return user type list */
    case ActionType.GET_USER_TYPE_LIST:
      state.userTypeList = action.data;
      return { ...state };
    /* return user type */
    case ActionType.GET_USER_TYPE:
      state.userType = action.data;
      return { ...state };
    /* return user type id */
    case ActionType.GET_USER_TYPE_ID:
      state.userType.id = action.data;
      return { ...state };
    /* return user type list */
    case ActionType.RECEIVE_USER_TYPE_LIST:
      state.userTypeList = action.data;
      return { ...state };
    /* return user type */
    case ActionType.RECEIVE_USER_TYPE:
      state.userType.id = action.data.id;
      state.userType.typeName = action.data.typeName;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default userTypeReducer;
