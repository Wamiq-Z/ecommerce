import { createReducer, on } from '@ngrx/store';
import { createReviewSuccess, findReviewByProductIdFailure, findReviewByProductIdSuccess } from './Action';


export interface ReviewState {
  reviews: any[]; // Define the type of 'products' as per your requirement
  
}

export const initialState: ReviewState = {
  reviews: [],
 
};

export const reviewReducer = createReducer(
  initialState,
  
  on(findReviewByProductIdSuccess, (state, { payload }) => ({
    ...state,
    reviews:[],
    loading: false,
  })),

  on(createReviewSuccess, (state, { payload }) => ({
    ...state,
    reviews: [...state.reviews, payload],
    loading: false,
  })),

  
  on(
    findReviewByProductIdFailure,
    
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  )
);
