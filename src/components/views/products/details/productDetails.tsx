import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../../configs/APIs';
import { apiGet } from '../../../../configs/axios';
import { AWS_S3_BUCKET_URL, NO_IMAGE_URL } from '../../../../configs/constants';
import { MenuType, Product, ProductType } from '../../../../configs/interfaces';
import { getProductId } from '../../../../configs/localStore';
import * as imageActions from '../../../../redux/imageReducers/actions';
import * as menuTypeActions from '../../../../redux/menuTypeReducers/actions';
import * as productActions from '../../../../redux/productReducers/actions';
import * as productTypeActions from '../../../../redux/productTypeReducers/actions';
import EditProduct from '../createAndEdit/editProduct';

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
      // background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
      color: 'white',
      margin: '10px',
      width: 95,
    },
    goBackButton: {
      // background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
  }),
);

interface Props {
  /** params */
  productTypeName: string;
  menuTypeName: string;
  name: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  image: string;
  /** functions */
  sendProductType: Function;
  sendMenuType: Function;
  sendProduct: Function;
  sendEditOpenFlag: Function;
  sendErrorMessageForm: Function;
  sendImageFilesName: Function;
}

const ProductDetails: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const productId = getProductId();

  const productImageUrl = `${AWS_S3_BUCKET_URL}/products/${props.image}`;

  React.useEffect(() => {
    apiGet(APIs.getOneProductUrl, { productId }).then((HTTPdata) => {
      const serverProduct = HTTPdata.values;

      const productType = serverProduct.productType as ProductType;
      const menuType = serverProduct.menuType as MenuType;
      const product = {
        id: serverProduct.id,
        name: serverProduct.name,
        price: serverProduct.price,
        unit: serverProduct.unit,
        amount: serverProduct.amount,
        active: serverProduct.activeStatus,
        image: serverProduct.image,
        description: serverProduct.description,
      } as Product;

      props.sendProduct(product);
      props.sendProductType(productType);
      props.sendMenuType(menuType);
    });
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
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            Product Details
          </Typography>
        </Grid>

        {/** contents */}
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <Box display="flex">
              <Grid
                className={classes.grid}
                container={true}
                spacing={3}
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid container={true} item={true} spacing={1} md={5} xs="auto">
                  {/** image field */}
                  <Grid container={true} item={true} xs={12}>
                    <img
                      alt="Select file"
                      className={classes.image}
                      src={props.image ? productImageUrl : NO_IMAGE_URL}
                    />
                  </Grid>

                  {/** buttons field */}
                  <Grid container={true} item={true} xs={12} justify="center" alignItems="flex-end">
                    <Button
                      className={classes.goBackButton}
                      variant="contained"
                      color="secondary"
                      onClick={goBackHandler}
                    >
                      Go Back
                    </Button>
                    <Button
                      className={classes.editButton}
                      variant="contained"
                      color="primary"
                      onClick={editHandler}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>

                {/** informations field */}
                <Grid container={true} item={true} md={7} xs="auto" spacing={3} direction="column">
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography component="h1" variant="h4">
                      {props.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>
                      {props.price} {props.unit}
                    </Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Breadcrumbs>
                      <Typography color="textPrimary">{props.productTypeName}</Typography>
                      <Typography color="textPrimary">{props.menuTypeName}</Typography>
                    </Breadcrumbs>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>Amount: {props.amount}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography>{props.description}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/** edit field */}
      <EditProduct />
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    productTypeName: state.productTypeReducer.productType.typeName,
    menuTypeName: state.menuTypeReducer.menuType.typeName,
    name: state.productReducer.product.name,
    price: state.productReducer.product.price,
    unit: state.productReducer.product.unit,
    amount: state.productReducer.product.amount,
    description: state.productReducer.product.description,
    image: state.productReducer.product.image,
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
    sendErrorMessageForm: (errorMessagesForm: Product) => {
      dispatch(productActions.actionReceiveErrorMessages(errorMessagesForm));
    },
    sendImageFilesName: (imageFilesName: string) => {
      dispatch(imageActions.actionReceiveImageFilesName(imageFilesName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
