import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import clsx from 'clsx';
import STATUS_CODE from 'http-status';
import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../configs/APIs';
import { authPost } from '../../../configs/axios';
import { loginInputType } from '../../../configs/inputType';
import { HTTPdata, User, UserInfo } from '../../../configs/interfaces';
import * as commonActions from '../../../redux/commonReducers/actions';
import * as userActions from '../../../redux/userReducers/actions';
import { loginMessagesForm, validate } from './validate';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '110px 0px 110px 0px',
    height: '88vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // background: 'linear-gradient(45deg, #4e342e 30%, #a1887f 90%)',
    margin: theme.spacing(0, 0, 2),
  },
  errorFieldHidden: {
    textAlign: 'center',
  },
  errorField: {
    textAlign: 'center',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9e7e7',
  },
  error: {
    color: '#e93c84',
    fontSize: '13px',
  },
  floatRight: {
    float: 'right',
  },
  progress: {
    width: '100%',
    padding: 10,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const loginForm: any = {};

interface Props {
  /** params */
  isDisable: boolean;
  /** functions */
  sendLoginUserData: Function;
  sendDisableFlag: Function;
}

const Login: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorMessageUsername, setErrorMessageUsername] = React.useState('');
  const [errorMessagePassword, setErrorMessagePassword] = React.useState('');

  React.useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const submitLoginForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.sendDisableFlag(true);

    if (validate(loginForm)) {
      const HTTPdata = (await authPost(APIs.loginUrl, loginForm)) as HTTPdata;
      if (HTTPdata.code === STATUS_CODE.OK) {
        const token = HTTPdata.values.token as string;
        const userInfo = HTTPdata.values.userInfo as UserInfo;

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        history.push('/home');
        window.location.reload();
      } else {
        props.sendDisableFlag(false);
      }
    } else {
      setErrorMessageUsername(loginMessagesForm.username);
      setErrorMessagePassword(loginMessagesForm.password);
      props.sendDisableFlag(false);
    }
  };

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name.toString();
    const value = event.target.value.toString();
    loginForm[name] = value;
    validateEach(name);
  };

  const validateEach = (name: string) => {
    setErrorMessage('');
    switch (name) {
      case loginInputType.username:
        setErrorMessageUsername('');
        break;
      case loginInputType.password:
        setErrorMessagePassword('');
        break;
      default:
        break;
    }
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        {/** header */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/** input */}
        <form className={classes.form} noValidate={true} onSubmit={submitLoginForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="username"
            name="username"
            label="username"
            type="text"
            autoComplete="username"
            autoFocus={true}
            onChange={onInputChangeHandler}
            error={errorMessageUsername ? true : false}
            helperText={errorMessageUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="password"
            name="password"
            label="password"
            type="password"
            autoComplete="current-password"
            onChange={onInputChangeHandler}
            error={errorMessagePassword ? true : false}
            helperText={errorMessagePassword}
          />

          {/** check box remember me */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          {/** error message */}
          <Box className={errorMessage ? classes.errorField : classes.errorFieldHidden}>
            <span id="loginResult" className={classes.error}>
              {errorMessage}
            </span>
          </Box>

          {/** submit button */}
          <input
            id="login-button"
            type="submit"
            style={{ display: 'none' }}
            disabled={props.isDisable}
          />
          <label htmlFor="login-button">
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              component="span"
              className={classes.submit}
              disabled={props.isDisable}
            >
              {!props.isDisable ? (
                'Sign In'
              ) : (
                <Box className={clsx(classes.submit && classes.progress)}>
                  <LinearProgress />
                </Box>
              )}
            </Button>
          </label>

          {/** other links */}
          <Grid container={true}>
            <Grid item={true} xs={12}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item={true} xs={12}>
              <Link href="#" variant="body2">
                Don't have an account? Contact admin for new account
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendLoginUserData: (loginUser: User) => {
      dispatch(userActions.actionReceiveLoginUserData(loginUser));
    },
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
