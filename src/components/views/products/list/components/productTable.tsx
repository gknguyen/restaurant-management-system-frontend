import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import React from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../../../../../redux/commonReducers/actions';
import tableIcons from '../../../../../commons/tables/tableIcons';

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
  onRowClickCallBack: Function;
  onSelectionCallBack: Function;
  /** redux params */
  isDisable: boolean;
  /** redux functions */
  sendDisableFlag: Function;
}

const ProductTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        style={{ width: '100%' }}
        columns={props.headers}
        data={props.cells}
        isLoading={props.isDisable}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
