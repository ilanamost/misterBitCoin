import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadUser } from "./store/actions";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ContactDetailsPage from "./pages/ContactDetailsPage/ContactDetailsPage";
import ContactEditPage from "./pages/ContactEditPage/ContactEditPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MoveListPage from "./pages/MoveListPage/MoveListPage";

import MoveService from "./services/MoveService";

import "./App.css";
import "./assets/icon-font/flaticon.css";

const logo = 'http://res.cloudinary.com/ilanamost/image/upload/v1529046124/logo.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.props.loadUser();
    console.log("user in this.state app.js", this.state.user);
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    var user = nextProps.user;
    this.setState({ user });
    console.log("user in componentWillReceiveProps app.js", this.state.user);
    if(user.moves) MoveService.setMoves(user.moves);
    
  }

  render() {
    console.log("this.state.user in render app.js", this.state.user);

    if (!this.state.user) {
      return (
        <div className="app">
          <div> loading... </div>
        </div>
      );
    }

    return (
      <section className="app-container">
      <div className="app-frame">
        <div className="app">
          <div className="header-container">
            <img className="logo" src={logo} alt=""/>
            <h1> mister BitCoin</h1>
          </div>
          <Router>
            <div>
              <header className="app-header">
                <NavLink exact activeClassName="selected" to="/">
                  <i className="flaticon-presentation-board-with-graph" />
                </NavLink>
                <NavLink activeClassName="selected" to="/contacts">
                  <i className="flaticon-group-of-businessmen" />
                </NavLink>
                <NavLink activeClassName="selected" to="/moves">
                  <i className="flaticon-handshake" />
                </NavLink>
              </header>

              <div className="app-content">
                <Switch>
                <Route path="/signup" component={SignUpPage} />
                <PrivateRoute exact path="/moves" component={MoveListPage}/>
                <PrivateRoute exact path="/contacts/edit/:id?" component={ContactEditPage}/>
                <PrivateRoute exact path="/contacts/:id" component={ContactDetailsPage}/>
                <PrivateRoute exact path="/contacts" component={ContactPage}/>
                <PrivateRoute exact path="/" component={HomePage}/> 
                </Switch>
              </div>
            </div>
          </Router>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer.loggedInUser
  };
};

const mapActionsToProps = dispatch => {
  return bindActionCreators({ loadUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);

