import React, { FormEvent } from 'react';
import * as imageActions from '../../../../redux/imageReducers/actions';
import * as userActions from '../../../../redux/userReducers/actions';
import * as userTypeActions from '../../../../redux/userTypeReducers/actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../../configs/APIs';
import Axios, { apiPut, apiGet } from '../../../../configs/axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import { User, UserType, HTTPdata } from '../../../../configs/interfaces';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AvatarUploadField from './components/avatarUploadField';
import Button from '@material-ui/core/Button';
import * as commonActions from '../../../../redux/commonReducers/actions';
import MainInfoField from './components/mainInfoField';
import { checkValidate, errorMessagesForm } from './validate';
import { getUserId } from '../../../../configs/localStore';
import { showSnackBarAlert } from '../../../../configs/utils';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      width: '100%',
      height: '100%',
    },
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    editButton: {
      // background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      margin: '10px',
      minWidth: '100px',
    },
    goBackButton: {
      // background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
    progressCircular: {
      // color: '#6798e5',
      animationDuration: '550ms',
    },
  }),
);

const editDataForm: any = {};

interface Props {
  /** redux params */
  userTypeName: string;
  username: string;
  password: string;
  fullName: string;
  age: number;
  phoneNumber: string;
  email: string;
  avatar: File;
  open: boolean;
  isDisable: boolean;
  /** redux functions */
  sendEditOpenFlag: Function;
  sendErrorMessageForm: Function;
  sendDisableFlag: Function;
  sendUserTypeList: Function;
  sendUserType: Function;
  sendUser: Function;
}

const EditUser: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const userId = getUserId();

  editDataForm.userTypeName = props.userTypeName;
  editDataForm.username = props.username;
  editDataForm.password = props.password;
  editDataForm.fullName = props.fullName;
  editDataForm.age = props.age;
  editDataForm.phoneNumber = props.phoneNumber;
  editDataForm.email = props.email;
  editDataForm.avatar = props.avatar.name;

  React.useEffect(() => {
    apiGet(APIs.getListUserTypeUrl).then((HTTPdata) => props.sendUserTypeList(HTTPdata.values));
  }, []);

  const handleClose = () => {
    apiGet(APIs.getOneUserUrl, { userId }).then((HTTPdata) => processDetailData(HTTPdata));
    props.sendErrorMessageForm({});
    props.sendEditOpenFlag(false);
  };

  const editHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.sendDisableFlag(true);

    const isOk = checkValidate(editDataForm, false);
    if (isOk) {
      const formData = new FormData();
      formData.append('userTypeName', editDataForm.userTypeName || '');
      formData.append('username', editDataForm.username || '');
      formData.append('password', editDataForm.password || '');
      formData.append('fullName', editDataForm.fullName || '');
      formData.append('age', editDataForm.age.toString() || '');
      formData.append('phoneNumber', editDataForm.phoneNumber || '');
      formData.append('email', editDataForm.email || '');
      formData.append('avatar', editDataForm.avatar || '');
      if (props.avatar.name) formData.append('files', props.avatar, props.avatar.name);

      apiPut(APIs.editOneUserUrl, { userId }, formData).then((HTTPdata) => {
        processDetailData(HTTPdata);
        props.sendDisableFlag(false);
        props.sendEditOpenFlag(false);
        showSnackBarAlert(5000, 'success', HTTPdata.message);
      });
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      props.sendDisableFlag(false);
    }
  };

  const processDetailData = (HTTPdata: HTTPdata) => {
    const serverUser = HTTPdata.values;

    const userType = serverUser.userType as UserType;
    const user = {
      id: serverUser.id,
      username: serverUser.username,
      fullName: serverUser.fullName,
      age: serverUser.age,
      phoneNumber: serverUser.phoneNumber,
      email: serverUser.email,
      avatar: serverUser.avatar,
      loginDateTime: serverUser.loginDateTime,
      activeStatus: serverUser.activeStatus,
    } as User;

    props.sendUser(user);
    props.sendUserType(userType);
  };

  return (
    <Container maxWidth="xl">
      <Dialog
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="md"
      >
        {/** header */}
        <DialogTitle id="customized-dialog-title">
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
        </DialogTitle>

        {/** contents */}
        <DialogContent>
          <form onSubmit={editHandler}>
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
                      color="secondary"
                      onClick={handleClose}
                    >
                      Go Back
                    </Button>
                    <input
                      id="edit-button"
                      type="submit"
                      style={{ display: 'none' }}
                      disabled={props.isDisable}
                    />
                    <label htmlFor="edit-button">
                      <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        component="span"
                        className={classes.editButton}
                        disabled={props.isDisable}
                      >
                        {!props.isDisable ? (
                          'Confirm'
                        ) : (
                          <CircularProgress
                            className={classes.progressCircular}
                            variant="indeterminate"
                            disableShrink
                            size={24}
                            thickness={4}
                          />
                        )}
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
                    <MainInfoField isEdit={true} />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
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
    open: state.userReducer.open,
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendErrorMessageForm: (errorMessagesForm: User) => {
      dispatch(userActions.actionReceiveErrorMessages(errorMessagesForm));
    },
    sendEditOpenFlag: (open: boolean) => {
      dispatch(userActions.actionReceiveEditOpenFlag(open));
    },
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
    sendUserTypeList: (userTypeList: UserType[]) => {
      dispatch(userTypeActions.actionReceiveUserTypeList(userTypeList));
    },
    sendUserType: (userType: UserType) => {
      dispatch(userTypeActions.actionReceiveUserType(userType));
    },
    sendUser: (user: User) => {
      dispatch(userActions.actionReceiveUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
