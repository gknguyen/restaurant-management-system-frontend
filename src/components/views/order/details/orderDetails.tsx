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
} from '@material-ui/core';
import { getOrderId } from '../../../../configs/localStore';
import { formatPrice } from '../../../../configs/utils';
import { Order } from '../../../../configs/interfaces';
import * as orderActions from '../../../../redux/orderReducers/actions';
import * as commonActions from '../../../../redux/commonReducers/actions';

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
    },
    table: {
      maxWidth: 800,
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
  // const historyState = history.location.state as any;
  // const orderId = historyState.orderId;

  React.useEffect(() => {
    apiGet(APIs.getOneOrderForOrderScreenUrl, { orderId }).then((HTTPdata) => {
      props.sendOrder(HTTPdata.values);
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container spacing={2} direction="column">
        {/** header */}
        {/* <Grid container item xs={12}>
          <Typography component="h1" variant="h4">
            Order Details
          </Typography>
        </Grid> */}

        <Grid container item xs={12} justify="center">
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
                  {props.order.orderDetails.map((orderDetail, index) => (
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
                    {/* <TableCell colSpan={2}></TableCell> */}
                    {/* <TableCell>Total Price: </TableCell> */}
                    <TableCell>Total: {formatPrice(props.order.finalPrice)} VND</TableCell>
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
