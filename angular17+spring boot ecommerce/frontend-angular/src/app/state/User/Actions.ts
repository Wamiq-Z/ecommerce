import { createAction, props } from '@ngrx/store';
import { User } from '../../Models/user.model';


export const getUserProfile = createAction('[User] Get User Profile');
export const getUserProfileSuccess = createAction(
  '[User] Get User Profile Success',
  props<{ userProfile: User | null }>()
);
export const getUserProfileFailure = createAction(
  '[User] Get User Profile Failure',
  props<{ error: any }>()
);

export const getAllCustomersSuccess = createAction(
  '[User] Get All Customers Success',
  props<{ payload:any}>()
);
export const getAllCustomersFailure = createAction(
  '[User] Get All Customers Failure',
  props<{ error: any }>()
);



// logout 
export const logout = createAction('[User] Logout');
export const logoutSuccess = createAction('[User] Logout Success');
export const logoutFailure = createAction('[User] Logout Failure', (error: any) => ({ error }));
