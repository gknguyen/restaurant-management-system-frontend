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
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Order } from '../../../configs/interfaces';
import { apiGet } from '../../../configs/axios';
import * as APIs from '../../../configs/APIs';
import { formatPrice } from '../../../configs/utils';
import { CURRENCY } from '../../../configs/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 500,
    },
  }),
);

interface Props {
  /** params */
  open: boolean;
  /** functions */
  cancelCallBack: Function;
}

const UnpaidOrderList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [orderList, setOrderList] = React.useState<Order[]>([]);

  React.useEffect(() => {
    apiGet(APIs.getUnpaidOrderListForMainScreenUrl).then((HTTPdata) => {
      setOrderList(HTTPdata.values);
    });
  }, []);

  const orderListField = orderList.map((order, index) => {
    if (order) {
      return (
        <Grid container item xs={4} key={index}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Grid container justify="space-between" style={{ padding: 10 }}>
                <Typography component="span">Order: {order.no}</Typography>
                <Typography component="span">Customer: {order.customer.fullName}</Typography>
              </Grid>

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
                </Table>
              </TableContainer>

              <Typography style={{ padding: 10 }}>
                Total: {formatPrice(order.finalPrice)} {CURRENCY}
              </Typography>
            </CardContent>

            <CardActions>
              <Button color="primary" onClick={() => props.cancelCallBack()}>
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
  return {};
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UnpaidOrderList);
