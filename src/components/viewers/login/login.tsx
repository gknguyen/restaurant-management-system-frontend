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
import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../configs/APIs';
import Axios from '../../../configs/axios';
import { loginInputType } from '../../../configs/inputType';
import { LoginForm, User } from '../../../configs/interfaces';
import * as userActions from '../../../redux/reducers/userReducers/actions';
import { validate } from './validate';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '110px 0px 110px 0px',
    height: 820,
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
    background: 'linear-gradient(45deg, #4e342e 30%, #a1887f 90%)',
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: '#ff0000',
    fontSize: '13px',
  },
  floatRight: {
    float: 'right',
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

  const Login = (event: any) => {
    event.preventDefault();
    const results = validate(loginForm);
    if (results.flag === true) {
      Axios({
        method: 'POST',
        url: APIs.loginUrl,
        data: loginForm,
      })
        .then((res) => {
          const token = res.data.values;
          sessionStorage.setItem('token', JSON.stringify(token));
          history.push('/admin/home');
        })
        .catch((error) => {
          setErrorMessage('Login error');
          history.push('/auth/login');
        });
    } else {
      setErrorMessage('Login error');
      setErrorMessageUsername(results.errorMessagesForm.username);
      setErrorMessagePassword(results.errorMessagesForm.password);
      history.push('/auth/login');
    }
  };

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name.toString();
    const value = event.target.value.toString();
    loginForm[name] = value;
    console.log('loginForm[' + name + ']: ' + name);
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate={true}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <span className="col-3" />
          <div className="col-7 row">
            <span id="loginResult" className={classes.error}>
              {errorMessage}
            </span>
          </div>
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={Login}
          >
            Sign In
          </Button>
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
      </div>
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
