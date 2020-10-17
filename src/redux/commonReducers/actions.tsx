import * as ActionType from '../constant';

export const actionDisableFlag = (isDisable: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_DISABLE_FLAG,
      data: isDisable,
    });
  };
};

export const actionReceiveNavBarOpenFlag = (navBarOpenFlag: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_NAVBAR_OPEN_FLAG,
      data: navBarOpenFlag,
    });
  };
};

export const actionReceiveSearchValue = (searchValue: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_SEARCH_VALUE,
      data: searchValue,
    });
  };
};

export const actionDisableCartButton = (disableCartButton: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_DISABLE_CART_BUTTON,
      data: disableCartButton,
    });
  };
};

export const actionDisableOrderButton = (disableOrderButton: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_DISABLE_ORDER_BUTTON,
      data: disableOrderButton,
    });
  };
};

export const actionLoadUnpaidOrderList = (loadUnpaidOrderList: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.LOAD_UNPAID_ORDER_LIST,
      data: loadUnpaidOrderList,
    });
  };
};
