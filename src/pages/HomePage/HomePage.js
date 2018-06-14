import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserService from "../../services/UserService";
import BitcoinService from "../../services/BitcoinService";

import { loadUser } from "../../store/actions";


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { bitcoinRate: 0, user: UserService.getEmptyUser() };
  }

  componentDidMount() {
    this.props.loadUser();
  }

  componentWillReceiveProps = (nextProps) => { 
      var user = Object.assign(nextProps.user);
      const coins = this.props.user.balance;
      
      console.log('coins', coins);
      BitcoinService.getRate(coins)
        .then(res => {
          const bitcoinRate = res.data;
          console.log('bitcoinRate', bitcoinRate);
          this.setState({ bitcoinRate, user });
        })
        .catch(err => {
          // console.log('err', err);
        });
  }

  render() {
    console.log('this.state.user.balance', this.state.user.balance);
    console.log('this.state.bitcoinRate', this.state.bitcoinRate);
    
    if (!this.state.user || !this.state.user.name) {
      return (
        <div className="home-page">
          <div> loading... </div>
        </div>
      );
    } else {
      return (
        <div className="home-page">
          <div> Hello {this.state.user.name}!</div>
          <div> You have {this.state.user.balance} coins!</div>
          <div> Your BitCoin Rate is: {this.state.bitcoinRate}!</div>
        </div>
      );
    }
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


export default connect(mapStateToProps, mapActionsToProps)(HomePage);
