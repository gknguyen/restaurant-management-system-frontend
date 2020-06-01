import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../../configs/APIs';
import Axios from '../../../../configs/axios';
import { Image, MenuType, Product, ProductType } from '../../../../configs/interfaces';
import * as imageActions from '../../../../redux/reducers/imageReducers/actions';
import * as menuTypeActions from '../../../../redux/reducers/menuTypeReducers/actions';
import * as productActions from '../../../../redux/reducers/productReducers/actions';
import * as productTypeActions from '../../../../redux/reducers/productTypeReducers/actions';
import { getAuthToken } from '../../../utils/localStore';
import { DescriptionField, ImageUploadField, MainInfoField } from './components';
import { checkValidate, errorMessagesForm } from './validate';

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
    card: {
      width: '100%',
      height: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    typography: {
      padding: '0 5px 5px 5px',
    },
    createButton: {
      background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      margin: '10px',
    },
    goBackButton: {
      background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
  }),
);

const createDataForm: any = {};

interface Props {
  productTypeName: string;
  menuTypeName: string;
  name: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  productImage: Image;
  getProductTypeList: Function;
  sendProductType: Function;
  getMenuTypeList: Function;
  sendMenuType: Function;
  sendProduct: Function;
  sendErrorMessageForm: Function;
  sendImageErrorMessage: Function;
}

const CreateProduct: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const token = getAuthToken();

  createDataForm.productTypeName = props.productTypeName;
  createDataForm.menuTypeName = props.menuTypeName;
  createDataForm.name = props.name;
  createDataForm.price = props.price;
  createDataForm.unit = props.unit;
  createDataForm.amount = props.amount;
  createDataForm.description = props.description;
  createDataForm.image = props.productImage.name;
  console.log('createDataForm: ', createDataForm);

  useEffect(() => {
    props.getProductTypeList();
    props.getMenuTypeList();
  }, []);

  const goBackHandler = () => {
    props.sendProductType({});
    props.sendMenuType({});
    props.sendProduct({});
    props.sendErrorMessageForm({});
    props.sendImageErrorMessage('');
    history.push('/menu/productList');
  };

  const createHandler = (event: any) => {
    event.preventDefault();
    const results = checkValidate(createDataForm, true);
    if (results) {
      Axios({
        method: 'POST',
        url: APIs.createOneProductUrl,
        data: createDataForm,
      })
        .then(() => {
          Axios({
            method: 'GET',
            url: APIs.getSignedUrl,
            params: {
              fileName: props.productImage.name,
              fileType: props.productImage.type,
              folderName: 'products',
            },
          })
            .then((res) => {
              const signedUrl: string = res.data.values;
              Axios({
                method: 'PUT',
                url: signedUrl,
                headers: { 'Content-Type': props.productImage.type },
                data: props.productImage,
              })
                .then(() => {
                  history.push('/menu/productList');
                })
                .catch((err) => {
                  console.log(err.response.data);
                });
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      props.sendImageErrorMessage(errorMessagesForm.image);
      // console.log('errorMessagesForm: ', errorMessagesForm);
      history.push('/menu/createProduct');
    }
  };

  return (
    <Container maxWidth='xl'>
      <Grid className={classes.grid} container={true} spacing={2} direction='column'>
        <Grid container={true} item={true} xs={12}>
          <Typography component='h1' variant='h4'>
            New Product
          </Typography>
        </Grid>
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <form>
              <Box display='flex'>
                <Grid
                  className={classes.grid}
                  container={true}
                  direction='row'
                  justify='center'
                  alignItems='flex-start'
                >
                  <Grid container={true} item={true} md={5} xs='auto'>
                    <Grid container={true} item={true} xs={12}>
                      <ImageUploadField />
                    </Grid>
                    <Grid container={true} item={true} xs={12} justify='center' alignItems='center'>
                      <Button
                        className={classes.goBackButton}
                        variant='contained'
                        color='primary'
                        onClick={goBackHandler}
                      >
                        Go Back
                      </Button>
                      <Button
                        className={classes.createButton}
                        variant='contained'
                        color='primary'
                        onClick={createHandler}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container={true} item={true} md={7} xs='auto'>
                    <Grid container={true} item={true} xs={12} justify='space-between' direction='column'>
                      <MainInfoField />
                    </Grid>
                    <Grid container={true} item={true} xs={12}>
                      <DescriptionField />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
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
    productImage: state.imageReducer.imageFile,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProductTypeList: () => {
      dispatch(productTypeActions.actionGetProductTypeListUrl());
    },
    sendProductType: (productType: ProductType) => {
      dispatch(productTypeActions.actionReceiveProductType(productType));
    },
    getMenuTypeList: () => {
      dispatch(menuTypeActions.actionGetMenuTypeListUrl());
    },
    sendMenuType: (menuType: MenuType) => {
      dispatch(menuTypeActions.actionReceiveMenuType(menuType));
    },
    sendProduct: (product: Product) => {
      dispatch(productActions.actionReceiveProduct(product));
    },
    sendErrorMessageForm: (errorMessagesForm: Product) => {
      dispatch(productActions.actionReceiveErrorMessages(errorMessagesForm));
    },
    sendImageErrorMessage: (errorMessage: string) => {
      dispatch(imageActions.actionReceiveErrorMessage(errorMessage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
