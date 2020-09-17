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
import { AWS_S3_BUCKET_URL, NO_AVATAR_URL } from '../../../../configs/constants';
import { User, UserType } from '../../../../configs/interfaces';
import * as userActions from '../../../../redux/userReducers/actions';
import * as userTypeActions from '../../../../redux/userTypeReducers/actions';
import { getUserId } from '../../../../configs/localStore';
import EditUser from '../createAndEdit/editUser';
import { apiGet } from '../../../../configs/axios';
import * as APIs from '../../../../configs/APIs';
import { convertDateTime } from '../../../../configs/utils';
import { green, red } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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
    image: {
      width: '100%',
      height: '100%',
    },
    editButton: {
      // background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
      color: 'white',
      margin: '10px',
      width: 95,
    },
    goBackButton: {
      // background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
  }),
);

interface Props {
  /** redux params */
  userTypeName: string;
  username: string;
  fullName: string;
  age: number;
  phoneNumber: string;
  email: string;
  avatar: string;
  loginDateTime: Date;
  activeStatus: boolean;
  /** redux functions */
  sendUserType: Function;
  sendUser: Function;
  sendEditOpenFlag: Function;
}

const UserDetails: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const userId = getUserId();

  const userImageUrl = `${AWS_S3_BUCKET_URL}/users/${props.avatar}`;

  useEffect(() => {
    apiGet(APIs.getOneUserForUserScreenUrl, { userId }).then((HTTPdata) => {
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
    });
  }, []);

  const editHandler = () => {
    props.sendEditOpenFlag(true);
  };

  const goBackHandler = () => {
    props.sendUser({});
    history.push('/userList');
  };

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            User Details
          </Typography>
        </Grid>

        {/** contents */}
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <Box display="flex">
              <Grid
                className={classes.grid}
                container={true}
                spacing={3}
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid container={true} item={true} spacing={1} md={5} xs="auto">
                  {/** avatar field */}
                  <Grid container={true} item={true} xs={12}>
                    <img
                      alt="Select file"
                      className={classes.image}
                      src={props.avatar ? userImageUrl : NO_AVATAR_URL}
                    />
                  </Grid>

                  {/** buttons field */}
                  <Grid container={true} item={true} xs={12} justify="center" alignItems="flex-end">
                    <Button
                      className={classes.goBackButton}
                      variant="contained"
                      color="secondary"
                      onClick={goBackHandler}
                    >
                      Go Back
                    </Button>
                    <Button
                      className={classes.editButton}
                      variant="contained"
                      color="primary"
                      onClick={editHandler}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>

                {/** informations field */}
                <Grid container={true} item={true} md={7} xs="auto" spacing={3} direction="column">
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography component="h1" variant="h4">
                      {props.userTypeName}
                    </Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>{props.username}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>{props.fullName}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>{props.age}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>{props.phoneNumber}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>{props.email}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>{convertDateTime(props.loginDateTime)}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>
                      ACTIVE :{' '}
                      {props.activeStatus ? (
                        <CheckCircleIcon style={{ color: green[500] }} />
                      ) : (
                        <ErrorIcon style={{ color: red[600] }} />
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/** edit field */}
      <EditUser />
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    userTypeName: state.userTypeReducer.userType.typeName,
    username: state.userReducer.user.username,
    fullName: state.userReducer.user.fullName,
    age: state.userReducer.user.age,
    phoneNumber: state.userReducer.user.phoneNumber,
    email: state.userReducer.user.email,
    avatar: state.userReducer.user.avatar,
    loginDateTime: state.userReducer.user.loginDateTime,
    activeStatus: state.userReducer.user.activeStatus,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendUserType: (userType: UserType) => {
      dispatch(userTypeActions.actionReceiveUserType(userType));
    },
    sendUser: (user: User) => {
      dispatch(userActions.actionReceiveUser(user));
    },
    sendEditOpenFlag: (open: boolean) => {
      dispatch(userActions.actionReceiveEditOpenFlag(open));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
