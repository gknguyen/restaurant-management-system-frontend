import { MenuItem, TextField, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../../../commons/searchBar';
import * as APIs from '../../../../configs/APIs';
import { apiGet, apiPost } from '../../../../configs/axios';
import { HTTPdata, User, UserType } from '../../../../configs/interfaces';
import { convertDateTime, showSnackBarAlert } from '../../../../configs/utils';
import * as commonActions from '../../../../redux/commonReducers/actions';
import * as userActions from '../../../../redux/userReducers/actions';
import * as userTypeActions from '../../../../redux/userTypeReducers/actions';
import CreateUser from '../create/createUser';
import UserTable from './components/userTable';

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

interface Props {
  /** redux params */
  userList: User[];
  userIdList: string[];
  searchValue: string;
  isDisable: boolean;
  userTypeList: UserType[];
  /** redux functions */
  sendUserList: Function;
  sendDisableFlag: Function;
  sendUserTypeList: Function;
}

const UserList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const headers = [
    { field: 'id', title: 'Id', hidden: true },
    {
      field: 'username',
      title: 'Username',
      sorting: false,
      headerStyle: {
        width: 500,
        minWidth: 150,
      },
      cellStyle: {
        width: 500,
        minWidth: 150,
      },
      editComponent: (properties: any) => (
        <TextField
          fullWidth={true}
          value={properties.value}
          variant="outlined"
          margin="dense"
          onChange={(event) => properties.onChange(event.target.value)}
          disabled={props.isDisable}
        />
      ),
    },
    {
      field: 'activeStatus',
      title: 'Status',
      sorting: false,
      headerStyle: {
        width: 500,
        minWidth: 150,
      },
      cellStyle: {
        width: 500,
        minWidth: 150,
      },
      editComponent: (properties: any) => (
        <TextField
          select={true}
          fullWidth={true}
          value={properties.value}
          variant="outlined"
          margin="dense"
          onChange={(event) => properties.onChange(event.target.value)}
          disabled={props.isDisable}
        >
          <MenuItem key={1} value={'active'}>
            active
          </MenuItem>
          <MenuItem key={2} value={'deactivate'}>
            deactivate
          </MenuItem>
        </TextField>
      ),
    },
    {
      field: 'loginDateTime',
      title: 'Login At',
      sorting: false,
      headerStyle: {
        width: 500,
        minWidth: 150,
      },
      cellStyle: {
        width: 500,
        minWidth: 150,
      },
      editable: 'never',
    },
    {
      field: 'userTypeName',
      title: 'Type',
      sorting: false,
      headerStyle: {
        width: 500,
        minWidth: 150,
      },
      cellStyle: {
        width: 500,
        minWidth: 150,
      },
      editComponent: (properties: any) => (
        <TextField
          select={true}
          fullWidth={true}
          value={properties.value}
          variant="outlined"
          margin="dense"
          onChange={(event) => properties.onChange(event.target.value)}
          disabled={props.isDisable}
        >
          {props.userTypeList.map((userType) => (
            <MenuItem key={userType.id} value={userType.typeName}>
              {userType.typeName}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
  ];

  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.sendDisableFlag(true);
    apiGet(APIs.getListUserForUserScreenUrl).then((HTTPdata) => processDataToTable(HTTPdata));
    apiGet(APIs.getListUserTypeUrl).then((HTTPdata) => props.sendUserTypeList(HTTPdata.values));
  }, []);

  const searchHandler = (searchValue: string) => {
    apiGet(APIs.searchListUserForUserScreenUrl, { searchValue }).then((HTTPdata) =>
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
        activeStatus: serverUser.activeStatus ? 'active' : 'deactivate',
        loginDateTime: convertDateTime(serverUser.loginDateTime),
        userTypeName: serverUser.userType.typeName,
      } as User;
      userList.push(user);
    });

    props.sendUserList(userList);
    props.sendDisableFlag(false);
  };

  const updateHandler = (newUserList: User[]) => {
    props.sendUserList(newUserList);
  };

  const createHandler = () => {
    setOpen(true);
  };

  const createConfirmHandler = (createUserForm: User) => {
    setOpen(false);
    apiPost(APIs.createOneUserForUserScreenUrl, createUserForm).then((HTTPdata) => {
      props.sendDisableFlag(false);
      showSnackBarAlert(5000, 'success', HTTPdata.message);
      apiGet(APIs.getListUserForUserScreenUrl).then((HTTPdata) => processDataToTable(HTTPdata));
    });
  };

  return (
    <Container maxWidth="xl">
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
        </Grid>

        {/** table field */}
        <Grid container={true} item={true} xs={12}>
          {/* <UserTable /> */}
          <UserTable headers={headers} cells={props.userList} onUpdateCallBack={updateHandler} />
        </Grid>
      </Grid>

      {/** create user dialog */}
      <CreateUser
        open={open}
        confirmHandlerCallBack={createConfirmHandler}
        closeHandlerCallBack={(open: boolean) => setOpen(open)}
      />
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
    userTypeList: state.userTypeReducer.userTypeList,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendUserList: (userList: User[]) => {
      dispatch(userActions.actionReceiveUserList(userList));
    },
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
    sendUserTypeList: (userTypeList: UserType[]) => {
      dispatch(userTypeActions.actionReceiveUserTypeList(userTypeList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
