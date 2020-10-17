import * as ActionType from '../constant';

const initialState = {
  order: {
    no: 0,
    customer: {},
    orderDetails: [],
    finalPrice: 0,
  },
  orderDetail: {
    id: '',
    product: {
      name: '',
      price: 0,
      unit: '',
    },
    quantity: 0,
    totalPrice: 0,
  },
};

const orderReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return order */
    case ActionType.RECEIVE_ORDER:
      state.order = action.data;
      return { ...state };
    /* return order detail list */
    case ActionType.RECEIVE_ORDER_DETAIL_LIST:
      state.order.orderDetails = action.data;
      return { ...state };
    /* return order detail */
    case ActionType.RECEIVE_ORDER_DETAIL:
      state.orderDetail = action.data;
      return { ...state };
    /* return order detail */
    case ActionType.RECEIVE_ORDER_FINAL_PRICE:
      state.order.finalPrice = action.data;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default orderReducer;
