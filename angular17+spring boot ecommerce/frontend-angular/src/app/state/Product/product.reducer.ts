import { createReducer, on } from '@ngrx/store';
import {
  findProductsByCategoryRequest,
  findProductsByCategorySuccess,
  findProductsByCategoryFailure,
  findProductByIdRequest,
  findProductByIdSuccess,
  findProductByIdFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  recentllyAddedProductsSuccess,
} from './Actions';

export interface ProductState {
  products: any[]; // Define the type of 'products' as per your requirement
  selectedProduct: any | null; // Define the type of 'selectedProduct' as per your requirement
  loading: boolean;
  error: string | null;
  content: any[];
  recent:any[]
}

export const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  content: [],
  recent:[]
};

export const productReducer = createReducer(
  initialState,
  on(
    findProductsByCategoryRequest,
    findProductByIdRequest,
    createProductRequest,
    updateProductRequest,
    deleteProductRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(findProductsByCategorySuccess, (state, { payload }) => ({
    ...state,
    products: payload,
    content: payload.content,
    loading: false,
  })),
  on(findProductByIdSuccess, (state, { payload }) => ({
    ...state,
    selectedProduct: payload,
    loading: false,
  })),
  on(createProductSuccess, (state, { payload }) => ({
    ...state,
    products: [...state.products, payload],
    loading: false,
  })),
  on(updateProductSuccess, (state, { payload }) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === payload.id ? payload : product
    ),
    loading: false,
  })),
  on(deleteProductSuccess, (state, { payload }) => ({
    ...state,
    // products: state.products.content.filter((product) => product.id !== payload),
    loading: false,
    content: state.content.filter((product) => product.id !== payload),
    // console.log("payload ",payload)
  })),
  on(recentllyAddedProductsSuccess, (state, {payload})=>({
    ...state,
    loading:false,
    recent:payload
  })),
  on(
    findProductsByCategoryFailure,
    findProductByIdFailure,
    createProductFailure,
    updateProductFailure,
    deleteProductFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  )
);
