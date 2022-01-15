import { CategoryAction, CategoryState } from "../../types/category";

export const defaultCategoryState: CategoryState = {
  data: [],
  loading: false,
  error: "",
};
const categoryReducer = (
  state: CategoryState = defaultCategoryState,
  action: CategoryAction
) => {
  switch (action.type) {
    case "GET_CATEGORIES_START":
      return { ...state, loading: true, error: "" };
    case "GET_CATEGORIES_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_CATEGORIES_ERROR":
      return { ...state, loading: false, error: "Error get categories" };
    case "ADD_CATEGORIES_START":
      return { ...state, loading: true, error: "" };
    case "ADD_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case "ADD_CATEGORIES_ERROR":
      return { ...state, loading: false, error: "Error add category" };
    case "UPDATE_CATEGORIES_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case "UPDATE_CATEGORIES_ERROR":
      return { ...state, loading: false, error: "Error update category" };
    case "DELETE_CATEGORIES_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((category) => category.id !== action.payload)
      };
    case "DELETE_CATEGORIES_ERROR":
      return { ...state, loading: false, error: "Error delete category" };

    default:
      return state;
  }
};

export default categoryReducer;
