import {ProductWithQuantity} from '../../model/product';
import {CartProductActions, CartProductsTypes} from './cart.actions';
import {DomainStatus, Status} from '../../modules/shared/models/DomainStatus';

export interface CartState {
  products: Array<ProductWithQuantity>;
  order: DomainStatus<Array<ProductWithQuantity>>;
}

export const initialState: CartState = {
  products: [],
  order: {
    domain: [],
    requestStatus: {
      errorMessage: undefined,
      status: Status.NEW
    }
  }
};

export function cartReducer(state: CartState = initialState, action: CartProductActions): CartState {
  switch (action.type) {
    case CartProductsTypes.ADD_PRODUCT_TO_CART: {
      const productId: number = action.payload.id;
      let alteredProducts: Array<ProductWithQuantity> = [...state.products];
      const alreadyInCartProduct = alteredProducts.find(product => product.id === productId);
      if (alreadyInCartProduct) {
        alteredProducts = alteredProducts.map((product: ProductWithQuantity) => {
          if (product.id === productId) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
      } else {
        alteredProducts.push({ ...action.payload, quantity: 1 });
      }
      return { ...state, products: alteredProducts } as CartState;
    }

    case CartProductsTypes.UPDATE_PRODUCT_FROM_CART: {
      const productId: number = action.payload.id;
      let alteredProducts: Array<ProductWithQuantity> = [...state.products];
      alteredProducts = alteredProducts.map((product: ProductWithQuantity) => {
        if (product.id === productId) {
          return action.payload;
        } else {
          return product;
        }
      });
      return { ...state, products: alteredProducts };
    }

    case CartProductsTypes.REMOVE_PRODUCT_FROM_CART:
      let alteredProducts: Array<ProductWithQuantity> = [...state.products];
      alteredProducts = alteredProducts.filter((product: ProductWithQuantity) => product.id !== action.payload);
      return { ...state, products: alteredProducts };

    case CartProductsTypes.REMOVE_ALL_PRODUCTS_FROM_CART: {
      return {
        ...state,
        products: []
      };
    }

    default:
      return { ...state };
  }
}
