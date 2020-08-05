import * as ActionType from '../constant';

const initialState = {
  menuTypeList: [],
  menuType: {
    id: '',
    typeName: '',
  },
};

const menuTypeReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return menu type list */
    case ActionType.GET_MENU_TYPE_LIST:
      state.menuTypeList = action.data;
      return { ...state };
    /* return menu type */
    case ActionType.GET_MENU_TYPE:
      state.menuType = action.data;
      return { ...state };
    /* return menu type id */
    case ActionType.GET_MENU_TYPE_ID:
      state.menuType.id = action.data;
      return { ...state };
    /* return product type */
    case ActionType.RECEIVE_MENU_TYPE:
      state.menuType.id = action.data.id;
      state.menuType.typeName = action.data.typeName;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default menuTypeReducer;
