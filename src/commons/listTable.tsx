import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import MaterialTable, { Icons } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { createStyles, makeStyles, Theme, createMuiTheme } from '@material-ui/core/styles';
import * as commonActions from '../redux/commonReducers/actions';
import { IconButton, Menu, MenuItem, TextField, ThemeProvider, Box } from '@material-ui/core';

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

const tableIcons: Icons = {
  Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref: any) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props: any, ref: any) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props: any, ref: any) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props: any, ref: any) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props: any, ref: any) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props: any, ref: any) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props: any, ref: any) => <ViewColumn {...props} ref={ref} />),
};

interface Props {
  /** params */
  headers: any[];
  cells: any[];
  /** functions */
  onRowClickCallBack: Function;
  onSelectionCallBack: Function;
  /** redux params */
  isDisable: boolean;
  /** redux functions */
  sendDisableFlag: Function;
}

const ListTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        style={{ width: '100%' }}
        columns={props.headers}
        data={props.cells}
        onRowClick={(event, selectedRow) => {
          props.onRowClickCallBack(selectedRow.id);
        }}
        onSelectionChange={(rows) => {
          const productIdList: string[] = [];
          rows.map((row) => productIdList.push(row.id));
          props.onSelectionCallBack(productIdList);
        }}
        options={{
          search: false,
          toolbar: false,
          selection: true,
          headerStyle: {
            background: 'linear-gradient(0deg, #4e342e 30%, #a1887f 90%)',
            color: '#ffffff',
          },
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

export default connect(mapStateToProps, mapDispatchToProps)(ListTable);
