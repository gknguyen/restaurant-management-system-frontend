import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MenuType, Product, ProductType } from '../../../../../configs/interfaces';
import * as menuTypeActions from '../../../../../redux/reducers/menuTypeReducers/actions';
import * as productActions from '../../../../../redux/reducers/productReducers/actions';
import * as productTypeActions from '../../../../../redux/reducers/productTypeReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    textField: {
      padding: '0 5px 10px 5px',
    },
    typography: {
      padding: '0 5px 5px 5px',
    },
  }),
);

const mainValues: any = {};

interface Props {
  productTypeList: ProductType[];
  menuTypeList: MenuType[];
  productType: ProductType;
  menuType: MenuType;
  product: Product;
  errorMessages: Product;
  sendProductTypeName: Function;
  sendProductType: Function;
  sendMenuTypeName: Function;
  sendMenuType: Function;
  sendName: Function;
  sendPrice: Function;
  sendUnit: Function;
  sendAmount: Function;
  sendErrorMessageProductType: Function;
  sendErrorMessageMenuType: Function;
  sendErrorMessageName: Function;
  sendErrorMessagePrice: Function;
  sendErrorMessageUnit: Function;
  sendErrorMessageAmount: Function;
}

const MainInfoField: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // console.log('errorMessages: ', errorMessages);
  console.log('props.errorMessages: ', props.errorMessages);

  const mainDefaultValues = {
    productTypeName: props.product ? props.productType.typeName : null,
    menuTypeName: props.product ? props.menuType.typeName : null,
    name: props.product ? props.product.name : null,
    price: props.product ? props.product.price : null,
    unit: props.product ? props.product.unit : null,
    amount: props.product ? props.product.amount : null,
  };
  // console.log('mainDefaultValues: ', mainDefaultValues);

  const [productTypeName, setProductTypeName] = React.useState(mainDefaultValues.productTypeName);
  const [menuTypeName, setMenuTypeName] = React.useState(mainDefaultValues.menuTypeName);

  props.sendProductTypeName(productTypeName);
  props.sendMenuTypeName(menuTypeName);

  const productTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductTypeName(event.target.value);
    const productType = {
      typeName: event.target.value,
    };
    props.sendProductType(productType);
    props.sendErrorMessageProductType('');
  };
  const menuTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuTypeName(event.target.value);
    const menuType = {
      typeName: event.target.value,
    };
    props.sendMenuType(menuType);
    props.sendErrorMessageMenuType('');
  };
  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendName(event.target.value);
    props.sendErrorMessageName('');
  };
  const priceChangeHandler = (event: any) => {
    props.sendPrice(event.target.value);
    props.sendErrorMessagePrice('');
  };
  const unitChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendUnit(event.target.value);
    props.sendErrorMessageUnit('');
  };
  const amountChangeHandler = (event: any) => {
    props.sendAmount(event.target.value);
    props.sendErrorMessageAmount('');
  };

  return (
    <Grid className={classes.grid} container={true} xs={true}>
      <Grid container={true} item={true} xs={12} justify="flex-start">
        <Typography className={classes.typography} component="h1" variant="h6">
          Details:
        </Typography>
      </Grid>
      <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
        <Container disableGutters={true}>
          <TextField
            className={classes.textField}
            required={true}
            select={true}
            fullWidth={true}
            id="outlined-select-required"
            label="Product Type"
            value={productTypeName}
            defaultValue={productTypeName}
            variant="outlined"
            margin="dense"
            onChange={productTypeChangeHandler}
            error={props.errorMessages.productTypeName ? true : false}
            helperText={props.errorMessages.productTypeName}
          >
            {props.productTypeList.map((productType) => (
              <MenuItem key={productType.id} value={productType.typeName}>
                {productType.typeName}
              </MenuItem>
            ))}
          </TextField>
        </Container>
      </Grid>
      <Grid container={true} item={true} md={6} xs="auto" justify="flex-end">
        <Container disableGutters={true}>
          <TextField
            className={classes.textField}
            required={true}
            select={true}
            fullWidth={true}
            id="outlined-select-required"
            label="Menu Type"
            value={menuTypeName}
            defaultValue={menuTypeName}
            variant="outlined"
            margin="dense"
            onChange={menuTypeChangeHandler}
            error={props.errorMessages.menuTypeName ? true : false}
            helperText={props.errorMessages.menuTypeName}
          >
            {props.menuTypeList.map((menuType) => (
              <MenuItem key={menuType.id} value={menuType.typeName}>
                {menuType.typeName}
              </MenuItem>
            ))}
          </TextField>
        </Container>
      </Grid>
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Name"
        defaultValue={mainDefaultValues.name}
        variant="outlined"
        margin="dense"
        onChange={nameChangeHandler}
        error={props.errorMessages.name ? true : false}
        helperText={props.errorMessages.name}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Price"
        defaultValue={mainDefaultValues.price}
        variant="outlined"
        margin="dense"
        type="number"
        onChange={priceChangeHandler}
        error={props.errorMessages.price ? true : false}
        helperText={props.errorMessages.price}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Unit"
        defaultValue={mainDefaultValues.unit}
        variant="outlined"
        margin="dense"
        onChange={unitChangeHandler}
        error={props.errorMessages.unit ? true : false}
        helperText={props.errorMessages.unit}
      />
      <TextField
        className={classes.textField}
        required={true}
        fullWidth={true}
        id="outlined-required"
        label="Amount"
        defaultValue={mainDefaultValues.amount}
        variant="outlined"
        margin="dense"
        type="number"
        onChange={amountChangeHandler}
        error={props.errorMessages.amount ? true : false}
        helperText={props.errorMessages.amount}
      />
    </Grid>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    productTypeList: state.productTypeReducer.productTypeList,
    productType: state.productTypeReducer.productType,
    menuTypeList: state.menuTypeReducer.menuTypeList,
    menuType: state.menuTypeReducer.menuType,
    product: state.productReducer.product,
    errorMessages: state.productReducer.errorMessages,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendProductTypeName: (productTypeName: string) => {
      dispatch(productTypeActions.actionGetProductTypeIdUrl(productTypeName));
    },
    sendProductType: (productType: ProductType) => {
      dispatch(productTypeActions.actionReceiveProductType(productType));
    },
    sendMenuTypeName: (menuTypeName: string) => {
      dispatch(menuTypeActions.actionGetMenuTypeIdUrl(menuTypeName));
    },
    sendMenuType: (menuType: MenuType) => {
      dispatch(menuTypeActions.actionReceiveMenuType(menuType));
    },
    sendName: (name: string) => {
      dispatch(productActions.actionReceiveNameValue(name));
    },
    sendPrice: (price: number) => {
      dispatch(productActions.actionReceivePriceValue(price));
    },
    sendUnit: (unit: string) => {
      dispatch(productActions.actionReceiveUnitValue(unit));
    },
    sendAmount: (amount: number) => {
      dispatch(productActions.actionReceiveAmountValue(amount));
    },
    sendErrorMessageProductType: (productTypeName: string) => {
      dispatch(productActions.actionReceiveErrorMessageProductTypeName(productTypeName));
    },
    sendErrorMessageMenuType: (menuTypeName: string) => {
      dispatch(productActions.actionReceiveErrorMessageMenuTypeName(menuTypeName));
    },
    sendErrorMessageName: (name: string) => {
      dispatch(productActions.actionReceiveErrorMessageName(name));
    },
    sendErrorMessagePrice: (price: string) => {
      dispatch(productActions.actionReceiveErrorMessagePrice(price));
    },
    sendErrorMessageUnit: (unit: string) => {
      dispatch(productActions.actionReceiveErrorMessageUnit(unit));
    },
    sendErrorMessageAmount: (amount: string) => {
      dispatch(productActions.actionReceiveErrorMessageAmount(amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainInfoField);
