import * as ActionType from '../constant';
import { OrderDetail, Order } from '../../configs/interfaces';

export const actionReceiveOrder = (order: Order) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_ORDER,
      data: order,
    });
  };
};

export const actionReceiveOrderDetailList = (orderDetailList: OrderDetail[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_ORDER_DETAIL_LIST,
      data: orderDetailList,
    });
  };
};

export const actionReceiveOrderDetail = (orderDetail: OrderDetail) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_ORDER_DETAIL,
      data: orderDetail,
    });
  };
};

export const actionReceiveOrderFinalPrice = (price: number) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_ORDER_FINAL_PRICE,
      data: price,
    });
  };
};
