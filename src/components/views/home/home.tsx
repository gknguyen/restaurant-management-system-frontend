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
} from '@material-ui/core';
import { apiGet } from '../../../configs/axios';
import * as APIs from '../../../configs/APIs';
import { AWS_S3_BUCKET_URL } from '../../../configs/constants';
import { MenuType, Product } from '../../../configs/interfaces';
import * as commonActions from '../../../redux/commonReducers/actions';
import { red } from '@material-ui/core/colors';

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
  /** redux functions */
  sendDisableFlag: Function;
}

const Home: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [menuTypeList, setMenuTypeList] = React.useState<MenuType[]>([]);
  const [productList, setProductList] = React.useState<Product[]>([]);

  React.useEffect(() => {
    apiGet(APIs.getListMenuTypeUrl).then((HTTPdata) => setMenuTypeList(HTTPdata.values));
    apiGet(APIs.getListProductForMainScreenUrl).then((HTTPdata) => setProductList(HTTPdata.values));
  }, []);

  const menuTypeListField = menuTypeList.map((menuType, index) => {
    if (menuType) {
      return (
        <Grid container item xs={1} key={index}>
          <Button fullWidth>
            <Icon>{menuType.icon}</Icon>
          </Button>
        </Grid>
      );
    }
  });

  const productListField = productList.map((product, index) => {
    if (product) {
      const productImageUrl = `${AWS_S3_BUCKET_URL}/products/${product.image}`;
      return (
        <Grid container item xs={3} key={index}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              // classes={{ root: classes.cardImage }}
              image={productImageUrl}
            />
            <CardHeader
              classes={{
                root: classes.cardHeader,
                title: classes.cardHeaderTitle,
                subheader: classes.cardHeaderSubHeader,
              }}
              title={product.name}
              subheader={`${product.price} ${product.unit}`}
              avatar={
                <Avatar aria-label="recipe" className={classes.cardAvatar}>
                  <Icon>{product.menuType.icon}</Icon>
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
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            Menu
          </Typography>
        </Grid>

        <Grid container>{menuTypeListField}</Grid>

        <Grid container spacing={2}>
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
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
