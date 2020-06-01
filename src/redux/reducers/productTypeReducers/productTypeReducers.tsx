import * as ActionType from '../constant';

const initialState = {
  productTypeList: [],
  productType: {
    id: '',
    typeName: '',
  },
};

const productTypeReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return product type list */
    case ActionType.GET_PRODUCT_TYPE_LIST:
      state.productTypeList = action.data;
      return { ...state };
    /* return product type */
    case ActionType.GET_PRODUCT_TYPE:
      state.productType = action.data;
      return { ...state };
    /* return product type id */
    case ActionType.GET_PRODUCT_TYPE_ID:
      state.productType.id = action.data;
      return { ...state };
    /* return product type */
    case ActionType.RECEIVE_PRODUCT_TYPE:
      state.productType.id = action.data.id;
      state.productType.typeName = action.data.typeName;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default productTypeReducer;
