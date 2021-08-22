import React from "react";
import './App.module.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import Services from "./pages/Services";
import Handymen from "./pages/Handymen";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import HandymanSignup from "./pages/HandymanSignUp";
import Searchbar from "./components/Searchbar/Searchbar";
import axios from "axios";



axios.interceptors.request.use(function (config) {
  let currentUser = localStorage.getItem('currentUser');
  // console.log(currentUser)

  if (currentUser) {
    currentUser =  JSON.parse(currentUser)
    // console.log(currentUser.accessToken)

    config.headers.Authorization =  currentUser.tokenType + " " + currentUser.accessToken;
  }


  return config;
});

export default function App() {


  return (
      <Router>
        <div>
          <Navbar>
            <ul>
              <li>

              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Products</Link>
              </li>
              <li>
                <Link to="/Handymen">Handymen</Link>
              </li>
              <li>
              <Link to="/HandymanSignup">HandymanSignup</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/Shoppingcart">Shopping Cart</Link>
              </li>
            </ul>
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/services">
              <Services />
            </Route>
            <Route path="/Handymen">
              <Handymen />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/HandymanSignup">
              <HandymanSignup />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/Shoppingcart">
              <Services />
            </Route>
            <Route path="/">
              <h1>404 not found</h1>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}


