import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ContactService from "../../services/ContactService";
import { Input } from "../../components/Input/Input";
import { addContact } from "../../store/actions";
import { getContactById } from "../../store/actions";
import { deleteContact } from "../../store/actions";

import "./ContactEditPage.css";
import imgAvatar from "../../assets/img_avatar.png";

const Header = ({ contact, onDeleteContact }) => {
  const backUrl = contact._id ? `/contacts/${contact._id}` : `/contacts`;

  return (
    <header className="contact-edit-header">
      <Link to={backUrl}>Back</Link>
      {contact._id && (
        <Link to="/" onClick={onDeleteContact}>
          Delete
        </Link>
      )}
    </header>
  );
};

class ContactEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: ContactService.getEmptyContact()
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id; // params -> from url
    if (!id) return;

    this.fetchContact(id);
  }

  fetchContact(id) {
    this.props.getContactById(id);
  }

  onInputChange = field => {
    const contact = { ...this.state.contact, ...field };
    console.log("contact in onInputChange", contact);

    this.setState({ contact });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const contact = this.state.contact;
    this.props.addContact(contact);
    this.setState({ contact: ContactService.getEmptyContact() });
    this.props.history.push(`/contacts/${contact._id}`);
  };

  onDeleteContact = () => {
    this.props.deleteContact(this.state.contact._id);
  };

  renderField(name, title, value) {
    return (
      <Input field={{ name, title, value }} onInput={this.onInputChange} />
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ contact: nextProps.selectedContact });
  }

  render() {
    const { contact } = this.state;
    console.log("contact", this.props.selectedContact);

    if (!contact) return <div> Loading....</div>;

    const avatar = contact.picture || imgAvatar;

    return (
      <div className="contact-edit">
        <Header contact={contact} onDeleteContact={this.onDeleteContact} />
        <div className="contact-edit-body">
          <img src={avatar} alt="Person" width="96" height="96" />

          <form onSubmit={this.onFormSubmit} className="contact-edit-form">
            <div className="form-field">
              {this.renderField("name", "Name", contact.name)}
            </div>

            <div className="form-field">
              {this.renderField("phone", "Phone", contact.phone)}
            </div>

            <div className="form-field">
              {this.renderField("email", "Email", contact.email)}
            </div>

            <div className="form-actions-container">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedContact: state.contactsReducer.selectedContact
  };
};

const mapActionsToProps = dispatch => {
  return bindActionCreators(
    { addContact, getContactById, deleteContact },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionsToProps)(ContactEditPage);
