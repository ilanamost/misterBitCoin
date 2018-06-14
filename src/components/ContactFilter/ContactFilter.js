import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ContactFilter.css'

class ContactFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {term: ''};
    }

    onInputChange = (ev) => {
      const term = ev.target.value;
      this.setState({term});
      this.props.onFilter(term);
    }

    render () {
        return (
            <div className="contact-filter">
                <input
                    placeholder="Search"
                    value={this.state.term}
                    onChange={this.onInputChange} />
            </div>
        );
    } 
}

ContactFilter.propTypes = {
    onFilter: PropTypes.func.isRequired
}

export default ContactFilter

