import axios from 'axios';
import * as routes from '../../configs/APIs';
import { Product, ProductHeadCell } from '../../configs/interfaces';
import * as ActionType from '../constants/actionTypes';

export const actionGetProductListUrl = () => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getListProductUrl,
    })
      .then((res) => {
        const productList: Product[] = [];
        const serverProductList: any[] = res.data.values;
        // console.log('serverProductList: ', serverProductList);
        serverProductList.forEach((serverProduct) => {
          // console.log('serverProduct: ', serverProduct);
          const product = {
            id: serverProduct.id ? serverProduct.id : null,
            name: serverProduct.name ? serverProduct.name : null,
            price: serverProduct.price ? serverProduct.price : null,
            unit: serverProduct.unit ? serverProduct.unit : null,
            amount: serverProduct.amount ? serverProduct.amount : null,
            active: serverProduct.activeStatus ? serverProduct.activeStatus : null,
            productTypeName: serverProduct.productType
              ? serverProduct.productType.typeName
              : null,
            menuTypeName: serverProduct.menuType
              ? serverProduct.menuType.typeName
              : null,
          } as Product;
          productList.push(product);
        });
        // console.log('productList: ', productList);
        dispatch({
          type: ActionType.GET_PRODUCT_LIST,
          data: productList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionSearchProductListUrl = (searchValue: string) => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.searchListProductUrl,
      params: { searchValue },
    })
      .then((res) => {
        const productList: Product[] = [];
        const serverProductList: any[] = res.data.values;
        // console.log('serverProductList: ', serverProductList);
        serverProductList.forEach((serverProduct) => {
          // console.log('serverProduct: ', serverProduct);
          const product = {
            id: serverProduct.id ? serverProduct.id : null,
            name: serverProduct.name ? serverProduct.name : null,
            price: serverProduct.price ? serverProduct.price : null,
            unit: serverProduct.unit ? serverProduct.unit : null,
            amount: serverProduct.amount ? serverProduct.amount : null,
            active: serverProduct.activeStatus ? serverProduct.activeStatus : null,
            productTypeName: serverProduct.productType
              ? serverProduct.productType.typeName
              : null,
            menuTypeName: serverProduct.menuType
              ? serverProduct.menuType.typeName
              : null,
          } as Product;
          productList.push(product);
        });
        // console.log('productList: ', productList);
        dispatch({
          type: ActionType.GET_PRODUCT_LIST,
          data: productList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionGetProductUrl = (productId: string) => {
  return (dispatch: any) => {
    axios({
      method: 'GET',
      url: routes.getOneProductUrl,
      params: { productId },
    })
      .then((res) => {
        const serverProduct: any = res.data.values;
        const product = {
          id: serverProduct.id ? serverProduct.id : null,
          name: serverProduct.name ? serverProduct.name : null,
          price: serverProduct.price ? serverProduct.price : null,
          unit: serverProduct.unit ? serverProduct.unit : null,
          amount: serverProduct.amount ? serverProduct.amount : null,
          active: serverProduct.activeStatus ? serverProduct.activeStatus : null,
          image: serverProduct.image ? serverProduct.image : null,
          description: serverProduct.description ? serverProduct.description : null,
        } as Product;
        const productType = serverProduct.productType ? serverProduct.productType : null;
        const menuType = serverProduct.menuType ? serverProduct.menuType : null;
        dispatch({
          type: ActionType.GET_PRODUCT,
          data: product,
        });
        dispatch({
          type: ActionType.GET_PRODUCT_TYPE,
          data: productType,
        });
        dispatch({
          type: ActionType.GET_MENU_TYPE,
          data: menuType,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionReceiveSearchValue = (searchValue: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_SEARCH_VALUE,
      data: searchValue,
    });
  };
};

export const actionReceiveProductTableHeadCells = (headCells: ProductHeadCell[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_TABLE_HEAD_CELLS,
      data: headCells,
    });
  };
};

export const actionReceiveProduct = (product: Product) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT,
      data: product,
    });
  };
};

export const actionReceiveProductIdList = (productIdList: string[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ID_LIST,
      data: productIdList,
    });
  };
};

export const actionReceiveNameValue = (name: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_NAME,
      data: name,
    });
  };
};

export const actionReceivePriceValue = (price: number) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_PRICE,
      data: price,
    });
  };
};

export const actionReceiveUnitValue = (unit: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_UNIT,
      data: unit,
    });
  };
};

export const actionReceiveAmountValue = (amount: number) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_AMOUNT,
      data: amount,
    });
  };
};

export const actionReceiveDescriptionValue = (description: string) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_DESCRIPTION,
      data: description,
    });
  };
};

export const actionReceiveErrorMessages = (errorMessages: Product) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_ERROR_MESSAGES,
      data: errorMessages,
    });
  };
};

export const actionReceiveEditOpenFlag = (open: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.RECEIVE_PRODUCT_EDIT_OPEN_FLAG,
      data: open,
    });
  };
};
