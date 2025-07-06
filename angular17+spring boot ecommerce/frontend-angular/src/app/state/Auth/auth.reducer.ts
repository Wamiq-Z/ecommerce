import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure
} from './auth.actions';
import { User } from '../../Models/user.model';
// import { User } from 'src/app/Models/user.model';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(loginFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(register, (state) => ({ ...state, loading: true, error: null })),
  on(registerSuccess, (state) => ({ ...state, loading: false })),
  on(registerFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
