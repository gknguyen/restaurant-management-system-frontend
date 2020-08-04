import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MenuType, Product, ProductType, User, UserType } from '../../../../../configs/interfaces';
import * as userActions from '../../../../../redux/reducers/userReducers/actions';
import * as userTypeActions from '../../../../../redux/reducers/userTypeReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    textField: {
      padding: '0 5px 10px 5px',
    },
    typography: {
      padding: '0 5px 5px 5px',
    },
  }),
);

const mainValues: any = {};

interface Props {
  userTypeList: UserType[];
  userType: UserType;
  user: User;
  errorMessages: User;
  sendUserType: Function;
  sendUsername: Function;
  sendPassword: Function;
  sendFullName: Function;
  sendAge: Function;
  sendPhoneNumber: Function;
  sendEmail: Function;
}

const MainInfoField: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const userTypeList = props.userTypeList;
  const errorMessages = props.errorMessages;
  console.log('errorMessages: ', errorMessages);

  const warningLayout = {
    userType: errorMessages.userTypeName ? true : false,
    username: errorMessages.username ? true : false,
    password: errorMessages.password ? true : false,
    fullName: errorMessages.fullName ? true : false,
    age: errorMessages.age ? true : false,
    phoneNumber: errorMessages.phoneNumber ? true : false,
    email: errorMessages.email ? true : false,
  };

  const mainDefaultValues = {
    userTypeName: props.user ? props.userType.typeName : null,
    username: props.user ? props.user.username : null,
    fullName: props.user ? props.user.fullName : null,
    age: props.user ? props.user.age : null,
    phoneNumber: props.user ? props.user.phoneNumber : null,
    email: props.user ? props.user.email : null,
  };
  // console.log('mainDefaultValues: ', mainDefaultValues);

  const [userTypeName, setUserTypeName] = React.useState(mainDefaultValues.userTypeName);

  const userTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserTypeName(event.target.value);
    const userType = {
      typeName: event.target.value,
    };
    props.sendUserType(userType);
  };
  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendUsername(event.target.value);
  };
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendPassword(event.target.value);
  };
  const fullNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendFullName(event.target.value);
  };
  const ageChangeHandler = (event: any) => {
    props.sendAge(event.target.value);
  };
  const phoneNumberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendPhoneNumber(event.target.value);
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendEmail(event.target.value);
  };

  return (
    <Grid className={classes.grid} container={true} item={true} xs={true}>
      <Grid container={true} item={true} xs={12} justify="flex-start">
        <Typography className={classes.typography} component="h1" variant="h6">
          Details:
        </Typography>
      </Grid>
      <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
        <TextField
          className={classes.textField}
          required={true}
          select={true}
          fullWidth={true}
          id="outlined-select-required"
          label="User Type"
          value={userTypeName}
          defaultValue={userTypeName}
          variant="outlined"
          margin="dense"
          onChange={userTypeChangeHandler}
          error={warningLayout.userType}
          helperText={errorMessages.userTypeName}
        >
          {userTypeList.map((userType) => (
            <MenuItem key={userType.id} value={userType.typeName}>
              {userType.typeName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Username"
        defaultValue={mainDefaultValues.username}
        variant="outlined"
        margin="dense"
        onChange={usernameChangeHandler}
        error={warningLayout.username}
        helperText={errorMessages.username}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Password"
        type="password"
        variant="outlined"
        margin="dense"
        onChange={passwordChangeHandler}
        error={warningLayout.password}
        helperText={errorMessages.password}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Full Name"
        defaultValue={mainDefaultValues.fullName}
        variant="outlined"
        margin="dense"
        onChange={fullNameChangeHandler}
        error={warningLayout.fullName}
        helperText={errorMessages.fullName}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Age"
        defaultValue={mainDefaultValues.age}
        variant="outlined"
        margin="dense"
        type="number"
        onChange={ageChangeHandler}
        error={warningLayout.age}
        helperText={errorMessages.age}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Phone Number"
        defaultValue={mainDefaultValues.phoneNumber}
        variant="outlined"
        margin="dense"
        onChange={phoneNumberChangeHandler}
        error={warningLayout.phoneNumber}
        helperText={errorMessages.phoneNumber}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Email"
        defaultValue={mainDefaultValues.email}
        variant="outlined"
        margin="dense"
        onChange={emailChangeHandler}
        error={warningLayout.email}
        helperText={errorMessages.email}
      />
    </Grid>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    userTypeList: state.userTypeReducer.userTypeList,
    userType: state.userTypeReducer.userType,
    user: state.userReducer.user,
    errorMessages: state.userReducer.errorMessages,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendUserType: (userType: UserType) => {
      dispatch(userTypeActions.actionReceiveUserType(userType));
    },
    sendUsername: (username: string) => {
      dispatch(userActions.actionReceiveUsernameValue(username));
    },
    sendPassword: (password: string) => {
      dispatch(userActions.actionReceivePasswordValue(password));
    },
    sendFullName: (fullName: string) => {
      dispatch(userActions.actionReceiveFullNameValue(fullName));
    },
    sendAge: (age: number) => {
      dispatch(userActions.actionReceiveAgeValue(age));
    },
    sendPhoneNumber: (phoneNumber: string) => {
      dispatch(userActions.actionReceivePhoneNumberValue(phoneNumber));
    },
    sendEmail: (email: string) => {
      dispatch(userActions.actionReceiveEmailValue(email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainInfoField);
