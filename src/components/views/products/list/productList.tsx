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
import Axios from '../../../../configs/axios';
import { ProductHeadCell } from '../../../../configs/interfaces';
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
    search: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      maxWidth: 480,
      flexBasis: 480,
    },
    searchButton: {
      background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
    createButton: {
      background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
    deleteButton: {
      background: 'linear-gradient(45deg, #ff1744 30%, #ff8a80 90%)',
      color: 'white',
      marginLeft: theme.spacing(2),
    },
  }),
);

const productHeadCells: ProductHeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'unit', numeric: true, disablePadding: false, label: 'Unit' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'active', numeric: true, disablePadding: false, label: 'Active' },
  { id: 'productTypeName', numeric: true, disablePadding: false, label: 'Type' },
  { id: 'menuTypeName', numeric: true, disablePadding: false, label: 'Menu' },
];

interface Props {
  searchValue: string;
  productIdList: string[];
  sendProductTableHeadCells: Function;
  getProductList: Function;
  searchProductList: Function;
}

const ProductList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.sendProductTableHeadCells(productHeadCells);
    props.getProductList();
  }, []);

  const searchHandler = () => {
    props.searchProductList(props.searchValue);
  };

  const createHandler = () => {
    history.push('/menu/createProduct');
  };

  const deleteHandler = () => {
    Axios({
      method: 'DELETE',
      url: routes.deleteListProductUrl,
      params: { productIdList: props.productIdList },
    })
      .then((res) => {
        props.sendProductTableHeadCells(productHeadCells);
        props.getProductList();
      })
      .catch((err) => {
        console.log(err);
      });
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
            <div className={classes.search}>
              <SearchBar />
              <Button
                className={classes.searchButton}
                onClick={searchHandler}
                size="medium"
                variant="contained"
              >
                <SearchIcon />
              </Button>
            </div>
          </Grid>
          <Grid container={true} item={true} md={6} xs="auto" justify="flex-end">
            <Button
              className={classes.createButton}
              onClick={createHandler}
              size="medium"
              variant="contained"
            >
              Create
            </Button>
            <Button
              className={classes.deleteButton}
              onClick={handleClickOpen}
              size="medium"
              variant="contained"
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
    searchValue: state.productReducer.searchValue,
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
    searchProductList: (searchValue: string) => {
      dispatch(productActions.actionSearchProductListUrl(searchValue));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
