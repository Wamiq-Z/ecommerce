import { createAction, props } from "@ngrx/store";

export const findReviewByProductIdRequest = createAction(
    '[Review] Find Review By Product Id Request',
    props<{ productId: string }>()
  );
  export const findReviewByProductIdSuccess = createAction(
    '[Review] Find Review By Product Id Success',
    props<{ payload: any }>()
  );
  export const findReviewByProductIdFailure = createAction(
    '[Review] Find Review By Product Id Failure',
    props<{ error: any }>()
  );
  
  export const createReviewRequest = createAction(
    '[Review] Create Review Request',
    props<{ product: any }>()
  );
  export const createReviewSuccess = createAction(
    '[Review] Create Review Success',
    props<{ payload: any }>()
  );
  export const createReviewFailure = createAction(
    '[Review] Create Review Failure',
    props<{ error: any }>()
  );