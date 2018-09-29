import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Main} />
          <Route exact path="/api/userAuth/register" component={Register} />
          <Route exact path="/api/userAuth/login" component={Login} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
