import * as ActionType from '../constant';

export const actionReceiveImageFiles = (imageFile: File) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_IMAGE_FILES,
      data: imageFile,
    });
  };
};

export const actionReceiveErrorMessage = (errorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_IMAGE_ERROR_MESSAGE,
      data: errorMessage,
    });
  };
};
