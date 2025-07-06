import { createAction, props } from '@ngrx/store';
import { User } from '../../Models/user.model';

// import { User } from './user.model';

export const login = createAction('[Auth] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const register = createAction('[Auth] Register', props<{user:User}>());
export const registerSuccess = createAction('[Auth] Register Success',props<{user:any}>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: any }>());
