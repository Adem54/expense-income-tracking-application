import { User, UserDispatch, UserLoginForm } from "../../types/user";
import api from "../../utils/api";

export const login =
  (creds: UserLoginForm) => async (dispatch: UserDispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await api().post<User>("users/login", creds);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("token",response.data.token);
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
    }
  };


  export const IsUserLoggedIn=()=>async (dispatch:UserDispatch)=>{
    dispatch({type:"IS_LOGGED_IN_START"})
    try {
      const response= await api().post<User>("users/is_logged_in"); 
      dispatch({type:"IS_LOGGED_IN_SUCCESS",payload:response.data})
    } catch (error) {
      dispatch({type:"IS_LOGGED_IN_ERROR"})
    }
  }

  export const logout=()=>{
    localStorage.removeItem("token");
    return {
      type:"LOGOUT"
    }
  }