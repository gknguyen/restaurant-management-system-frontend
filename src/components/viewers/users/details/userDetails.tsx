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
import { User } from '../../../../configs/interfaces';
import * as userActions from '../../../../redux/reducers/userReducers/actions';
import { getUserId } from '../../../utils/localStore';

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
      background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
      color: 'white',
      margin: '10px',
      width: 95,
    },
    goBackButton: {
      background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
  }),
);

interface Props {
  user: User;
  sendUser: Function;
  sendEditOpenFlag: Function;
  sendUserId: Function;
}

const UserDetails: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const userId = getUserId();

  const userImageUrl = AWS_S3_BUCKET_URL + '/users/' + props.user.avatar;

  useEffect(() => {
    props.sendUserId(userId);
  }, []);

  const editHandler = () => {
    props.sendEditOpenFlag(true);
  };

  const goBackHandler = () => {
    props.sendUser({});
    history.push('/userList');
  };

  return (
    <Container maxWidth='xl'>
      <Grid className={classes.grid} container={true} spacing={2} direction='column'>
        <Grid container={true} item={true} xs={12}>
          <Typography component='h1' variant='h4'>
            User Details
          </Typography>
        </Grid>
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <Box display='flex'>
              <Grid
                className={classes.grid}
                container={true}
                spacing={3}
                direction='row'
                justify='center'
                alignItems='flex-start'
              >
                <Grid container={true} item={true} spacing={1} md={5} xs='auto'>
                  <Grid container={true} item={true} xs={12}>
                    <img
                      alt='Select file'
                      className={classes.image}
                      src={props.user.avatar ? userImageUrl : NO_AVATAR_URL}
                    />
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-end'>
                    <Button
                      className={classes.goBackButton}
                      variant='contained'
                      color='primary'
                      onClick={goBackHandler}
                    >
                      Go Back
                    </Button>
                    <Button className={classes.editButton} variant='contained' color='primary' onClick={editHandler}>
                      Edit
                    </Button>
                  </Grid>
                </Grid>
                <Grid container={true} item={true} md={7} xs='auto' spacing={3} direction='column'>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-start'>
                    <Typography component='h1' variant='h4'>
                      {props.user.username}
                    </Typography>
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-start'>
                    <Typography>{props.user.fullName}</Typography>
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-start'>
                    <Typography>{props.user.age}</Typography>
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-start'>
                    <Typography>{props.user.phoneNumber}</Typography>
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-start'>
                    <Typography>{props.user.email}</Typography>
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-start'>
                    <Typography>{props.user.loginDatetime}</Typography>
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-start'>
                    <Typography>{props.user.activeStatus}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        {/* <EditProduct /> */}
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    user: state.userReducer.user,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendUser: (user: User) => {
      dispatch(userActions.actionReceiveUser(user));
    },
    sendEditOpenFlag: (open: boolean) => {
      dispatch(userActions.actionReceiveEditOpenFlag(open));
    },
    sendUserId: (userId: string) => {
      dispatch(userActions.actionGetUserUrl(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
