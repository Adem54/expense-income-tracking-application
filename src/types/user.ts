import { ThunkDispatch } from "redux-thunk";

export interface UserRegisterForm extends UserLoginForm {
  email: string;
  full_name: string;
}

export interface UserLoginForm {
  username: string;
  password: string;
}

export interface User {
  username: string;
  message: string;
  email: string;
  full_name: string;
  token: string;
}

export interface UserState {
  data: User;
  loading: boolean;
  error: string;
}

export interface LOGIN_START {
  type: "LOGIN_START";
}
export interface LOGIN_SUCCESS {
  type: "LOGIN_SUCCESS";
  payload: User;
}

export interface LOGIN_ERROR {
  type: "LOGIN_ERROR";
}

export interface IS_LOGGED_IN_START {
  type: "IS_LOGGED_IN_START";
}
export interface IS_LOGGED_IN_SUCCESS {
  type: "IS_LOGGED_IN_SUCCESS";
  payload: User;
}

export interface IS_LOGGED_IN_ERROR {
  type: "IS_LOGGED_IN_ERROR";
}

export interface LOGOUT {
  type:"LOGOUT"
}

export type UserAction = LOGIN_START | LOGIN_SUCCESS | LOGIN_ERROR | IS_LOGGED_IN_START | IS_LOGGED_IN_SUCCESS | IS_LOGGED_IN_ERROR | LOGOUT

export type UserDispatch = ThunkDispatch<UserState, void, UserAction>;
