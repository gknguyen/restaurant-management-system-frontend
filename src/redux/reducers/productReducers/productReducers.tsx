import * as ActionType from '../../constants/actionTypes';

const initialState = {
  searchValue: '',
  headCells: [],
  productList: [],
  productIdList: [],
  product: {
    id: '',
    name: '',
    price: 0,
    unit: '',
    amount: 0,
    active: false,
    image: '',
    description: '',
  },
  errorMessages: {},
  open: false,
};

const productReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return product table head cells */
    case ActionType.RECEIVE_PRODUCT_SEARCH_VALUE:
      state.searchValue = action.data;
      return { ...state };
    /* return product table head cells */
    case ActionType.RECEIVE_PRODUCT_TABLE_HEAD_CELLS:
      state.headCells = action.data;
      return { ...state };
    /* return product list */
    case ActionType.GET_PRODUCT_LIST:
      state.productList = action.data;
      return { ...state };
    /* return product */
    case ActionType.GET_PRODUCT:
      state.product = action.data;
      return { ...state };
    /* return product main values */
    case ActionType.RECEIVE_PRODUCT:
      state.product.name = action.data.name;
      state.product.price = action.data.price;
      state.product.unit = action.data.unit;
      state.product.amount = action.data.amount;
      state.product.image = action.data.image;
      state.product.description = action.data.description;
      return { ...state };
    /* return product id list value */
    case ActionType.RECEIVE_PRODUCT_ID_LIST:
      state.productIdList = action.data;
      return { ...state };
    /* return product name value */
    case ActionType.RECEIVE_PRODUCT_NAME:
      state.product.name = action.data;
      return { ...state };
    /* return product price value */
    case ActionType.RECEIVE_PRODUCT_PRICE:
      state.product.price = action.data;
      return { ...state };
    /* return product unit value */
    case ActionType.RECEIVE_PRODUCT_UNIT:
      state.product.unit = action.data;
      return { ...state };
    /* return product amount value */
    case ActionType.RECEIVE_PRODUCT_AMOUNT:
      state.product.amount = action.data;
      return { ...state };
    /* return product description value */
    case ActionType.RECEIVE_PRODUCT_DESCRIPTION:
      state.product.description = action.data;
      return { ...state };
    /* return product error message */
    case ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES:
      state.errorMessages = action.data;
      return { ...state };
    /* return edit open flag */
    case ActionType.RECEIVE_PRODUCT_EDIT_OPEN_FLAG:
      state.open = action.data;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default productReducer;
