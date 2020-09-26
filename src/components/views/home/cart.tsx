import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable, { Column } from 'material-table';
import React from 'react';
import { connect } from 'react-redux';
import DraggableDialog from '../../../commons/draggable';
import tableIcons from '../../../commons/tables/tableIcons';
import { OrderDetail, Order } from '../../../configs/interfaces';
import { formatPrice } from '../../../configs/utils';
import * as orderActions from '../../../redux/orderReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableHeader: {
      background: 'linear-gradient(45deg, #4e342e 30%, #a1887f 90%)',
    },
    tableCell: {
      color: '#ffffff',
    },
    paperWidthSm: {
      maxWidth: '100%',
    },
  }),
);

const headers: Column<OrderDetail>[] = [
  {
    field: 'product.name',
    title: 'Name',
    sorting: false,
    editable: 'never',
    headerStyle: {
      width: '100%',
      minWidth: 150,
    },
    cellStyle: {
      width: '100%',
      minWidth: 150,
    },
  },
  {
    field: 'product.price',
    title: 'Price',
    sorting: false,
    editable: 'never',
    headerStyle: {
      textAlign: 'end',
      width: '100%',
      minWidth: 100,
    },
    cellStyle: {
      textAlign: 'end',
      width: '100%',
      minWidth: 100,
    },
  },
  {
    field: 'quantity',
    title: 'Quantity',
    sorting: false,
    type: 'numeric',
    headerStyle: {
      textAlign: 'end',
      width: '100%',
      minWidth: 100,
    },
    cellStyle: {
      textAlign: 'end',
      width: '100%',
      minWidth: 100,
    },
  },
  {
    field: 'totalPrice',
    title: 'Total Price',
    sorting: false,
    editable: 'never',
    headerStyle: {
      textAlign: 'end',
      width: '100%',
      minWidth: 100,
    },
    cellStyle: {
      textAlign: 'end',
      width: '100%',
      minWidth: 100,
    },
  },
  {
    field: 'product.unit',
    title: 'Unit',
    sorting: false,
    editable: 'never',
    headerStyle: {
      width: '100%',
      minWidth: 80,
    },
    cellStyle: {
      width: '100%',
      minWidth: 80,
    },
  },
];

interface Props {
  /** params */
  open: boolean;
  /** functions */
  confirmCallBack: Function;
  cancelCallBack: Function;
  /** redux params */
  orderDetails: OrderDetail[];
  finalPrice: number;
  /** redux functions */
  sendOrder: Function;
  sendOrderDetailList: Function;
  sendOrderFinalPrice: Function;
}

const Cart: React.FC<Props> = (props) => {
  const classes = useStyles();

  React.useEffect(() => {}, []);

  return (
    <Dialog
      open={props.open}
      onClose={() => props.cancelCallBack()}
      PaperComponent={DraggableDialog}
      classes={{ paperWidthSm: classes.paperWidthSm }}
    >
      <DialogTitle id="draggable-dialog-title">Cart</DialogTitle>
      <DialogContent>
        <MaterialTable
          icons={tableIcons}
          style={{ width: '100%' }}
          columns={headers}
          data={props.orderDetails}
          localization={{
            header: {
              actions: '',
            },
          }}
          options={{
            search: false,
            toolbar: false,
            selection: false,
            paging: false,
            pageSize: props.orderDetails.length,
            actionsColumnIndex: -1,
            headerStyle: {
              background: 'linear-gradient(0deg, #4e342e 30%, #a1887f 90%)',
              color: '#ffffff',
            },
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                const dataUpdate = [...props.orderDetails];
                if (oldData) {
                  const index = oldData.tableData.id;
                  let newFinalPrice = props.finalPrice - dataUpdate[index].totalPrice;
                  newData.quantity = parseInt(String(newData.quantity));
                  newData.totalPrice = parseInt(String(newData.product.price)) * newData.quantity;
                  newFinalPrice += newData.totalPrice;
                  dataUpdate[index] = newData;
                  props.sendOrderDetailList(dataUpdate);
                  props.sendOrderFinalPrice(newFinalPrice);
                }
                resolve();
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                const dataDelete = [...props.orderDetails];
                const index = oldData.tableData.id;
                const newFinalPrice = props.finalPrice - dataDelete[index].totalPrice;
                dataDelete.splice(index, 1);
                props.sendOrderDetailList(dataDelete);
                props.sendOrderFinalPrice(newFinalPrice);
                resolve();
              }),
          }}
        />

        <Typography style={{ padding: 10 }}>Total: {formatPrice(props.finalPrice)} VND</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.confirmCallBack()}>
          Confirm
        </Button>
        <Button
          color="primary"
          onClick={() => {
            props.sendOrder({
              customer: {},
              orderDetails: [],
              finalPrice: 0,
            });
            props.cancelCallBack();
          }}
        >
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    orderDetails: state.orderReducer.order.orderDetails,
    finalPrice: state.orderReducer.order.finalPrice,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendOrder: (order: Order) => {
      dispatch(orderActions.actionReceiveOrder(order));
    },
    sendOrderDetailList: (orderDetailList: OrderDetail[]) => {
      dispatch(orderActions.actionReceiveOrderDetailList(orderDetailList));
    },
    sendOrderFinalPrice: (price: number) => {
      dispatch(orderActions.actionReceiveOrderFinalPrice(price));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);