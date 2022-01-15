import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";

export interface Record {
  id: number;
  title: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
}

export interface RecordForm {
    title: string;
    amount: number;
    category_id: number;
}

export interface RecordState {
  data: Record[];
  loading: boolean;
  error: string;
}
export interface GET_RECORDS_START {
  type: "GET_RECORDS_START";
}

export interface GET_RECORDS_SUCCESS {
  type: "GET_RECORDS_SUCCESS";
  payload: Record[];
}

export interface GET_RECORDS_ERROR {
  type: "GET_RECORDS_ERROR";
}

export interface ADD_RECORD_START {
    type: "ADD_RECORD_START";
  }
  
  export interface ADD_RECORD_SUCCESS {
    type: "ADD_RECORD_SUCCESS";
    payload: Record;
  }
  
  export interface ADD_RECORD_ERROR {
    type: "ADD_RECORD_ERROR";
  }


  export interface UPDATE_RECORD_START {
    type: "UPDATE_RECORD_START";
  }
  
  export interface UPDATE_RECORD_SUCCESS {
    type: "UPDATE_RECORD_SUCCESS";
    payload: Record;
  }
  
  export interface UPDATE_RECORD_ERROR {
    type: "UPDATE_RECORD_ERROR";
  }

  export interface DELETE_RECORD_START {
    type: "DELETE_RECORD_START";
  }
  
  export interface DELETE_RECORD_SUCCESS {
    type: "DELETE_RECORD_SUCCESS";
    payload: Record["id"];
  }
  
  export interface DELETE_RECORD_ERROR {
    type: "DELETE_RECORD_ERROR";
  }
export type RecordAction =
  | GET_RECORDS_START
  | GET_RECORDS_SUCCESS
  | GET_RECORDS_ERROR  
  | ADD_RECORD_START
  | ADD_RECORD_SUCCESS
  | ADD_RECORD_ERROR
  | UPDATE_RECORD_START
  | UPDATE_RECORD_SUCCESS
  | UPDATE_RECORD_ERROR
  | DELETE_RECORD_START
  | DELETE_RECORD_SUCCESS
  | DELETE_RECORD_ERROR

export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;
