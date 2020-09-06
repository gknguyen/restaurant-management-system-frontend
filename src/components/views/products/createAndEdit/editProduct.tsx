import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, FormEvent } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import api, { apiGet, apiPut } from '../../../../configs/axios';
import { Product, ProductType, MenuType, HTTPdata } from '../../../../configs/interfaces';
import * as menuTypeActions from '../../../../redux/menuTypeReducers/actions';
import * as productActions from '../../../../redux/productReducers/actions';
import * as productTypeActions from '../../../../redux/productTypeReducers/actions';
import * as commonActions from '../../../../redux/commonReducers/actions';
import { getAuthToken, getProductId } from '../../../../configs/localStore';
import DescriptionField from './components/descriptionField';
import ImageUploadField from './components/imageUploadField';
import MainInfoField from './components/mainInfoField';
import { checkValidate, errorMessagesForm } from './validate';
import * as APIs from '../../../../configs/APIs';
import { showSnackBarAlert } from '../../../../configs/utils';
import * as imageActions from '../../../../redux/imageReducers/actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '10px 40px 20px 40px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    dialog: {
      width: '100%',
      height: '100%',
    },
    paper: {
      width: '100%',
      height: '100%',
    },
    typography: {
      padding: '0 5px 5px 5px',
    },
    editButton: {
      // background: 'linear-gradient(45deg, #00c853 30%, #b2ff59 90%)',
      color: 'white',
      margin: '10px',
      minWidth: '100px',
    },
    goBackButton: {
      // background: 'linear-gradient(45deg, #424242 30%, #9e9e9e 90%)',
      color: 'white',
      margin: '10px',
    },
    progressCircular: {
      // color: '#6798e5',
      animationDuration: '550ms',
    },
  }),
);

const editDataForm: any = {};

interface Props {
  /** params */
  productTypeName: string;
  menuTypeName: string;
  name: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  productImage: File;
  open: boolean;
  isDisable: boolean;
  /** functions */
  sendProductTypeList: Function;
  sendMenuTypeList: Function;
  sendEditOpenFlag: Function;
  sendErrorMessageForm: Function;
  sendDisableFlag: Function;
  sendProductType: Function;
  sendMenuType: Function;
  sendProduct: Function;
}

const EditProduct: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const productId = getProductId();

  editDataForm.productTypeName = props.productTypeName;
  editDataForm.menuTypeName = props.menuTypeName;
  editDataForm.name = props.name;
  editDataForm.price = props.price;
  editDataForm.unit = props.unit;
  editDataForm.amount = props.amount;
  editDataForm.description = props.description;
  editDataForm.image = props.productImage.name;
  // console.log('editDataForm: ', editDataForm);

  React.useEffect(() => {
    apiGet(APIs.getListProductTypeUrl).then((HTTPdata) =>
      props.sendProductTypeList(HTTPdata.values),
    );
    apiGet(APIs.getListMenuTypeUrl).then((HTTPdata) => props.sendMenuTypeList(HTTPdata.values));
  }, []);

  const handleClose = () => {
    props.sendEditOpenFlag(false);
    props.sendErrorMessageForm({});
    apiGet(APIs.getOneProductUrl, { productId }).then((HTTPdata) => processDetailData(HTTPdata));
  };

  const editHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.sendDisableFlag(true);

    const isOk = checkValidate(editDataForm, false);
    if (isOk) {
      const formData = new FormData();
      formData.append('productTypeName', editDataForm.productTypeName || '');
      formData.append('menuTypeName', editDataForm.menuTypeName || '');
      formData.append('name', editDataForm.name || '');
      formData.append('price', editDataForm.price.toString() || '');
      formData.append('unit', editDataForm.unit || '');
      formData.append('amount', editDataForm.amount.toString() || '');
      formData.append('description', editDataForm.description || '');
      formData.append('image', editDataForm.image || '');
      if (props.productImage.name)
        formData.append('files', props.productImage, props.productImage.name);

      apiPut(APIs.editOneProductUrl, { productId }, formData).then((HTTPdata) => {
        processDetailData(HTTPdata);
        props.sendDisableFlag(false);
        props.sendEditOpenFlag(false);
        showSnackBarAlert(5000, 'success', HTTPdata.message);
      });
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      props.sendDisableFlag(false);
    }
  };

  const processDetailData = (HTTPdata: HTTPdata) => {
    const serverProduct = HTTPdata.values;

    const productType = serverProduct.productType || null;
    const menuType = serverProduct.menuType || null;
    const product = {
      id: serverProduct.id || null,
      name: serverProduct.name || null,
      price: serverProduct.price || null,
      unit: serverProduct.unit || null,
      amount: serverProduct.amount || null,
      active: serverProduct.activeStatus || null,
      image: serverProduct.image || null,
      description: serverProduct.description || null,
    } as Product;

    props.sendProduct(product);
    props.sendProductType(productType);
    props.sendMenuType(menuType);
  };

  return (
    <Container maxWidth="xl">
      <Dialog
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="md"
      >
        {/** header */}
        <DialogTitle id="customized-dialog-title">
          <Typography component="h1" variant="h5">
            Edit Product
          </Typography>
        </DialogTitle>

        {/** contents */}
        <DialogContent>
          <form onSubmit={editHandler}>
            <Box display="flex">
              <Grid
                className={classes.grid}
                container={true}
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid container={true} item={true} md={5} xs="auto">
                  {/** image field */}
                  <Grid container={true} item={true} xs={12}>
                    <ImageUploadField />
                  </Grid>

                  {/** buttons field */}
                  <Grid container={true} item={true} xs={12} justify="center" alignItems="center">
                    <Button
                      className={classes.goBackButton}
                      variant="contained"
                      color="secondary"
                      onClick={handleClose}
                    >
                      Go Back
                    </Button>
                    <input
                      id="edit-button"
                      type="submit"
                      style={{ display: 'none' }}
                      disabled={props.isDisable}
                    />
                    <label htmlFor="edit-button">
                      <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        component="span"
                        className={classes.editButton}
                        disabled={props.isDisable}
                      >
                        {!props.isDisable ? (
                          'Confirm'
                        ) : (
                          <CircularProgress
                            className={classes.progressCircular}
                            variant="indeterminate"
                            disableShrink
                            size={24}
                            thickness={4}
                          />
                        )}
                      </Button>
                    </label>
                  </Grid>
                </Grid>

                {/** informations field */}
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
        </DialogContent>
      </Dialog>
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
    open: state.productReducer.open,
    isDisable: state.commonReducer.isDisable,
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
    sendProductTypeList: (productTypeList: ProductType[]) => {
      dispatch(productTypeActions.actionReceiveProductTypeList(productTypeList));
    },
    sendMenuTypeList: (menuTypeList: MenuType[]) => {
      dispatch(menuTypeActions.actionReceiveMenuTypeList(menuTypeList));
    },
    sendEditOpenFlag: (open: boolean) => {
      dispatch(productActions.actionReceiveEditOpenFlag(open));
    },
    sendErrorMessageForm: (errorMessagesForm: Product) => {
      dispatch(productActions.actionReceiveErrorMessages(errorMessagesForm));
    },
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
