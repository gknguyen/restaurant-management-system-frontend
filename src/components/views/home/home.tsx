import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardActions,
  Button,
  Icon,
  Divider,
  Box,
} from '@material-ui/core';
import { apiGet } from '../../../configs/axios';
import * as APIs from '../../../configs/APIs';
import { AWS_S3_BUCKET_URL } from '../../../configs/constants';
import { MenuType, Product } from '../../../configs/interfaces';
import * as commonActions from '../../../redux/commonReducers/actions';
import { red } from '@material-ui/core/colors';
import * as menuTypeActions from '../../../redux/menuTypeReducers/actions';
import * as productActions from '../../../redux/productReducers/actions';
import { formatPrice } from '../../../configs/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      flexWrap: 'wrap',
      // maxWidth: 1200,
    },
    card: {
      width: 400,
      maxWidth: 400,
    },
    cardMedia: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardImage: {
      width: 150,
    },
    cardHeader: {
      // textAlign: 'center',
    },
    cardHeaderTitle: {
      fontSize: 18,
    },
    cardHeaderSubHeader: {
      fontSize: 15,
    },
    cardAvatar: {
      backgroundColor: red[500],
    },
  }),
);

interface Props {
  /** redux params */
  isDisable: boolean;
  menuTypeList: MenuType[];
  productList: Product[];
  /** redux functions */
  sendDisableFlag: Function;
  sendMenuTypeList: Function;
  sendProductList: Function;
}

const Home: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [menuTypeList, setMenuTypeList] = React.useState<MenuType[]>(props.menuTypeList);
  const [productList, setProductList] = React.useState<Product[]>(props.productList);

  React.useEffect(() => {
    apiGet(APIs.getListMenuTypeUrl).then((HTTPdata) => {
      setMenuTypeList(HTTPdata.values);
      props.sendMenuTypeList(HTTPdata.values);
    });
    apiGet(APIs.getListProductForMainScreenUrl).then((HTTPdata) => {
      setProductList(HTTPdata.values);
      props.sendProductList(HTTPdata.values);
    });
  }, []);

  const filterMenuHandler = (typeName: string) => {
    const filterProductList = props.productList.filter(
      (product) => product.menuType.typeName === typeName,
    );
    setProductList(filterProductList);
  };

  const allMenuHandler = () => {
    setProductList(props.productList);
  };

  const menuTypeListField = menuTypeList.map((menuType, index) => {
    if (menuType) {
      return (
        <Button key={index} onClick={() => filterMenuHandler(menuType.typeName)}>
          <Icon>{menuType.icon}</Icon>
        </Button>
      );
    }
  });

  const productListField = productList.map((product, index) => {
    if (product) {
      const productImageUrl = product.image
        ? `${AWS_S3_BUCKET_URL}/products/${product.image}`
        : undefined;
      return (
        <Grid container item lg={3} md={4} sm={6} xs={12} key={index}>
          <Card className={classes.card}>
            <CardMedia className={classes.cardMedia} image={productImageUrl} />
            <CardHeader
              classes={{
                root: classes.cardHeader,
                title: classes.cardHeaderTitle,
                subheader: classes.cardHeaderSubHeader,
              }}
              title={product.name}
              subheader={`${formatPrice(product.price)} ${product.unit}`}
              avatar={
                <Avatar aria-label="recipe" className={classes.cardAvatar}>
                  <Icon>{product.menuType?.icon}</Icon>
                </Avatar>
              }
            />
            <CardActions>
              <Button variant="contained" color="primary" fullWidth>
                Order
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  });

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container item xs={12}>
          <Grid container item lg={2} md={12}>
            <Typography component="h1" variant="h4">
              Menu
            </Typography>
          </Grid>
          <Grid container item lg={10} md={12}>
            <Button onClick={() => allMenuHandler()}>
              <Icon>apps</Icon>
            </Button>
            {menuTypeListField}
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} style={{ paddingTop: 30 }}>
          {productListField}
        </Grid>
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    isDisable: state.commonReducer.isDisable,
    menuTypeList: state.menuTypeReducer.menuTypeList,
    productList: state.productReducer.productList,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
    sendMenuTypeList: (menuTypeList: MenuType[]) => {
      dispatch(menuTypeActions.actionReceiveMenuTypeList(menuTypeList));
    },
    sendProductList: (productList: Product[]) => {
      dispatch(productActions.actionReceiveProductList(productList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
