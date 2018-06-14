import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ContactService from "../../services/ContactService";
import MoveService from "../../services/MoveService";
import { getContactById } from "../../store/actions";
import { loadUser } from "../../store/actions";
import { updateUser } from "../../store/actions";

import imgAvatar from "../../assets/img_avatar.png";
import "./ContactDetailsPage.css";
import Transfer from "../../components/Transfer/Transfer";

class ContactDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: ContactService.getEmptyContact(),
      user: null
    };
  }

  componentDidMount() {
    console.log("this.props", this.props);
    const id = this.props.match.params.id; // params -> from url
    this.fetchContact(id);
    this.props.loadUser();
  }

  fetchContact(id) {
    this.props.getContactById(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ contact: nextProps.selectedContact, user: nextProps.user });
  }

  onTransferChange = field => {
    const COINS = "coins";
    if (field[COINS] <= this.props.user.balance && field[COINS] !== 0) {
      this.props.user.balance -= field[COINS];

      var date = new Date();

      var move = {
        at: date.toString(),
        amount: field[COINS],
        to: this.state.contact.name
      };
      
      console.log("move", move);
      MoveService.addMove(move);
      this.props.user.moves = MoveService.getMoves();
      console.log('this.props.user.moves in contactDetailsPage', this.props.user.moves);
      
      this.setState({ user: this.props.user });
      this.props.updateUser(this.props.user);

      this.props.history.push(`/contacts`);
    }
  };

  render() {
    const contact = this.state.contact;
    if (!contact) return <div> Loading....</div>;
    const avatar = contact.picture || imgAvatar;

    return (
      <div className="contact-details">
        <header className="contact-details-header">
          <Link to={`/contacts`}>Back</Link>
          <Link to={`/contacts/edit/${this.state.contact._id}`}>Edit</Link>
        </header>
        <div className="contact-details-body">
          <img src={avatar} alt="Person" width="96" height="96" />
          <div className="contact-details-row">Name: {contact.name}</div>
          <div className="contact-details-row">Phone: {contact.phone}</div>
          <div className="contact-details-row">Email: {contact.email}</div>
          <hr />
          <Transfer onTransfer={this.onTransferChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedContact: state.contactsReducer.selectedContact,
    user: state.usersReducer.loggedInUser
  };
};

const mapActionsToProps = dispatch => {
  return bindActionCreators({ getContactById, loadUser, updateUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ContactDetailsPage);
