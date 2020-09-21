import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DraggableDialog from '../../../../commons/draggable';
import { User, UserType } from '../../../../configs/interfaces';
import * as commonActions from '../../../../redux/commonReducers/actions';
import * as userActions from '../../../../redux/userReducers/actions';
import * as userTypeActions from '../../../../redux/userTypeReducers/actions';
import { checkValidate, errorMessagesForm } from './validate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      width: '100%',
      height: '100%',
    },
    progressCircular: {
      // color: '#6798e5',
      animationDuration: '550ms',
    },
  }),
);

interface Props {
  /** params */
  open: boolean;
  /** functions */
  confirmHandlerCallBack: Function;
  closeHandlerCallBack: Function;
  /** redux params */
  isDisable: boolean;
  userTypeList: UserType[];
  userTypeName: string;
  errorMessages: User;
  username: string;
  password: string;
  /** redux functions */
  sendDisableFlag: Function;
  sendUserType: Function;
  sendUsername: Function;
  sendPassword: Function;
  sendErrorMessageUserType: Function;
  sendErrorMessageUsername: Function;
  sendErrorMessagePassword: Function;
  sendErrorMessageForm: Function;
}

const createUserForm: any = {};

const CreateUser: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {}, []);

  const userTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    createUserForm[name] = value;
    const userType = { typeName: value };
    props.sendUserType(userType);
    props.sendErrorMessageUserType('');
  };
  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    createUserForm[name] = value;
    props.sendUsername(event.target.value);
    props.sendErrorMessageUsername('');
  };
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    createUserForm[name] = value;
    props.sendPassword(event.target.value);
    props.sendErrorMessagePassword('');
  };

  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.sendDisableFlag(true);

    if (checkValidate(createUserForm)) {
      props.confirmHandlerCallBack(createUserForm);
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      props.sendDisableFlag(false);
    }
  };

  const closeHandler = () => {
    props.closeHandlerCallBack(false);
  };

  return (
    <Dialog
      className={classes.dialog}
      onClose={closeHandler}
      open={props.open}
      maxWidth="md"
      PaperComponent={DraggableDialog}
    >
      <form onSubmit={confirmHandler}>
        {/** header */}
        <DialogTitle id="draggable-dialog-title">
          <Typography component="h1" variant="h5">
            Add New User
          </Typography>
        </DialogTitle>

        {/** contents */}
        <DialogContent>
          <Grid container item xs={6}>
            <TextField
              select={true}
              fullWidth={true}
              label="User Type"
              name="userTypeName"
              value={props.userTypeName}
              defaultValue={props.userTypeName}
              variant="outlined"
              margin="dense"
              onChange={userTypeChangeHandler}
              error={props.errorMessages.userTypeName ? true : false}
              helperText={props.errorMessages.userTypeName}
              disabled={props.isDisable}
            >
              {props.userTypeList.map((userType) => (
                <MenuItem key={userType.id} value={userType.typeName}>
                  {userType.typeName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <TextField
            fullWidth={true}
            label="Username"
            name="username"
            value={props.username}
            variant="outlined"
            margin="dense"
            onChange={usernameChangeHandler}
            error={props.errorMessages.username ? true : false}
            helperText={props.errorMessages.username}
            disabled={props.isDisable}
          />
          <TextField
            fullWidth={true}
            label="Password"
            type="password"
            name="password"
            value={props.password}
            variant="outlined"
            margin="dense"
            onChange={passwordChangeHandler}
            error={props.errorMessages.password ? true : false}
            helperText={props.errorMessages.password}
            disabled={props.isDisable}
          />
        </DialogContent>
        <DialogActions>
          <input
            id="create-button"
            type="submit"
            style={{ display: 'none' }}
            disabled={props.isDisable}
          />
          <label htmlFor="create-button">
            <Button color="primary" component="span" disabled={props.isDisable}>
              Confirm
            </Button>
          </label>
          <Button color="primary" onClick={closeHandler} disabled={props.isDisable}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    isDisable: state.commonReducer.isDisable,
    userTypeList: state.userTypeReducer.userTypeList,
    userTypeName: state.userTypeReducer.userType.typeName,
    errorMessages: state.userReducer.errorMessages,
    username: state.userReducer.user.username,
    password: state.userReducer.user.password,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
    sendUserType: (userType: UserType) => {
      dispatch(userTypeActions.actionReceiveUserType(userType));
    },
    sendUsername: (username: string) => {
      dispatch(userActions.actionReceiveUsernameValue(username));
    },
    sendPassword: (password: string) => {
      dispatch(userActions.actionReceivePasswordValue(password));
    },
    sendErrorMessageUserType: (errorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessagesUserType(errorMessage));
    },
    sendErrorMessageUsername: (errorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessageUsername(errorMessage));
    },
    sendErrorMessagePassword: (errorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessagePassword(errorMessage));
    },
    sendErrorMessageForm: (errorMessagesForm: any) => {
      dispatch(userActions.actionReceiveErrorMessages(errorMessagesForm));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
