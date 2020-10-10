import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../configs/APIs';
import { apiGet } from '../../../configs/axios';
import { AWS_S3_BUCKET_URL, CURRENCY } from '../../../configs/constants';
import { MenuType, Order, OrderDetail, Product } from '../../../configs/interfaces';
import { formatPrice, reverseformatPrice, showSnackBarAlert } from '../../../configs/utils';
import * as commonActions from '../../../redux/commonReducers/actions';
import * as menuTypeActions from '../../../redux/menuTypeReducers/actions';
import * as orderActions from '../../../redux/orderReducers/actions';
import * as productActions from '../../../redux/productReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      flexWrap: 'wrap',
      // maxWidth: 1200,
    },
    card: {
      width: 400,
      maxWidth: 400,
    },
    cardMedia: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      border: '1px solid #90776f',
      borderRadius: '3%',
    },
    cardImage: {
      width: 150,
    },
    cardHeader: {
      textAlign: 'center',
      padding: '10px 16px',
    },
    cardHeaderTitle: {
      fontSize: 18,
    },
    cardHeaderSubHeader: {
      fontSize: 15,
    },
    cardContent: {
      padding: '0px 16px 10px 16px',
    },
    cardAvatar: {
      backgroundColor: red[500],
    },
  }),
);

interface Props {
  /** redux params */
  isDisable: boolean;
  menuTypeList: MenuType[];
  productList: Product[];
  order: Order;
  /** redux functions */
  sendDisableFlag: Function;
  sendMenuTypeList: Function;
  sendProductList: Function;
  sendOrder: Function;
}

const Home: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [menuTypeList, setMenuTypeList] = React.useState<MenuType[]>(props.menuTypeList);
  const [productList, setProductList] = React.useState<Product[]>(props.productList);
  const [orderDetail, setOrderDetail] = React.useState<OrderDetail>({} as OrderDetail);
  const [valueIndex, setValueindex] = React.useState<number | undefined>(undefined);
  const [value, setValue] = React.useState<string>('');
  const [errorIndex, setErrorIndex] = React.useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  React.useEffect(() => {
    // props.sendDisableCartButton(false);
    apiGet(APIs.getListMenuTypeUrl).then((HTTPdata) => {
      setMenuTypeList(HTTPdata.values);
      props.sendMenuTypeList(HTTPdata.values);
    });
    apiGet(APIs.getListProductForMainScreenUrl).then((HTTPdata) => {
      setProductList(HTTPdata.values);
      props.sendProductList(HTTPdata.values);
    });
  }, []);

  /** filter */
  const filterMenuHandler = (typeName: string) => {
    const filterProductList = props.productList.filter(
      (product) => product.menuType.typeName === typeName,
    );
    setProductList(filterProductList);
  };

  const allMenuHandler = () => {
    setProductList(props.productList);
  };

  /** update cart */
  const inputAmountHandler = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    unit: string,
  ) => {
    props.order.finalPrice = 0;
    const orderDetailForm = {
      product: {} as Product,
      quantity: 0,
      totalPrice: 0,
    } as OrderDetail;
    orderDetailForm.product.name = event.target.name;
    orderDetailForm.product.unit = unit;
    orderDetailForm.quantity = parseInt(event.target.value);
    setOrderDetail(orderDetailForm);
    setErrorIndex(undefined);
    setErrorMessage('');
    setValueindex(index);
    setValue(event.target.value);
  };

  const orderHandler = (
    index: number,
    name: string,
    formatedPrice: string | number,
    unit: string,
  ) => {
    if (name === orderDetail.product?.name && orderDetail.quantity > 0) {
      let addNew = true;
      for (let detail of props.order.orderDetails) {
        if (detail.product.name === name) {
          detail.product.price = reverseformatPrice(formatedPrice);
          detail.product.unit = unit;
          detail.quantity += orderDetail.quantity;
          detail.totalPrice += reverseformatPrice(formatedPrice) * orderDetail.quantity;
          addNew = false;
          break;
        }
      }
      if (addNew) {
        orderDetail.product.price = reverseformatPrice(formatedPrice);
        orderDetail.product.unit = unit;
        orderDetail.totalPrice = reverseformatPrice(formatedPrice) * orderDetail.quantity;
        props.order.orderDetails.push(orderDetail);
      }
      for (let detail of props.order.orderDetails) {
        props.order.finalPrice += detail.totalPrice;
      }
      props.sendOrder(props.order);
      showSnackBarAlert(
        5000,
        'success',
        `book ${orderDetail.product.name} : ${orderDetail.quantity}`,
      );
      setErrorIndex(undefined);
      setErrorMessage('');
      setValueindex(undefined);
      setValue('');
      setOrderDetail({} as OrderDetail);
    } else {
      setErrorIndex(index);
      setErrorMessage('Please enter the quantity');
    }
  };

  /** render */
  const menuTypeListField = menuTypeList.map((menuType, index) => {
    if (menuType) {
      return (
        <Grid key={index} item>
          <Button color="primary" onClick={() => filterMenuHandler(menuType.typeName)}>
            {menuType.typeName}
          </Button>
        </Grid>
      );
    }
  });

  const productListField = productList.map((product, index) => {
    if (product) {
      const productImageUrl = product.image
        ? `${AWS_S3_BUCKET_URL}/products/${product.image}`
        : undefined;
      return (
        <Grid container item lg={3} md={4} sm={6} xs={12} key={index}>
          <Card className={classes.card}>
            <CardMedia className={classes.cardMedia} image={productImageUrl} />

            <CardHeader
              classes={{
                root: classes.cardHeader,
                title: classes.cardHeaderTitle,
                subheader: classes.cardHeaderSubHeader,
              }}
              title={product.name}
              subheader={`${formatPrice(product.price)} ${CURRENCY}`}
            />

            <CardContent
              classes={{
                root: classes.cardContent,
              }}
            >
              <Grid container alignItems="flex-start" justify="center" spacing={2}>
                <Grid item style={{ height: 80 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    margin="dense"
                    name={product.name}
                    value={valueIndex === index ? value : ''}
                    onChange={(event) => inputAmountHandler(index, event, product.unit)}
                    style={{ width: '100%', maxWidth: 200, minWidth: 100 }}
                    error={errorIndex === index}
                    helperText={errorIndex === index ? errorMessage : undefined}
                  />
                </Grid>
                <Grid item style={{ paddingTop: 23 }}>
                  <Typography>Pieces</Typography>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => orderHandler(index, product.name, product.price, product.unit)}
              >
                Order
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  });

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container item xs={12} spacing={3} alignItems="center">
          <Grid item>
            <Button onClick={() => allMenuHandler()}>
              <Typography component="h1" variant="h4">
                Menu
              </Typography>
            </Button>
          </Grid>
          {menuTypeListField}
        </Grid>

        <Divider />

        <Grid container spacing={2} style={{ paddingTop: 30 }}>
          {productListField}
        </Grid>
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    isDisable: state.commonReducer.isDisable,
    menuTypeList: state.menuTypeReducer.menuTypeList,
    productList: state.productReducer.productList,
    order: state.orderReducer.order,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
    sendMenuTypeList: (menuTypeList: MenuType[]) => {
      dispatch(menuTypeActions.actionReceiveMenuTypeList(menuTypeList));
    },
    sendProductList: (productList: Product[]) => {
      dispatch(productActions.actionReceiveProductList(productList));
    },
    sendOrder: (order: Order) => {
      dispatch(orderActions.actionReceiveOrder(order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
