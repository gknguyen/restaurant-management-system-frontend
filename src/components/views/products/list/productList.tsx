import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ComfirmDialog from '../../../../commons/dialogs/confirmDialog';
import SearchBar from '../../../../commons/searchBar';
import * as APIs from '../../../../configs/APIs';
import { apiDelete, apiGet } from '../../../../configs/axios';
import { HTTPdata, Product } from '../../../../configs/interfaces';
import { convertDateTime, formatPrice } from '../../../../configs/utils';
import * as commonActions from '../../../../redux/commonReducers/actions';
import * as productActions from '../../../../redux/productReducers/actions';
import ProductTable from './components/productTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    createButton: {
      // background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
    deleteButton: {
      // background: 'linear-gradient(45deg, #ff1744 30%, #ff8a80 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
  }),
);

const headers = [
  { field: 'id', title: 'Id', hidden: true },
  { field: 'name', title: 'Name', sorting: false },
  { field: 'price', title: 'Price', sorting: false },
  { field: 'unit', title: 'Unit', sorting: false },
  { field: 'amount', title: 'Amount', sorting: false },
  { field: 'active', title: 'Active', sorting: false },
  { field: 'productTypeName', title: 'Type', sorting: false },
  { field: 'menuTypeName', title: 'Menu', sorting: false },
  { field: 'editDateTime', title: 'Edit At', sorting: false },
];

interface Props {
  /** redux params */
  productList: any[];
  productIdList: string[];
  isDisable: boolean;
  /** redux functions */
  sendProductList: Function;
  sendDisableFlag: Function;
}

const ProductList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [productIdList, setProductIdList] = React.useState<string[]>([]);

  React.useEffect(() => {
    props.sendDisableFlag(true);
    apiGet(APIs.getListProductForProductScreenUrl).then((HTTPdata) => processDataToTable(HTTPdata));
  }, []);

  const searchHandler = (searchValue: string) => {
    apiGet(APIs.searchListProductForProductScreenUrl, { searchValue }).then((HTTPdata) =>
      processDataToTable(HTTPdata),
    );
  };

  const processDataToTable = (HTTPdata: HTTPdata) => {
    const productList: Product[] = [];
    const serverProductList: any[] = HTTPdata.values;
    serverProductList.forEach((serverProduct) => {
      const product = {
        id: serverProduct.id || null,
        name: serverProduct.name || null,
        price: serverProduct.price ? formatPrice(serverProduct.price) : null,
        unit: serverProduct.unit || null,
        amount: serverProduct.amount || null,
        active: serverProduct.activeStatus ? (
          <CheckCircleIcon style={{ color: green[500] }} />
        ) : (
          <ErrorIcon style={{ color: red[600] }} />
        ),
        productTypeName: serverProduct.productType ? serverProduct.productType.typeName : null,
        menuTypeName: serverProduct.menuType ? serverProduct.menuType.typeName : null,
        editDateTime: serverProduct.editDateTime
          ? convertDateTime(serverProduct.editDateTime)
          : null,
      } as Product;
      productList.push(product);
    });
    props.sendProductList(productList);
    props.sendDisableFlag(false);
  };

  const createHandler = () => {
    history.push('/menu/createProduct');
  };

  const deleteHandler = () => {
    apiDelete(APIs.deleteListProductForProductScreenUrl, { productIdList }).then(() =>
      window.location.reload(),
    );
    setOpen(false);
  };

  const detailHandler = (productId: string) => {
    // sessionStorage.setItem('productId', productId);
    history.push('/menu/productDetails', { productId });
  };

  const onSelectionHandler = (productIdList: string[]) => {
    setProductIdList(productIdList);
  };

  const handleClickOpen = () => {
    if (productIdList && productIdList.length > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="row">
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            Product List
          </Typography>
        </Grid>

        {/** search field */}
        <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
          <SearchBar searchHandlerCallBack={searchHandler} />
        </Grid>

        {/** buttons field */}
        <Grid container={true} item={true} md={6} xs="auto" justify="flex-end">
          <Button
            className={classes.createButton}
            onClick={createHandler}
            size="medium"
            variant="contained"
            color="primary"
            disabled={props.isDisable}
          >
            Create
          </Button>
          <Button
            className={classes.deleteButton}
            onClick={handleClickOpen}
            size="medium"
            variant="contained"
            color="secondary"
            disabled={props.isDisable}
          >
            Delete
          </Button>
        </Grid>

        {/** table field */}
        <Grid container={true} item={true} xs={12}>
          <ProductTable
            headers={headers}
            cells={props.productList}
            onRowClickCallBack={detailHandler}
            onSelectionCallBack={onSelectionHandler}
          />
        </Grid>
      </Grid>

      {/** confirm dialog */}
      <ComfirmDialog
        open={open}
        header="Do yo want to delete these products?"
        content="These products will be deleted permanently"
        confirmCallBack={deleteHandler}
        cancelCallBack={handleClose}
      />
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    productList: state.productReducer.productList,
    productIdList: state.productReducer.productIdList,
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendProductList: (productList: Product[]) => {
      dispatch(productActions.actionReceiveProductList(productList));
    },
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
