import * as ActionType from '../constant';

const initialState = {
  isDisable: false,
  navBarOpenFlag: true,
  searchValue: '',
};

const commonReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return disable flag */
    case ActionType.RECEIVE_DISABLE_FLAG:
      state.isDisable = action.data;
      return { ...state };
    /* return disable flag */
    case ActionType.RECEIVE_NAVBAR_OPEN_FLAG:
      state.navBarOpenFlag = action.data;
      return { ...state };
    /* return search value */
    case ActionType.RECEIVE_SEARCH_VALUE:
      state.searchValue = action.data;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default commonReducer;
