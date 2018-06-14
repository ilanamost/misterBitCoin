import React, { Component } from "react";

import { Input } from "../../components/Input/Input";

import "./Transfer.css";

class Transfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coinsAmount: 0
    };
  }

  onInputChange = field => {
    const coinsAmount = +field.amount;
    console.log("coinsAmount in onInputChange", coinsAmount);
    this.setState({ coinsAmount });
  };

    onTransfer = (event) => {
    event.preventDefault();
    const COINS = 'coins';
    this.props.onTransfer({[COINS]: this.state.coinsAmount})
  };

  renderField(name, title, value) {
    return (
      <Input field={{ name, title, value }} onInput={this.onInputChange} />
    );
  }

  
  render() {
  return (
    <div className="transfer">
      <form className="transfer-form" onSubmit={this.onTransfer}>
        <div className="form-field">
          <label>
           Want to transfer coins?
          {this.renderField("amount", "amount", this.state.coinsAmount)}
          </label>
        </div>

        <div className="form-actions-container">
          <button className="transfer-button" type="submit">Transfer</button>
        </div>
      </form>
    </div>
  );
}

}

export default Transfer;
