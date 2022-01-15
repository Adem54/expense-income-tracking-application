import { ThunkDispatch } from "redux-thunk";

export interface Category extends CategoryForm {
  id: number;
}

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
}

export interface CategoryForm {
  name: string;
  type: "expense" | "income";
  color?: string;
}

export interface GET_CATEGORIES_START {
  type: "GET_CATEGORIES_START";
}
export interface GET_CATEGORIES_SUCCESS {
  type: "GET_CATEGORIES_SUCCESS";
  payload: Category[];
}

export interface GET_CATEGORIES_ERROR {
  type: "GET_CATEGORIES_ERROR";
}
   
export interface ADD_CATEGORIES_START {
  type: "ADD_CATEGORIES_START";
}
export interface ADD_CATEGORIES_SUCCESS {
  type: "ADD_CATEGORIES_SUCCESS";
  payload: Category;
}

export interface ADD_CATEGORIES_ERROR {
  type: "ADD_CATEGORIES_ERROR";
}

export interface UPDATE_CATEGORIES_START {
  type: "UPDATE_CATEGORIES_START";
}
export interface UPDATE_CATEGORIES_SUCCESS {
  type: "UPDATE_CATEGORIES_SUCCESS";
  payload: Category;
}

export interface UPDATE_CATEGORIES_ERROR {
  type: "UPDATE_CATEGORIES_ERROR";
}

export interface DELETE_CATEGORIES_START {
    type: "DELETE_CATEGORIES_START";
  }
  export interface DELETE_CATEGORIES_SUCCESS {
    type: "DELETE_CATEGORIES_SUCCESS";
    payload:Category["id"]
 
  }
  
  export interface DELETE_CATEGORIES_ERROR {
    type: "DELETE_CATEGORIES_ERROR"
  }
export type CategoryAction =
  | GET_CATEGORIES_START
  | GET_CATEGORIES_SUCCESS
  | GET_CATEGORIES_ERROR
  | ADD_CATEGORIES_START
  | ADD_CATEGORIES_SUCCESS
  | ADD_CATEGORIES_ERROR
  | UPDATE_CATEGORIES_START
  | UPDATE_CATEGORIES_SUCCESS
  | UPDATE_CATEGORIES_ERROR
  | DELETE_CATEGORIES_START
  | DELETE_CATEGORIES_SUCCESS
  | DELETE_CATEGORIES_ERROR;

export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
