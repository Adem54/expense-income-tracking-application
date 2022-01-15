import { RecordAction, RecordState } from "../../types/record";

export const defaultRecordState: RecordState = {
  data: [],
  loading: false,
  error: "",
};

export const recordReducer = (
  state: RecordState = defaultRecordState,
  action: RecordAction
) => {
  switch (action.type) {
    case "GET_RECORDS_START":
      return { ...state, loading: true, error: "" };
    case "GET_RECORDS_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_RECORDS_ERROR":
      return { ...state, loading: false, error: "Error get records" };
    case "ADD_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "ADD_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case "ADD_RECORD_ERROR":
      return { ...state, loading: false, error: "Error add records" };
    case "UPDATE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((record) =>
          record.id === action.payload.id ? action.payload : record
        ),
      };
    case "UPDATE_RECORD_ERROR":
      return { ...state, loading: false, error: "Error update records" };
    case "DELETE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.payload),
      };
    case "DELETE_RECORD_ERROR":
      return { ...state, loading: false, error: "Error delete records" };
    default:
      return state;
  }
};
