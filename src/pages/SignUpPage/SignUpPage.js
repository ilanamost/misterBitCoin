import React, { Component } from "react";

import UserService from "../../services/UserService";
import { Input } from "../../components/Input/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadUser } from "../../store/actions";

import "./SignUpPage.css";

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = { user: UserService.getEmptyUser() };
  }

  onInputChange = field => {
    const user = { ...this.state.user, ...field };
    this.setState({ user });
  };

  renderField(name, title, value) {
    return (
      <Input field={{ name, title, value }} onInput={this.onInputChange} />
    );
  }

  onFormSubmit = event => {
    event.preventDefault();
    const user = this.state.user;

    if (user.name) {
      UserService.saveUser(user);
      this.props.loadUser();
    }
    this.props.history.push(`/`);
  };

  render() {
    const { user } = this.state;
    return (
      <div className="sign-up">
        <form onSubmit={this.onFormSubmit} className="contact-edit-form">
          <label> Please enter your name: </label>
          <div className="form-field">
            {this.renderField("name", "Name:", user.name)}
            <button className="signup-button" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapActionsToProps = dispatch => {
  return bindActionCreators({ loadUser }, dispatch);
};

export default connect( null ,mapActionsToProps)(SignUpPage);
