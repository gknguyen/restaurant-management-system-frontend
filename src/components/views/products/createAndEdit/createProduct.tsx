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
import Axios, { apiGet, apiPost } from '../../../../configs/axios';
import { MenuType, Product, ProductType } from '../../../../configs/interfaces';
import * as imageActions from '../../../../redux/imageReducers/actions';
import * as menuTypeActions from '../../../../redux/menuTypeReducers/actions';
import * as productActions from '../../../../redux/productReducers/actions';
import * as productTypeActions from '../../../../redux/productTypeReducers/actions';
import * as commonActions from '../../../../redux/commonReducers/actions';
import { getAuthToken } from '../../../../configs/localStore';
import DescriptionField from './components/descriptionField';
import ImageUploadField from './components/imageUploadField';
import MainInfoField from './components/mainInfoField';
import { checkValidate, errorMessagesForm } from './validate';
import { HEADER_FILE_UPLOAD } from '../../../../configs/constants';
import { showSnackBarAlert } from '../../../../configs/utils';
import MESSAGE from '../../../../configs/messages';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      // background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      margin: '10px',
    },
    goBackButton: {
      // background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
    progressBar: {
      width: '50%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

const createDataForm: any = {};
// const createDataForm = new FormData();

interface Props {
  productTypeName: string;
  menuTypeName: string;
  name: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  productImage: File;
  isDisable: boolean;
  getProductTypeList: Function;
  sendProductTypeList: Function;
  sendProductType: Function;
  getMenuTypeList: Function;
  sendMenuTypeList: Function;
  sendMenuType: Function;
  sendProduct: Function;
  sendErrorMessageForm: Function;
  sendImageErrorMessage: Function;
  sendDisableFlag: Function;
}

const CreateProduct: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  createDataForm.productTypeName = props.productTypeName;
  createDataForm.menuTypeName = props.menuTypeName;
  createDataForm.name = props.name;
  createDataForm.price = props.price;
  createDataForm.unit = props.unit;
  createDataForm.amount = props.amount;
  createDataForm.description = props.description;
  createDataForm.image = props.productImage.name;

  useEffect(() => {
    // props.getProductTypeList();
    apiGet(APIs.getListProductTypeUrl).then((HTTPdata) =>
      props.sendProductTypeList(HTTPdata.values),
    );
    // props.getMenuTypeList();
    apiGet(APIs.getListMenuTypeUrl).then((HTTPdata) => props.sendMenuTypeList(HTTPdata.values));
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
    props.sendDisableFlag(true);

    const isOk = checkValidate(createDataForm, true);
    if (isOk) {
      const formData = new FormData();
      formData.append('productTypeName', createDataForm.productTypeName);
      formData.append('menuTypeName', createDataForm.menuTypeName);
      formData.append('name', createDataForm.name);
      formData.append('price', createDataForm.price.toString());
      formData.append('unit', createDataForm.unit);
      formData.append('amount', createDataForm.amount.toString());
      formData.append('description', createDataForm.description);
      formData.append('image', createDataForm.image);
      formData.append('files', props.productImage, props.productImage.name);

      apiPost(APIs.createOneProductUrl, formData).then((HTTPdata) => {
        props.sendDisableFlag(false);
        showSnackBarAlert(5000, 'success', HTTPdata.message);
        history.push('/menu/productList');
      });
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      props.sendImageErrorMessage(errorMessagesForm.image);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            New Product
          </Typography>
        </Grid>

        {/** contents */}
        <Grid container={true} item={true} xs={12}>
          <Paper className={classes.paper}>
            <form>
              <Box display="flex">
                <Grid
                  className={classes.grid}
                  container={true}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid container={true} item={true} md={5} xs="auto">
                    <Grid container={true} item={true} xs={12}>
                      <ImageUploadField />
                    </Grid>
                    <Grid container={true} item={true} xs={12} justify="center" alignItems="center">
                      <Button
                        className={classes.goBackButton}
                        variant="contained"
                        color="secondary"
                        onClick={goBackHandler}
                        disabled={props.isDisable}
                      >
                        Go Back
                      </Button>
                      <Button
                        className={classes.createButton}
                        variant="contained"
                        color="primary"
                        onClick={createHandler}
                        disabled={props.isDisable}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container={true} item={true} md={7} xs="auto">
                    <Grid
                      container={true}
                      item={true}
                      xs={12}
                      justify="space-between"
                      direction="column"
                    >
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

        {/** progress bar */}
        <Grid container={true} item={true} xs={12} alignItems="center" justify="center">
          {props.isDisable ? (
            <Box className={classes.progressBar}>
              <LinearProgress />
              <LinearProgress color="secondary" />
            </Box>
          ) : (
            <Box></Box>
          )}
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
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProductTypeList: () => {
      dispatch(productTypeActions.actionGetProductTypeListUrl());
    },
    sendProductTypeList: (productTypeList: ProductType[]) => {
      dispatch(productTypeActions.actionReceiveProductTypeList(productTypeList));
    },
    sendProductType: (productType: ProductType) => {
      dispatch(productTypeActions.actionReceiveProductType(productType));
    },
    getMenuTypeList: () => {
      dispatch(menuTypeActions.actionGetMenuTypeListUrl());
    },
    sendMenuTypeList: (menuTypeList: MenuType[]) => {
      dispatch(menuTypeActions.actionReceiveMenuTypeList(menuTypeList));
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

    /** common */
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
