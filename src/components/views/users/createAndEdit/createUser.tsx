import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../../configs/APIs';
import Axios, { apiPost, apiGet } from '../../../../configs/axios';
import { User, UserType } from '../../../../configs/interfaces';
import * as imageActions from '../../../../redux/imageReducers/actions';
import * as userActions from '../../../../redux/userReducers/actions';
import * as userTypeActions from '../../../../redux/userTypeReducers/actions';
import AvatarUploadField from './components/avatarUploadField';
import MainInfoField from './components/mainInfoField';
import { checkValidate, errorMessagesForm } from './validate';
import * as commonActions from '../../../../redux/commonReducers/actions';
import LinearProgressBar from '../../../../commons/linearProgressBar';
import { showSnackBarAlert } from '../../../../configs/utils';

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
  /** params */
  userTypeName: string;
  username: string;
  password: string;
  fullName: string;
  age: number;
  phoneNumber: string;
  email: string;
  avatar: File;
  isDisable: boolean;
  /** functions */
  sendUserTypeList: Function;
  sendUserType: Function;
  sendUser: Function;
  sendErrorMessageForm: Function;
  sendImageErrorMessage: Function;
  sendDisableFlag: Function;
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

  React.useEffect(() => {
    apiGet(APIs.getListUserTypeUrl).then((HTTPdata) => props.sendUserTypeList(HTTPdata.values));
  }, []);

  const goBackHandler = () => {
    props.sendUserType({});
    props.sendUser({});
    props.sendErrorMessageForm({});
    props.sendImageErrorMessage('');
    history.push('/userList');
  };

  const createHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.sendDisableFlag(true);

    const isOk = checkValidate(createDataForm, true);
    if (isOk) {
      const formData = new FormData();
      formData.append('userTypeName', createDataForm.userTypeName);
      formData.append('username', createDataForm.username);
      formData.append('password', createDataForm.password);
      formData.append('fullName', createDataForm.fullName);
      formData.append('age', createDataForm.age.toString());
      formData.append('phoneNumber', createDataForm.phoneNumber);
      formData.append('email', createDataForm.email);
      formData.append('avatar', createDataForm.avatar);
      formData.append('files', props.avatar, props.avatar.name);

      apiPost(APIs.createOneUserUrl, formData).then((HTTPdata) => {
        props.sendDisableFlag(false);
        showSnackBarAlert(5000, 'success', HTTPdata.message);
        history.push('/userList');
      });
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      props.sendImageErrorMessage(errorMessagesForm.avatar);
      props.sendDisableFlag(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            New User
          </Typography>
        </Grid>

        {/** contents */}
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <form onSubmit={createHandler}>
              <Box display="flex">
                <Grid
                  className={classes.grid}
                  container={true}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid container={true} item={true} md={5} xs="auto">
                    {/** avatar field */}
                    <Grid container={true} item={true} xs={12}>
                      <AvatarUploadField />
                    </Grid>

                    {/** buttons field */}
                    <Grid container={true} item={true} xs={12} justify="center" alignItems="center">
                      <Button
                        className={classes.goBackButton}
                        variant="contained"
                        color="primary"
                        onClick={goBackHandler}
                      >
                        Go Back
                      </Button>
                      <input
                        id="create-button"
                        type="submit"
                        style={{ display: 'none' }}
                        disabled={props.isDisable}
                      />
                      <label htmlFor="create-button">
                        <Button
                          fullWidth={true}
                          variant="contained"
                          color="primary"
                          component="span"
                          className={classes.createButton}
                          disabled={props.isDisable}
                        >
                          Create
                        </Button>
                      </label>
                    </Grid>
                  </Grid>

                  {/** informations field */}
                  <Grid container={true} item={true} md={7} xs="auto">
                    <Grid
                      container={true}
                      item={true}
                      xs={12}
                      justify="space-between"
                      direction="column"
                    >
                      <MainInfoField isEdit={false} />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/** progress bar */}
        <LinearProgressBar />
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
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendUserTypeList: (userTypeList: UserType[]) => {
      dispatch(userTypeActions.actionReceiveUserTypeList(userTypeList));
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
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
