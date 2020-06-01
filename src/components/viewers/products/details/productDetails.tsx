import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AWS_S3_BUCKET_URL, NO_IMAGE_URL } from '../../../../configs/constants';
import { MenuType, Product, ProductType } from '../../../../configs/interfaces';
import * as menuTypeActions from '../../../../redux/reducers/menuTypeReducers/actions';
import * as productActions from '../../../../redux/reducers/productReducers/actions';
import * as productTypeActions from '../../../../redux/reducers/productTypeReducers/actions';
import { getProductId } from '../../../utils/localStore';
import { EditProduct } from '../createAndEdit';

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
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    editButton: {
      background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
      color: 'white',
      margin: '10px',
      width: 95,
    },
    goBackButton: {
      background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
  }),
);

interface Props {
  productType: ProductType;
  menuType: MenuType;
  product: Product;
  sendProductType: Function;
  sendMenuType: Function;
  sendProduct: Function;
  sendEditOpenFlag: Function;
  sendProductId: Function;
  sendErrorMessageForm: Function;
}

const ProductDetails: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const productId = getProductId();

  const productImageUrl = AWS_S3_BUCKET_URL + '/products/' + props.product.image;

  useEffect(() => {
    props.sendProductId(productId);
  }, []);

  const editHandler = () => {
    props.sendEditOpenFlag(true);
  };

  const goBackHandler = () => {
    props.sendProductType({});
    props.sendMenuType({});
    props.sendProduct({});
    props.sendErrorMessageForm({});
    history.push('/menu/productList');
  };

  return (
    <Container maxWidth='xl'>
      <Grid className={classes.grid} container={true} spacing={2} direction='column'>
        <Grid container={true} item={true} xs={12}>
          <Typography component='h1' variant='h4'>
            Product Details
          </Typography>
        </Grid>
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <Box display='flex'>
              <Grid
                className={classes.grid}
                container={true}
                spacing={3}
                direction='row'
                justify='center'
                alignItems='flex-start'
              >
                <Grid container={true} item={true} spacing={1} md={5} xs='auto'>
                  <Grid container={true} item={true} xs={12}>
                    <img
                      alt='Select file'
                      className={classes.image}
                      src={props.product.image ? productImageUrl : NO_IMAGE_URL}
                    />
                  </Grid>
                  <Grid container={true} item={true} xs={12} justify='center' alignItems='flex-end'>
                    <Button
                      className={classes.goBackButton}
                      variant='contained'
                      color='primary'
                      onClick={goBackHandler}
                    >
                      Go Back
                    </Button>
                    <Button
                      className={classes.editButton}
                      variant='contained'
                      color='primary'
                      onClick={editHandler}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
                <Grid container={true} item={true} md={7} xs='auto' spacing={3} direction='column'>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify='center'
                    alignItems='flex-start'
                  >
                    <Typography component='h1' variant='h4'>
                      {props.product.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify='center'
                    alignItems='flex-start'
                  >
                    <Typography>
                      {props.product.price} {props.product.unit}
                    </Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify='center'
                    alignItems='flex-start'
                  >
                    <Breadcrumbs>
                      {props.productType ? (
                        <Typography color='textPrimary'>
                          {props.productType.typeName}
                          {/* {productType.typeName} */}
                        </Typography>
                      ) : null}
                      {props.menuType ? (
                        <Typography color='textPrimary'>
                          {props.menuType.typeName}
                          {/* {menuType.typeName} */}
                        </Typography>
                      ) : null}
                    </Breadcrumbs>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify='center'
                    alignItems='flex-start'
                  >
                    <Typography>Amount: {props.product.amount}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify='center'
                    alignItems='flex-start'
                  >
                    <Typography>{props.product.description}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <EditProduct />
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    productType: state.productTypeReducer.productType,
    menuType: state.menuTypeReducer.menuType,
    product: state.productReducer.product,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendProductType: (productType: ProductType) => {
      dispatch(productTypeActions.actionReceiveProductType(productType));
    },
    sendMenuType: (menuType: MenuType) => {
      dispatch(menuTypeActions.actionReceiveMenuType(menuType));
    },
    sendProduct: (product: Product) => {
      dispatch(productActions.actionReceiveProduct(product));
    },
    sendEditOpenFlag: (open: boolean) => {
      dispatch(productActions.actionReceiveEditOpenFlag(open));
    },
    sendProductId: (productId: string) => {
      dispatch(productActions.actionGetProductUrl(productId));
    },
    sendErrorMessageForm: (errorMessagesForm: Product) => {
      dispatch(productActions.actionReceiveErrorMessages(errorMessagesForm));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
