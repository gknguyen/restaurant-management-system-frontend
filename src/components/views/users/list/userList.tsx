import { Dialog, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../../../commons/searchBar';
import { UserHeadCell, HTTPdata, User } from '../../../../configs/interfaces';
import * as userActions from '../../../../redux/userReducers/actions';
import UserTable from './components/userTable';
import { apiPost, apiGet } from '../../../../configs/axios';
import * as APIs from '../../../../configs/APIs';
import { trimDate } from '../../../../configs/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    search: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      maxWidth: 480,
      flexBasis: 480,
    },
    searchButton: {
      background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
    createButton: {
      background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
    deleteButton: {
      background: 'linear-gradient(45deg, #ff1744 30%, #ff8a80 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
  }),
);

interface Props {
  searchValue: string;
  sendUserTableHeadCells: Function;
  getUserList: Function;
  searchUserList: Function;
  sendUserList: Function;
}

const UserList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    apiGet(APIs.getListUserUrl).then((HTTPdata) => {
      const userList: User[] = [];
      const serverUserList: any[] = HTTPdata.values;
      serverUserList.map((serverUser) => {
        const user = {
          id: serverUser.id || null,
          username: serverUser.username || null,
          fullName: serverUser.fullName || null,
          phoneNumber: serverUser.phoneNumber || null,
          email: serverUser.email || null,
          activeStatus: serverUser.activeStatus || null,
          loginDatetime: serverUser.loginDatetime ? trimDate(serverUser.loginDatetime, 20) : null,
          userTypeName: serverUser.userType.typeName || null,
        } as User;
        userList.push(user);
      });
      props.sendUserList(userList);
    });
  }, []);

  const searchHandler = () => {};

  const createHandler = () => {
    history.push('/createUser');
  };

  const deleteHandler = () => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Do yo want to delete these users?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          These users will be deleted permanently
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteHandler} color="primary">
          Agree
        </Button>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container maxWidth="xl">
      <Box display="flex">
        <Grid className={classes.grid} container={true} spacing={2} direction="row">
          <Grid container={true} item={true} xs={12}>
            <Typography component="h1" variant="h4">
              User List
            </Typography>
          </Grid>
          <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
            <div className={classes.search}>
              <SearchBar />
              <Button
                className={classes.searchButton}
                onClick={searchHandler}
                size="medium"
                variant="contained"
              >
                <SearchIcon />
              </Button>
            </div>
          </Grid>
          <Grid container={true} item={true} md={6} xs="auto" justify="flex-end">
            <Button
              className={classes.createButton}
              onClick={createHandler}
              size="medium"
              variant="contained"
            >
              Create
            </Button>
            <Button
              className={classes.deleteButton}
              onClick={handleClickOpen}
              size="medium"
              variant="contained"
            >
              Delete
            </Button>
            {deleteDialog}
          </Grid>
          <Grid container={true} item={true} xs={12}>
            <UserTable />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    searchValue: state.productReducer.searchValue,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendUserTableHeadCells: (headCells: UserHeadCell[]) => {
      dispatch(userActions.actionReceiveUserTableHeadCells(headCells));
    },
    getUserList: () => {
      dispatch(userActions.actionGetUserListUrl());
    },
    searchUserList: (searchValue: string) => {
      dispatch(userActions.actionSearchUserListUrl(searchValue));
    },
    sendUserList: (userList: User[]) => {
      dispatch(userActions.actionReceiveUserList(userList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
