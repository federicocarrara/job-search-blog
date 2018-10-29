import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { Provider } from "react-redux";
import store from "./store";
import { logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";

// if (localStorage.getItem("jwtToken") !== null) {
//   const token = localStorage.getItem("jwtToken");
//   const decoded = jwt_decode(token);
// store.dispatch({ type: SET_CURRENT_USER, payload: decoded });
// let currentTime = Date.now() / 1000;
// if (currentTime > decoded.exp) {
//   store.dispatch(logoutUser());
// }
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Main} />
            <Route exact path="/api/usersAuth/register" component={Register} />
            <Route exact path="/api/usersAuth/login" component={Login} />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
