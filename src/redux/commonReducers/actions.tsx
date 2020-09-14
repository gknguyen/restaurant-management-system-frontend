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
