import React from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as commonActions from '../../../redux/commonReducers/actions';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Card,
  Button,
  MenuItem,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../../commons/searchBar';
import { Order, OrderDetail, Customer } from '../../../configs/interfaces';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { formatPrice, showSnackBarAlert } from '../../../configs/utils';
import { apiPost, apiGet } from '../../../configs/axios';
import * as APIs from '../../../configs/APIs';
import STATUS_CODE from 'http-status';
import { CURRENCY } from '../../../configs/constants';
import * as orderActions from '../../../redux/orderReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      // alignItems: 'center',
      flexWrap: 'wrap',
    },
    paper: {
      width: '100%',
      height: '100%',
      padding: 10,
    },
    orderHeader: {
      textAlign: 'center',
      marginBottom: 10,
    },
    tableHeader: {
      background: 'linear-gradient(0deg, #4e342e 30%, #a1887f 90%)',
    },
  }),
);

const customer = {} as Customer;

interface Props {
  /** redux params */
  order: Order;
  orderDetails: OrderDetail[];
  isDisable: boolean;
  /** redux functions */
  sendDisableFlag: Function;
  sendOrder: Function;
  sendLoadUnpaidOrderList: Function;
}

const CustomerInfo: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [order, setOrder] = React.useState<Order>(props.order);
  const [customer, setCustomer] = React.useState<Customer>(props.order.customer);
  const [orderStatus, setOrderStatus] = React.useState<boolean>(true);

  React.useEffect(() => {
    const historyState = history.location.state as any;
    const order = historyState?.order;
    if (order) {
      setOrder(order);
      setCustomer(order.customer);
    } else history.push('/home');
  }, []);

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    customer[name] = value;
  };

  const confirmHandler = () => {
    props.sendDisableFlag(true);

    order.customer = customer;
    order.activeStatus = orderStatus;

    apiPost(APIs.createOrderForMainScreenUrl, order).then((HTTPdata) => {
      props.sendDisableFlag(false);
      if (HTTPdata.code === STATUS_CODE.OK) {
        showSnackBarAlert(5000, 'success', HTTPdata.message);
        props.sendOrder({
          no: 0,
          customer: {},
          orderDetails: [],
          finalPrice: 0,
        });
        props.sendLoadUnpaidOrderList(true);
        const orderId = HTTPdata.values;
        sessionStorage.setItem('orderId', orderId);
        history.push('/orderDetails', { backToHomeScreen: true });
      }
    });
  };

  const searchHandler = (searchValue: string) => {
    if (searchValue) {
      props.sendDisableFlag(true);
      apiGet(APIs.searchCustomerForMainScreenUrl, { searchValue }).then((HTTPdata) => {
        props.sendDisableFlag(false);
        if (HTTPdata.code === STATUS_CODE.OK) {
          showSnackBarAlert(5000, 'success', HTTPdata.message);
          setCustomer(HTTPdata.values);
        }
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container spacing={2} alignItems="flex-start">
        {/** title */}
        <Grid container item xs={12}>
          <Typography component="h1" variant="h4">
            Customer Information
          </Typography>
        </Grid>

        {/** customer information */}
        <Grid container item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SearchBar
                  searchHandlerCallBack={searchHandler}
                  label="Input phone number here..."
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Full Name"
                  name="fullName"
                  fullWidth
                  value={customer.fullName}
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  value={customer.phoneNumber}
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Email"
                  name="email"
                  fullWidth
                  value={customer.email}
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Address"
                  name="address"
                  fullWidth
                  value={customer.address}
                  onChange={onInputChangeHandler}
                />
              </Grid>
            </Grid>
          </Paper>

          {/** buttons field */}
          <Grid
            container
            item
            spacing={1}
            justify="center"
            alignItems="center"
            style={{ marginTop: 10 }}
          >
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => confirmHandler()}
                disabled={props.isDisable}
              >
                Confirm
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={() => history.push('/home')}
                disabled={props.isDisable}
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/** cart summary */}
        <Grid container item xs={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.orderHeader} variant="h5">
              Cart Summary
            </Typography>

            {order.no ? (
              <Typography style={{ padding: 10 }}>
                <Grid container justify="space-between">
                  <Grid item>Order: {order.no}</Grid>
                  <Grid item>Customer: {order.customer.fullName}</Grid>
                </Grid>
              </Typography>
            ) : (
              <></>
            )}

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell style={{ color: '#ffffff' }} colSpan={4}>
                      Order Detail
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderDetails.map((orderDetail, index) => (
                    <TableRow key={index}>
                      <TableCell>{orderDetail.product.name}</TableCell>
                      <TableCell>
                        {formatPrice(orderDetail.product.price)} {orderDetail.product.unit}
                      </TableCell>
                      <TableCell>{orderDetail.quantity}</TableCell>
                      <TableCell>
                        {formatPrice(orderDetail.totalPrice)} {orderDetail.product.unit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography style={{ padding: 10 }}>
              <Grid container justify="space-between">
                <Grid item>
                  Total: {formatPrice(order.finalPrice)} {CURRENCY}
                </Grid>
                <Grid item>
                  <TextField
                    select={true}
                    fullWidth={true}
                    value={orderStatus ? 'unpaid' : 'paid'}
                    variant="outlined"
                    margin="dense"
                    onChange={() => setOrderStatus(!orderStatus)}
                    disabled={props.isDisable}
                  >
                    <MenuItem key={1} value={'unpaid'}>
                      unpaid
                    </MenuItem>
                    <MenuItem key={2} value={'paid'}>
                      paid
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    order: state.orderReducer.order,
    orderDetails: state.orderReducer.order.orderDetails,
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
    sendOrder: (order: Order) => {
      dispatch(orderActions.actionReceiveOrder(order));
    },
    sendLoadUnpaidOrderList: (loadUnpaidOrderList: boolean) => {
      dispatch(commonActions.actionLoadUnpaidOrderList(loadUnpaidOrderList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
