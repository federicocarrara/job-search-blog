import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";
import { RESET_ERRORS } from "./types";
import { LOGOUT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  fetch("/api/usersAuth/register", {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        dispatch({ type: GET_ERRORS, payload: res.errors });
      } else {
        dispatch({ type: RESET_ERRORS });
        return history.push("/api/usersAuth/login");
      }
    })
    .catch(err => console.log(err));
};

export const loginUser = userData => dispatch => {
  fetch("/api/usersAuth/login", {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        dispatch({ type: GET_ERRORS, payload: res.errors });
      } else {
        const token = res.token;
        const decoded = jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        dispatch({ type: RESET_ERRORS });
        dispatch({ type: SET_CURRENT_USER, payload: decoded });
      }
    })
    .catch(err => console.log(err));
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch({ type: LOGOUT_USER });
};
