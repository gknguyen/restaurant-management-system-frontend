import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { ChangeEvent, useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../configs/APIs';
import Axios from '../../../configs/axios';
import { loginInputType } from '../../../configs/inputType';
import { LoginForm, User } from '../../../configs/interfaces';
import * as userActions from '../../../redux/userReducers/actions';
import { validate } from './validate';
import STATUS_CODE from 'http-status';
import { HTTPdata } from '../../../configs/interfaces';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';

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
  sendLoginUserData: Function;
}

const Login: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageUsername, setErrorMessageUsername] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitLoginForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const results = validate(loginForm);
    if (results.flag === true) {
      Axios({
        method: 'POST',
        url: APIs.loginUrl,
        data: loginForm,
      })
        .then((res) => {
          const HTTPdata = res.data as HTTPdata;
          const token = HTTPdata.values as string;
          sessionStorage.setItem('token', JSON.stringify(token));
          history.push('/admin/home');
        })
        .catch((err) => {
          const HTTPdata = err.response.data as HTTPdata;
          setErrorMessage(HTTPdata.message);
          setIsLoading(false);
        });
    } else {
      setErrorMessageUsername(results.errorMessagesForm.username);
      setErrorMessagePassword(results.errorMessagesForm.password);
      setIsLoading(false);
    }
  };

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name.toString();
    const value = event.target.value.toString();
    loginForm[name] = value;
    // console.log('loginForm[' + name + ']: ' + name);
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
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

          {/** error message */}
          <Box className={errorMessage ? classes.errorField : classes.errorFieldHidden}>
            <span id="loginResult" className={classes.error}>
              {errorMessage}
            </span>
          </Box>

          {/** submit button */}
          <input id="login-button" type="submit" style={{ display: 'none' }} />
          <label htmlFor="login-button">
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              component="span"
              className={classes.submit}
              disabled={isLoading}
            >
              {isLoading === false ? (
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
                {"Don't have an account? Contact admin for new account"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendLoginUserData: (loginUser: User) => {
      dispatch(userActions.actionReceiveLoginUserData(loginUser));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
