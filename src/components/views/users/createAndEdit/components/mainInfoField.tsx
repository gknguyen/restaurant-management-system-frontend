import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MenuType, Product, ProductType, User, UserType } from '../../../../../configs/interfaces';
import * as userActions from '../../../../../redux/userReducers/actions';
import * as userTypeActions from '../../../../../redux/userTypeReducers/actions';
import Container from '@material-ui/core/Container';

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
  /** input params */
  isEdit: boolean;
  /** redux params */
  userTypeList: UserType[];
  userType: UserType;
  user: User;
  errorMessages: User;
  isDisable: boolean;
  /** redux functions */
  sendUserType: Function;
  sendUsername: Function;
  sendPassword: Function;
  sendFullName: Function;
  sendAge: Function;
  sendPhoneNumber: Function;
  sendEmail: Function;
  sendErrorMessageUsername: Function;
  sendErrorMessagePassword: Function;
  sendErrorMessageFullName: Function;
  sendErrorMessageAge: Function;
  sendErrorMessagePhoneNumber: Function;
  sendErrorMessageEmail: Function;
}

const MainInfoField: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const mainDefaultValues = {
    userTypeName: props.user ? props.userType.typeName : null,
    username: props.user ? props.user.username : null,
    fullName: props.user ? props.user.fullName : null,
    age: props.user ? props.user.age : null,
    phoneNumber: props.user ? props.user.phoneNumber : null,
    email: props.user ? props.user.email : null,
  };

  const [userTypeName, setUserTypeName] = React.useState(mainDefaultValues.userTypeName);
  const [username, setUsername] = React.useState(mainDefaultValues.username);
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState(mainDefaultValues.fullName);
  const [age, setAge] = React.useState(mainDefaultValues.age);
  const [phoneNumber, setPhoneNumber] = React.useState(mainDefaultValues.phoneNumber);
  const [email, setEmail] = React.useState(mainDefaultValues.email);

  const userTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserTypeName(event.target.value);
    const userType = { typeName: event.target.value };
    props.sendUserType(userType);
  };
  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    props.sendUsername(event.target.value);
    props.sendErrorMessageUsername('');
  };
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    props.sendPassword(event.target.value);
    props.sendErrorMessagePassword('');
  };
  const fullNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
    props.sendFullName(event.target.value);
    props.sendErrorMessageFullName('');
  };
  const ageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value));
    props.sendAge(event.target.value);
    props.sendErrorMessageAge('');
  };
  const phoneNumberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    props.sendPhoneNumber(event.target.value);
    props.sendErrorMessagePhoneNumber('');
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    props.sendEmail(event.target.value);
    props.sendErrorMessageEmail('');
  };

  return (
    <Container className={classes.grid} disableGutters>
      {/** header */}
      <Grid container={true}>
        <Typography className={classes.typography} component="h1" variant="h6">
          Details:
        </Typography>
      </Grid>

      {/** contents */}
      <Grid container={true}>
        <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
          <TextField
            className={classes.textField}
            // required={true}
            select={true}
            fullWidth={true}
            id="outlined-select-required"
            label="User Type"
            value={userTypeName}
            defaultValue={userTypeName}
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
      </Grid>
      <Grid container={true}>
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Username"
          value={username}
          defaultValue={mainDefaultValues.username}
          variant="outlined"
          margin="dense"
          onChange={usernameChangeHandler}
          error={props.errorMessages.username ? true : false}
          helperText={props.errorMessages.username}
          disabled={props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Password"
          type="password"
          value={password}
          variant="outlined"
          margin="dense"
          onChange={passwordChangeHandler}
          error={props.errorMessages.password ? true : false}
          helperText={props.errorMessages.password}
          disabled={props.isEdit || props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Full Name"
          value={fullName}
          defaultValue={mainDefaultValues.fullName}
          variant="outlined"
          margin="dense"
          onChange={fullNameChangeHandler}
          error={props.errorMessages.fullName ? true : false}
          helperText={props.errorMessages.fullName}
          disabled={props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Age"
          value={age}
          defaultValue={mainDefaultValues.age}
          variant="outlined"
          margin="dense"
          type="number"
          onChange={ageChangeHandler}
          error={props.errorMessages.age ? true : false}
          helperText={props.errorMessages.age}
          disabled={props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Phone Number"
          value={phoneNumber}
          defaultValue={mainDefaultValues.phoneNumber}
          variant="outlined"
          margin="dense"
          type="number"
          onChange={phoneNumberChangeHandler}
          error={props.errorMessages.phoneNumber ? true : false}
          helperText={props.errorMessages.phoneNumber}
          disabled={props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Email"
          value={email}
          defaultValue={mainDefaultValues.email}
          variant="outlined"
          margin="dense"
          onChange={emailChangeHandler}
          error={props.errorMessages.email ? true : false}
          helperText={props.errorMessages.email}
          disabled={props.isDisable}
        />
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    userTypeList: state.userTypeReducer.userTypeList,
    userType: state.userTypeReducer.userType,
    user: state.userReducer.user,
    errorMessages: state.userReducer.errorMessages,
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    /** values */
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

    /** error messages */
    sendErrorMessageUsername: (usernameErrorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessageUsername(usernameErrorMessage));
    },
    sendErrorMessagePassword: (passwordErrorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessagePassword(passwordErrorMessage));
    },
    sendErrorMessageFullName: (fullNameErrorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessageFullName(fullNameErrorMessage));
    },
    sendErrorMessageAge: (ageErrorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessageAge(ageErrorMessage));
    },
    sendErrorMessagePhoneNumber: (phoneErrorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessagePhone(phoneErrorMessage));
    },
    sendErrorMessageEmail: (emailErrorMessage: string) => {
      dispatch(userActions.actionReceiveErrorMessageEmail(emailErrorMessage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainInfoField);
