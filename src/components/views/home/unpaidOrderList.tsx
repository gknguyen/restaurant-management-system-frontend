import React from 'react';
import { connect } from 'react-redux';
import DraggableDialog from '../../../commons/draggable';
import * as commonActions from '../../../redux/commonReducers/actions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  CardActions,
  CardHeader,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Order } from '../../../configs/interfaces';
import { apiGet } from '../../../configs/axios';
import * as APIs from '../../../configs/APIs';
import { formatPrice } from '../../../configs/utils';
import { CURRENCY } from '../../../configs/constants';
import * as orderActions from '../../../redux/orderReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 500,
    },
    tableHeader: {
      background: 'linear-gradient(0deg, #4e342e 30%, #a1887f 90%)',
    },
  }),
);

interface Props {
  /** params */
  open: boolean;
  /** functions */
  cancelCallBack: Function;
  orderNumberCallBack: Function;
  /** redux params */
  loadUnpaidOrderList: boolean;
  /** redux functions */
  sendOrder: Function;
  sendDisableOrderButton: Function;
  sendLoadUnpaidOrderList: Function;
}

const UnpaidOrderList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [orderList, setOrderList] = React.useState<Order[]>([]);

  React.useEffect(() => {
    if (props.loadUnpaidOrderList) {
      apiGet(APIs.getUnpaidOrderListForMainScreenUrl).then((HTTPdata) => {
        setOrderList(HTTPdata.values);
        const unpaidOrderNumber = HTTPdata.values.length as number;
        if (unpaidOrderNumber > 0) props.sendDisableOrderButton(false);
        else props.sendDisableOrderButton(true);
        props.orderNumberCallBack(unpaidOrderNumber);
      });
      props.sendLoadUnpaidOrderList(false);
    }
  }, [props.loadUnpaidOrderList]);

  const confirmHandler = (order: Order) => {
    props.sendOrder(order);
    props.cancelCallBack();
  };

  const orderListField = orderList.map((order, index) => {
    if (order) {
      return (
        <Grid container item xs key={index}>
          <Card className={classes.card} variant="outlined">
            <CardHeader
              title={`Order: ${order.no}`}
              subheader={`Customer: ${order.customer.fullName}`}
            />

            <CardContent>
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
                Total: {formatPrice(order.finalPrice)} {CURRENCY}
              </Typography>
            </CardContent>

            <CardActions>
              <Button color="primary" onClick={() => confirmHandler(order)}>
                Choose
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  });

  return (
    <Dialog
      open={props.open}
      onClose={() => props.cancelCallBack()}
      PaperComponent={DraggableDialog}
      maxWidth="xl"
    >
      <DialogTitle id="draggable-dialog-title">Unpaid Order List</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {orderListField}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.cancelCallBack()}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    loadUnpaidOrderList: state.commonReducer.loadUnpaidOrderList,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendOrder: (order: Order) => {
      dispatch(orderActions.actionReceiveOrder(order));
    },
    sendDisableOrderButton: (disableOrderButton: boolean) => {
      dispatch(commonActions.actionDisableOrderButton(disableOrderButton));
    },
    sendLoadUnpaidOrderList: (loadUnpaidOrderList: boolean) => {
      dispatch(commonActions.actionLoadUnpaidOrderList(loadUnpaidOrderList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnpaidOrderList);
