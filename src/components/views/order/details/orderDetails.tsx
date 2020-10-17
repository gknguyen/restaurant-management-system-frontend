import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../../configs/APIs';
import { apiGet } from '../../../../configs/axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Card,
  Button,
} from '@material-ui/core';
import { getOrderId } from '../../../../configs/localStore';
import { formatPrice } from '../../../../configs/utils';
import { Order } from '../../../../configs/interfaces';
import * as orderActions from '../../../../redux/orderReducers/actions';
import * as commonActions from '../../../../redux/commonReducers/actions';
import { CURRENCY } from '../../../../configs/constants';
import { green, red } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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
      maxWidth: 1000,
      height: '100%',
      padding: 50,
    },
    orderHeader: {
      textAlign: 'center',
      marginBottom: 10,
    },
    table: {
      maxWidth: 800,
    },
    card: {
      marginBottom: 10,
      padding: 20,
    },
  }),
);

interface Props {
  /** redux params */
  isDisable: boolean;
  order: Order;
  /** redux functions */
  sendDisableFlag: Function;
  sendOrder: Function;
}

const OrderDetails: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const orderId = getOrderId();

  const historyState = history.location.state as any;
  const backToHomeScreen = historyState?.backToHomeScreen;
  const directPath = backToHomeScreen ? '/home' : '/orderList';

  const [order, setOrder] = React.useState<Order>(props.order);

  React.useEffect(() => {
    apiGet(APIs.getOneOrderForOrderScreenUrl, { orderId }).then((HTTPdata) => {
      setOrder(HTTPdata.values);
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container spacing={2} direction="column">
        <Grid container item xs={12} justify="center">
          <Paper className={classes.paper}>
            <Typography className={classes.orderHeader} variant="h5">
              Cart Summary{' '}
              {order.activeStatus ? (
                <ErrorIcon style={{ color: red[600] }} />
              ) : (
                <CheckCircleIcon style={{ color: green[500] }} />
              )}
            </Typography>

            <Card className={classes.card} variant="outlined">
              <Typography variant="h6" gutterBottom>
                <b>Customer information</b>
              </Typography>

              <Grid container>
                <Grid item xs={12} sm={6} md={2}>
                  <b>Name:</b>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {order.customer.fullName}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <b>Phone:</b>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {order.customer.phoneNumber}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <b>Email:</b>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {order.customer.email}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <b>Address:</b>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {order.customer.address}
                </Grid>
              </Grid>
            </Card>

            <Card className={classes.card} variant="outlined">
              <Typography variant="h6" gutterBottom>
                <b>Order Detail</b>
              </Typography>

              <TableContainer component={Paper}>
                <Table size="small">
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
            </Card>

            <Card className={classes.card} variant="outlined">
              <Typography variant="h6" gutterBottom>
                <b>General Information</b>
              </Typography>

              <Grid container>
                <Grid item xs={12} sm={6} md={2}>
                  <b>Create At:</b>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {order.createDateTime}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <b>Total:</b>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {formatPrice(order.finalPrice)} {CURRENCY}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <b>Edit At:</b>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {order.editDateTime}
                </Grid>
              </Grid>
            </Card>
          </Paper>
        </Grid>

        <Grid container item xs={12} justify="center">
          <Button variant="contained" color="secondary" onClick={() => history.push(directPath)}>
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    isDisable: state.commonReducer.isDisable,
    order: state.orderReducer.order,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
