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
import * as menuTypeActions from '../../../../../redux/menuTypeReducers/actions';
import * as productActions from '../../../../../redux/productReducers/actions';
import * as productTypeActions from '../../../../../redux/productTypeReducers/actions';

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

// const mainValues: any = {};

interface Props {
  /** params */
  productTypeList: ProductType[];
  menuTypeList: MenuType[];
  productType: ProductType;
  menuType: MenuType;
  product: Product;
  errorMessages: Product;
  isDisable: boolean;
  /** functions */
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

  const mainDefaultValues = {
    productTypeName: props.product ? props.productType.typeName : null,
    menuTypeName: props.product ? props.menuType.typeName : null,
    name: props.product ? props.product.name : null,
    price: props.product ? props.product.price : null,
    unit: props.product ? props.product.unit : null,
    amount: props.product ? props.product.amount : null,
  };

  const [productTypeName, setProductTypeName] = React.useState(mainDefaultValues.productTypeName);
  const [menuTypeName, setMenuTypeName] = React.useState(mainDefaultValues.menuTypeName);
  const [name, setName] = React.useState(mainDefaultValues.name);
  const [price, setPrice] = React.useState(mainDefaultValues.price);
  const [unit, setUnit] = React.useState((mainDefaultValues.unit = 'VND'));
  const [amount, setAmount] = React.useState(mainDefaultValues.amount);

  const productTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductTypeName(event.target.value);
    const productType = { typeName: event.target.value };
    props.sendProductType(productType);
    props.sendErrorMessageProductType('');
  };
  const menuTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuTypeName(event.target.value);
    const menuType = { typeName: event.target.value };
    props.sendMenuType(menuType);
    props.sendErrorMessageMenuType('');
  };
  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    props.sendName(event.target.value);
    props.sendErrorMessageName('');
  };
  const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value));
    props.sendPrice(parseFloat(event.target.value));
    props.sendErrorMessagePrice('');
  };
  const unitChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
    props.sendUnit(event.target.value);
    props.sendErrorMessageUnit('');
  };
  const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
    props.sendAmount(parseInt(event.target.value));
    props.sendErrorMessageAmount('');
  };

  return (
    <Container className={classes.grid} disableGutters>
      {/** header */}
      <Grid container={true}>
        <Typography className={classes.typography} component="h1" variant="h6">
          Details:
        </Typography>
      </Grid>

      {/** contents */}
      <Grid container={true}>
        <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
          <TextField
            className={classes.textField}
            // required={true}
            select={true}
            fullWidth={true}
            id="outlined-select-required"
            label="Product Type"
            value={productTypeName}
            variant="outlined"
            margin="dense"
            onChange={productTypeChangeHandler}
            error={props.errorMessages.productTypeName ? true : false}
            helperText={props.errorMessages.productTypeName}
            disabled={props.isDisable}
          >
            {props.productTypeList.map((productType) => (
              <MenuItem key={productType.id} value={productType.typeName}>
                {productType.typeName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container={true} item={true} md={6} xs="auto" justify="flex-end">
          <TextField
            className={classes.textField}
            // required={true}
            select={true}
            fullWidth={true}
            id="outlined-select-required"
            label="Menu Type"
            value={menuTypeName}
            variant="outlined"
            margin="dense"
            onChange={menuTypeChangeHandler}
            error={props.errorMessages.menuTypeName ? true : false}
            helperText={props.errorMessages.menuTypeName}
            disabled={props.isDisable}
          >
            {props.menuTypeList.map((menuType) => (
              <MenuItem key={menuType.id} value={menuType.typeName}>
                {menuType.typeName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container={true}>
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Name"
          value={name}
          variant="outlined"
          margin="dense"
          onChange={nameChangeHandler}
          error={props.errorMessages.name ? true : false}
          helperText={props.errorMessages.name}
          disabled={props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Price"
          value={price}
          variant="outlined"
          margin="dense"
          type="number"
          onChange={priceChangeHandler}
          error={props.errorMessages.price ? true : false}
          helperText={props.errorMessages.price}
          disabled={props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Unit"
          value={unit}
          variant="outlined"
          margin="dense"
          onChange={unitChangeHandler}
          error={props.errorMessages.unit ? true : false}
          helperText={props.errorMessages.unit}
          disabled={props.isDisable}
        />
        <TextField
          className={classes.textField}
          // required={true}
          fullWidth={true}
          id="outlined-required"
          label="Amount"
          value={amount}
          variant="outlined"
          margin="dense"
          type="number"
          onChange={amountChangeHandler}
          error={props.errorMessages.amount ? true : false}
          helperText={props.errorMessages.amount}
          disabled={props.isDisable}
        />
      </Grid>
    </Container>
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
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    /** values */
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

    /** error messages */
    sendErrorMessageProductType: (productTypeNameErrorMessage: string) => {
      dispatch(
        productActions.actionReceiveErrorMessageProductTypeName(productTypeNameErrorMessage),
      );
    },
    sendErrorMessageMenuType: (menuTypeNameErrorMessage: string) => {
      dispatch(productActions.actionReceiveErrorMessageMenuTypeName(menuTypeNameErrorMessage));
    },
    sendErrorMessageName: (nameErrorMessage: string) => {
      dispatch(productActions.actionReceiveErrorMessageName(nameErrorMessage));
    },
    sendErrorMessagePrice: (priceErrorMessage: string) => {
      dispatch(productActions.actionReceiveErrorMessagePrice(priceErrorMessage));
    },
    sendErrorMessageUnit: (unitErrorMessage: string) => {
      dispatch(productActions.actionReceiveErrorMessageUnit(unitErrorMessage));
    },
    sendErrorMessageAmount: (amountErrorMessage: string) => {
      dispatch(productActions.actionReceiveErrorMessageAmount(amountErrorMessage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainInfoField);
