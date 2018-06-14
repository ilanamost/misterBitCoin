import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loadContacts } from "../../store/actions";

import ContactList from "../../components/ContactList/ContactList";
// import ContactService from "../../services/ContactService";
import ContactFilter from "../../components/ContactFilter/ContactFilter";
import "./ContactPage.css";

class ContactPage extends Component {
  componentDidMount() {
    this.props.loadContacts();
  }

  contactSearch = term => {
    this.props.loadContacts({ term });
  };

  render() {
    return (
      <div className="contacts-page">
        <div className="search-container">
          <ContactFilter onFilter={this.contactSearch} />
        </div>
        <div className="contacts-container">
          <ContactList contacts={this.props.contacts} />
        </div>
        <div className="action-container">
          <Link to={"/contacts/edit/"}>+</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contactsReducer.contacts
  };
};

const mapActionsToProps = dispatch => {
  return bindActionCreators({ loadContacts }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ContactPage);
