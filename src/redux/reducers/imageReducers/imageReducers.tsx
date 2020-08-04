import * as ActionType from '../constant';

const initialState = {
  imageFile: {},
  errorMessage: '',
};

const imageReducer = (state = initialState, action: any) => {
  /* type - check type of action send to Reducer */
  switch (action.type) {
    /* return image files */
    case ActionType.RECEIVE_IMAGE_FILES:
      state.imageFile = action.data;
      return { ...state };
    /* return image error message */
    case ActionType.RECEIVE_IMAGE_ERROR_MESSAGE:
      state.errorMessage = action.data;
      return { ...state };
    /* return to new state */
    default:
      return { ...state };
  }
};

export default imageReducer;
