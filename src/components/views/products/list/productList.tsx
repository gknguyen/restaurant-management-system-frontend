import { Dialog, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../../../commons/searchBar';
import * as routes from '../../../../configs/APIs';
import Axios, { apiGet, apiDelete } from '../../../../configs/axios';
import { ProductHeadCell, Product, HTTPdata } from '../../../../configs/interfaces';
import * as productActions from '../../../../redux/productReducers/actions';
import * as commonActions from '../../../../redux/commonReducers/actions';
import ProductTable from './components/productTable';
import * as APIs from '../../../../configs/APIs';
import { showSnackBarAlert } from '../../../../configs/utils';

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

interface Props {
  searchValue: string;
  productIdList: string[];
  isDisable: boolean;
  sendProductTableHeadCells: Function;
  getProductList: Function;
  sendProductList: Function;
  searchProductList: Function;
  sendDisableFlag: Function;
}

const ProductList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.sendDisableFlag(true);
  }, []);

  if (props.searchValue) {
    apiGet(APIs.searchListProductUrl, { searchValue: props.searchValue }).then((HTTPdata) =>
      processDataToTable(HTTPdata),
    );
  } else {
    apiGet(APIs.getListProductUrl).then((HTTPdata) => processDataToTable(HTTPdata));
  }

  const processDataToTable = (HTTPdata: HTTPdata) => {
    const productList: Product[] = [];
    const serverProductList: any[] = HTTPdata.values;
    serverProductList.forEach((serverProduct) => {
      const product = {
        id: serverProduct.id || null,
        name: serverProduct.name || null,
        price: serverProduct.price || null,
        unit: serverProduct.unit || null,
        amount: serverProduct.amount || null,
        active: serverProduct.activeStatus || null,
        productTypeName: serverProduct.productType ? serverProduct.productType.typeName : null,
        menuTypeName: serverProduct.menuType ? serverProduct.menuType.typeName : null,
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
    apiDelete(APIs.deleteListProductUrl, { productIdList: props.productIdList }).then(() =>
      window.location.reload(true),
    );
    setOpen(false);
  };

  const handleClickOpen = () => {
    if (props.productIdList && props.productIdList.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Do yo want to delete these products?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          These products will be deleted permanently
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteHandler} color="primary">
          Agree
        </Button>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container maxWidth="xl">
      <Box display="flex">
        <Grid className={classes.grid} container={true} spacing={2} direction="row">
          <Grid container={true} item={true} xs={12}>
            <Typography component="h1" variant="h4">
              Product List
            </Typography>
          </Grid>
          <Grid container={true} item={true} md={6} xs="auto" justify="flex-start">
            <SearchBar />
          </Grid>
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
            {deleteDialog}
          </Grid>
          <Grid container={true} item={true} xs={12}>
            <ProductTable />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    productIdList: state.productReducer.productIdList,
    searchValue: state.commonReducer.searchValue,
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendProductTableHeadCells: (headCells: ProductHeadCell[]) => {
      dispatch(productActions.actionReceiveProductTableHeadCells(headCells));
    },
    getProductList: () => {
      dispatch(productActions.actionGetProductListUrl());
    },
    sendProductList: (productList: Product[]) => {
      dispatch(productActions.actionReceiveProductList(productList));
    },
    searchProductList: (searchValue: string) => {
      dispatch(productActions.actionSearchProductListUrl(searchValue));
    },
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
