import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as commonActions from '../../../../redux/commonReducers/actions';
import * as APIs from '../../../../configs/APIs';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import OrderTable from './components/orderTable';
import { apiGet } from '../../../../configs/axios';
import { Order, HTTPdata } from '../../../../configs/interfaces';
import { formatPrice, convertDateTime } from '../../../../configs/utils';
import { green, red } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { CURRENCY } from '../../../../configs/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  }),
);

const headers = [
  { field: 'id', title: 'Id', hidden: true },
  { field: 'fullName', title: 'Name', sorting: false },
  { field: 'phoneNumber', title: 'Phone', sorting: false },
  { field: 'finalPrice', title: 'Price', sorting: false },
  { field: 'activeStatus', title: 'Active', sorting: false },
  { field: 'createDateTime', title: 'Create At', sorting: false },
];

interface Props {
  /** redux params */
  isDisable: boolean;
  /** redux functions */
  sendDisableFlag: Function;
}

const OrderList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [orderList, setOrderList] = React.useState<any[]>([]);

  React.useEffect(() => {
    props.sendDisableFlag(true);
    apiGet(APIs.getListOrderForOrderScreenUrl).then((HTTPdata) => processDataToTable(HTTPdata));
  }, []);

  const processDataToTable = (HTTPdata: HTTPdata) => {
    const orderList: any[] = [];
    const serverOrderList: any[] = HTTPdata.values;
    serverOrderList.forEach((serverOrder) => {
      const order = {
        id: serverOrder.id || null,
        fullName: serverOrder.customer.fullName || null,
        phoneNumber: serverOrder.customer.phoneNumber || null,
        finalPrice: serverOrder.finalPrice
          ? `${formatPrice(serverOrder.finalPrice)} ${CURRENCY}`
          : null,
        activeStatus: serverOrder.activeStatus ? 'Unpaid' : 'Paid',
        createDateTime: serverOrder.createDateTime
          ? convertDateTime(serverOrder.createDateTime)
          : null,
      };
      orderList.push(order);
    });
    // props.sendOrderList(orderList);
    setOrderList(orderList);
    props.sendDisableFlag(false);
  };

  const detailHandler = (orderId: string) => {
    sessionStorage.setItem('orderId', orderId);
    history.push('/orderDetails');
    // history.push('/orderDetails', { orderId });
  };

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container spacing={2} direction="row">
        <Grid container item xs={12}>
          <Typography component="h1" variant="h4">
            Order List
          </Typography>
        </Grid>

        {/** table field */}
        <Grid container item xs={12}>
          <OrderTable
            headers={headers}
            cells={orderList}
            onRowClickCallBack={detailHandler}
            onSelectionCallBack={() => {}}
          />
        </Grid>
      </Grid>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
