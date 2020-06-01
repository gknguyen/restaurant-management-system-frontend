import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as routes from '../../../../configs/APIs';
import Axios from '../../../../configs/axios';
import { Image, Product } from '../../../../configs/interfaces';
import * as menuTypeActions from '../../../../redux/reducers/menuTypeReducers/actions';
import * as productActions from '../../../../redux/reducers/productReducers/actions';
import * as productTypeActions from '../../../../redux/reducers/productTypeReducers/actions';
import { getAuthToken, getProductId } from '../../../utils/localStore';
import { DescriptionField, ImageUploadField, MainInfoField } from './components';
import { checkValidate, errorMessagesForm } from './validate';

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

const editDataForm: any = {};

interface Props {
  productTypeId: string;
  menuTypeId: string;
  name: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  productImage: Image;
  open: boolean;
  getProductTypeList: Function;
  getMenuTypeList: Function;
  sendEditOpenFlag: Function;
  sendProductId: Function;
  sendErrorMessageForm: Function;
}

const EditProduct: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const token = getAuthToken();
  const productId = getProductId();

  const open: boolean = props.open;

  editDataForm.productTypeId = props.productTypeId;
  editDataForm.menuTypeId = props.menuTypeId;
  editDataForm.name = props.name;
  editDataForm.price = props.price;
  editDataForm.unit = props.unit;
  editDataForm.amount = props.amount;
  editDataForm.image = props.productImage.name;
  console.log('editDataForm: ', editDataForm);

  useEffect(() => {
    props.getProductTypeList();
    props.getMenuTypeList();
  }, []);

  const handleClose = () => {
    props.sendEditOpenFlag(false);
    props.sendErrorMessageForm({});
  };

  const editHandler = (event: any) => {
    event.preventDefault();
    const results = checkValidate(editDataForm, false);
    if (results) {
      Axios({
        method: 'PUT',
        url: routes.editOneProductUrl,
        params: { productId },
        data: editDataForm,
      })
        .then(() => {
          console.log('props.productImage: ', props.productImage);
          if (props.productImage.name) {
            Axios({
              method: 'GET',
              url: routes.getSignedUrl,
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
                    props.sendEditOpenFlag(false);
                    // history.push('/menu/productDetails');
                    // history.push('/menu/productList');
                    props.sendProductId(productId);
                  })
                  .catch((err) => {
                    console.log(err.response.data);
                  });
              })
              .catch((err) => {
                console.log(err.response.data);
              });
          } else {
            props.sendEditOpenFlag(false);
            // history.push('/menu/productDetails');
            // history.push('/menu/productList');
            props.sendProductId(productId);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      props.sendErrorMessageForm(errorMessagesForm);
      // console.log('errorMessagesForm: ', errorMessagesForm);
      history.push('/menu/productDetails');
    }
  };

  return (
    <Container maxWidth='xl'>
      <Dialog
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='md'
      >
        <DialogTitle id='customized-dialog-title'>
          <Typography component='h1' variant='h5'>
            Edit Product
          </Typography>
        </DialogTitle>
        <DialogContent>
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
                      onClick={handleClose}
                    >
                      Go Back
                    </Button>
                    <Button
                      className={classes.createButton}
                      variant='contained'
                      color='primary'
                      onClick={editHandler}
                    >
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
                <Grid container={true} item={true} md={7} xs='auto'>
                  <Grid
                    container={true}
                    item={true}
                    xs={12}
                    justify='space-between'
                    direction='column'
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
    productTypeId: state.productTypeReducer.productType.id,
    menuTypeId: state.menuTypeReducer.menuType.id,
    name: state.productReducer.product.name,
    price: state.productReducer.product.price,
    unit: state.productReducer.product.unit,
    amount: state.productReducer.product.amount,
    description: state.productReducer.product.description,
    productImage: state.imageReducer.imageFile,
    open: state.productReducer.open,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProductTypeList: () => {
      dispatch(productTypeActions.actionGetProductTypeListUrl());
    },
    getMenuTypeList: () => {
      dispatch(menuTypeActions.actionGetMenuTypeListUrl());
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
