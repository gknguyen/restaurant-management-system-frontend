import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../../configs/APIs';
import Axios from '../../../../configs/axios';
import { User, UserType } from '../../../../configs/interfaces';
import * as imageActions from '../../../../redux/imageReducers/actions';
import * as userActions from '../../../../redux/userReducers/actions';
import * as userTypeActions from '../../../../redux/userTypeReducers/actions';
import AvatarUploadField from './components/avatarUploadField';
import MainInfoField from './components/mainInfoField';
import { checkValidate, errorMessagesForm } from './validate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    paper: {
      width: '100%',
      height: '100%',
    },
    card: {
      width: '100%',
      height: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    typography: {
      padding: '0 5px 5px 5px',
    },
    createButton: {
      background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      margin: '10px',
    },
    goBackButton: {
      background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
  }),
);

const createDataForm: any = {};

interface Props {
  userTypeName: string;
  username: string;
  password: string;
  fullName: string;
  age: number;
  phoneNumber: string;
  email: string;
  avatar: File;
  getUserTypeList: Function;
  sendUserType: Function;
  sendUser: Function;
  sendErrorMessageForm: Function;
  sendImageErrorMessage: Function;
}

const CreateUser: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  createDataForm.userTypeName = props.userTypeName;
  createDataForm.username = props.username;
  createDataForm.password = props.password;
  createDataForm.fullName = props.fullName;
  createDataForm.age = props.age;
  createDataForm.phoneNumber = props.phoneNumber;
  createDataForm.email = props.email;
  createDataForm.avatar = props.avatar.name;
  // console.log('createDataForm: ', createDataForm);

  useEffect(() => {
    props.getUserTypeList();
  }, []);

  const goBackHandler = () => {
    props.sendUserType({});
    props.sendUser({});
    props.sendErrorMessageForm({});
    props.sendImageErrorMessage('');
    history.push('/userList');
  };

  const createHandler = (event: any) => {
    event.preventDefault();
    const results = checkValidate(createDataForm, true);
    if (results) {
      Axios({
        method: 'POST',
        url: APIs.createOneUserUrl,
        data: createDataForm,
      })
        .then(() => {
          Axios({
            method: 'GET',
            url: APIs.getSignedUrl,
            params: {
              fileName: props.avatar.name,
              fileType: props.avatar.type,
              folderName: 'users',
            },
          })
            .then((res) => {
              const signedUrl: string = res.data.values;
              Axios({
                method: 'PUT',
                url: signedUrl,
                headers: { 'Content-Type': props.avatar.type },
                data: props.avatar,
              })
                .then(() => {
                  history.push('/userList');
                })
                .catch((err) => {
                  console.log(err.response.data);
                });
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      props.sendImageErrorMessage(errorMessagesForm.avatar);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            New User
          </Typography>
        </Grid>
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <form>
              <Box display="flex">
                <Grid
                  className={classes.grid}
                  container={true}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid container={true} item={true} md={5} xs="auto">
                    <Grid container={true} item={true} xs={12}>
                      <AvatarUploadField />
                    </Grid>
                    <Grid container={true} item={true} xs={12} justify="center" alignItems="center">
                      <Button
                        className={classes.goBackButton}
                        variant="contained"
                        color="primary"
                        onClick={goBackHandler}
                      >
                        Go Back
                      </Button>
                      <Button
                        className={classes.createButton}
                        variant="contained"
                        color="primary"
                        onClick={createHandler}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container={true} item={true} md={7} xs="auto">
                    <Grid container={true} item={true} xs={12} justify="space-between" direction="column">
                      <MainInfoField />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    userTypeName: state.userTypeReducer.userType.typeName,
    username: state.userReducer.user.username,
    password: state.userReducer.user.password,
    fullName: state.userReducer.user.fullName,
    age: state.userReducer.user.age,
    phoneNumber: state.userReducer.user.phoneNumber,
    email: state.userReducer.user.email,
    avatar: state.imageReducer.imageFile,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserTypeList: () => {
      dispatch(userTypeActions.actionGetUserTypeListUrl());
    },
    sendUserType: (userType: UserType) => {
      dispatch(userTypeActions.actionReceiveUserType(userType));
    },
    sendUser: (user: User) => {
      dispatch(userActions.actionReceiveUser(user));
    },
    sendErrorMessageForm: (errorMessagesForm: User) => {
      dispatch(userActions.actionReceiveErrorMessages(errorMessagesForm));
    },
    sendImageErrorMessage: (errorMessage: string) => {
      dispatch(imageActions.actionReceiveErrorMessage(errorMessage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
