import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import React from 'react';
import { connect } from 'react-redux';
import tableIcons from '../../../../../commons/tables/tableIcons';
import * as APIs from '../../../../../configs/APIs';
import { apiDelete, apiPut } from '../../../../../configs/axios';
import { showSnackBarAlert } from '../../../../../configs/utils';
import * as commonActions from '../../../../../redux/commonReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        // color: '#ffffff',
      },
    },
  },
});

interface Props {
  /** params */
  headers: any[];
  cells: any[];
  /** functions */
  onUpdateCallBack: Function;
  /** redux params */
  isDisable: boolean;
  /** redux functions */
  sendDisableFlag: Function;
}

const UserTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        style={{ width: '100%' }}
        columns={props.headers}
        data={props.cells}
        // isLoading={props.isDisable}
        options={{
          search: false,
          toolbar: false,
          actionsColumnIndex: -1,
          headerStyle: {
            background: 'linear-gradient(0deg, #4e342e 30%, #a1887f 90%)',
            color: '#ffffff',
            // textAlign: 'initial',
          },
          actionsCellStyle: {
            textAlign: 'initial',
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              props.sendDisableFlag(true);
              const dataUpdate = [...props.cells];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              apiPut(APIs.editOneUserForUserScreenUrl, { userId: newData.id }, newData).then(
                (HTTPdata) => {
                  showSnackBarAlert(5000, 'success', HTTPdata.message);
                  props.sendDisableFlag(false);
                  props.onUpdateCallBack([...dataUpdate]);
                },
              );
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              const dataDelete = [...props.cells];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              apiDelete(APIs.deleteOneUserForUserScreenUrl, { userId: oldData.id }).then(
                (HTTPdata) => {
                  showSnackBarAlert(5000, 'success', HTTPdata.message);
                  props.sendDisableFlag(false);
                  props.onUpdateCallBack([...dataDelete]);
                },
              );
              resolve();
            }),
        }}
      />
    </ThemeProvider>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
