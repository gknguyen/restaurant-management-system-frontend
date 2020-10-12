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
}

const CustomerInfo: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [order, setOrder] = React.useState<Order>(props.order);
  const [customer, setCustomer] = React.useState<Customer>(props.order.customer);

  React.useEffect(() => {
    const historyState = history.location.state as any;
    const order = historyState.order;
    setOrder(order);
  }, []);

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    customer[name] = value;
  };

  const confirmHandler = () => {
    props.sendDisableFlag(true);
    order.customer = customer;
    apiPost(APIs.createOrderForMainScreenUrl, order).then((HTTPdata) => {
      props.sendDisableFlag(false);
      if (HTTPdata.code === STATUS_CODE.OK) {
        showSnackBarAlert(5000, 'success', HTTPdata.message);
        const orderId = HTTPdata.values;
        sessionStorage.setItem('orderId', orderId);
        history.push('/orderDetails');
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
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>Order Detail</TableCell>
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
                <TableFooter>
                  <TableRow>
                    <TableCell>
                      Total: {formatPrice(order.finalPrice)} {CURRENCY}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
