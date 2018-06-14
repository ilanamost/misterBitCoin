import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import { loadUser } from "../../store/actions";

import MoveList from "../../components/MoveList/MoveList";
// import MoveService from "../../services/MoveService";
import './MoveListPage.css'

class MoveListPage extends Component {
  render() {
    return (
      <div className="moveList-page">
        <span className="move-list-header"> Your Moves: </span>
        <hr />
        {/* {console.log("this.props.user in MoveListPage", this.props.user)} */}
        <MoveList moves={this.props.user.moves} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer.loggedInUser
  };

};

export default connect(mapStateToProps)(MoveListPage);