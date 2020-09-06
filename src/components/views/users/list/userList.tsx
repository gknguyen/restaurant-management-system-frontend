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
import * as commonActions from '../../../../redux/commonReducers/actions';
import { apiPost, apiGet, apiDelete } from '../../../../configs/axios';
import * as APIs from '../../../../configs/APIs';
import { trimDate, convertDateTime } from '../../../../configs/utils';
import ListTable from '../../../../commons/listTable';
import { green, red } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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
    // searchButton: {
    //   background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
    //   color: 'white',
    //   marginLeft: theme.spacing(2),
    // },
    createButton: {
      // background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
    deleteButton: {
      // background: 'linear-gradient(45deg, #ff1744 30%, #ff8a80 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
  }),
);

const headers = [
  { field: 'id', title: 'Id', hidden: true },
  { field: 'username', title: 'Username', sorting: false },
  { field: 'fullName', title: 'Name', sorting: false },
  { field: 'phoneNumber', title: 'Phone', sorting: false },
  { field: 'email', title: 'Email', sorting: false },
  { field: 'activeStatus', title: 'Active', sorting: false },
  { field: 'loginDateTime', title: 'Login At', sorting: false },
  { field: 'userTypeName', title: 'Type', sorting: false },
];

interface Props {
  /** params */
  userList: User[];
  userIdList: string[];
  searchValue: string;
  isDisable: boolean;
  /** functions */
  // sendUserTableHeadCells: Function;
  // getUserList: Function;
  searchUserList: Function;
  sendUserList: Function;
  sendDisableFlag: Function;
}

const UserList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [userIdList, setUserIdList] = React.useState<string[]>([]);

  React.useEffect(() => {
    props.sendDisableFlag(true);
    apiGet(APIs.getListUserUrl).then((HTTPdata) => processDataToTable(HTTPdata));
  }, []);

  const searchHandler = (searchValue: string) => {
    apiGet(APIs.searchListUserUrl, { searchValue }).then((HTTPdata) =>
      processDataToTable(HTTPdata),
    );
  };

  const processDataToTable = (HTTPdata: HTTPdata) => {
    const userList: User[] = [];
    const serverUserList: any[] = HTTPdata.values;

    serverUserList.map((serverUser) => {
      const user = {
        id: serverUser.id,
        username: serverUser.username,
        fullName: serverUser.fullName,
        phoneNumber: serverUser.phoneNumber,
        email: serverUser.email,
        activeStatus: serverUser.activeStatus ? (
          <CheckCircleIcon style={{ color: green[500] }} />
        ) : (
          <ErrorIcon style={{ color: red[600] }} />
        ),
        loginDateTime: convertDateTime(serverUser.loginDateTime),
        userTypeName: serverUser.userType.typeName,
      } as User;
      userList.push(user);
    });

    props.sendUserList(userList);
    props.sendDisableFlag(false);
  };

  const createHandler = () => {
    history.push('/createUser');
  };

  const deleteHandler = () => {
    apiDelete(APIs.deleteListUserUrl, { userIdList }).then(() => window.location.reload(true));
    setOpen(false);
  };

  const detailHandler = (userId: string) => {
    sessionStorage.setItem('userId', userId);
    history.push('/userDetails');
  };

  const onSelectionHandler = (userIdList: string[]) => {
    setUserIdList(userIdList);
  };

  const handleClickOpen = () => {
    if (userIdList && userIdList.length > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Do yo want to delete these users?</DialogTitle>
      <DialogContent>
        <DialogContentText>These users will be deleted permanently</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteHandler} color="primary">
          Yes
        </Button>
        <Button onClick={handleClose} color="primary">
          No
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

          {/** search field */}
          <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
            <SearchBar searchHandlerCallBack={searchHandler} />
          </Grid>

          {/** buttons field */}
          <Grid container={true} item={true} md={6} xs="auto" justify="flex-end">
            <Button
              className={classes.createButton}
              onClick={createHandler}
              size="medium"
              variant="contained"
              color="primary"
              disabled={props.isDisable}
            >
              Create
            </Button>
            <Button
              className={classes.deleteButton}
              onClick={handleClickOpen}
              size="medium"
              variant="contained"
              color="secondary"
              disabled={props.isDisable}
            >
              Delete
            </Button>
          </Grid>

          {/** table field */}
          <Grid container={true} item={true} xs={12}>
            {/* <UserTable /> */}
            <ListTable
              headers={headers}
              cells={props.userList}
              onRowClickCallBack={detailHandler}
              onSelectionCallBack={onSelectionHandler}
            />
          </Grid>
        </Grid>
      </Box>

      {/** confirm dialog */}
      {deleteDialog}
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    userList: state.userReducer.userList,
    userIdList: state.userReducer.userIdList,
    searchValue: state.commonReducer.searchValue,
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    // sendUserTableHeadCells: (headCells: UserHeadCell[]) => {
    //   dispatch(userActions.actionReceiveUserTableHeadCells(headCells));
    // },
    // getUserList: () => {
    //   dispatch(userActions.actionGetUserListUrl());
    // },
    searchUserList: (searchValue: string) => {
      dispatch(userActions.actionSearchUserListUrl(searchValue));
    },
    sendUserList: (userList: User[]) => {
      dispatch(userActions.actionReceiveUserList(userList));
    },
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
