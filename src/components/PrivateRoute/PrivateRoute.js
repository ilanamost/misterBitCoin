import React , {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { loadUser } from "../../store/actions";

class PrivateRoute extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

    render () {
      const { component: Component, ...rest } = this.props
  
      return (
        <Route {...rest} render={props => (
          this.props.user.name ? 
          (<Component {...props}/>) : 
          (
            <Redirect to={{
              pathname: '/signup',
              state: { from: props.location }
            }}/>
          )
        )}/>
      )
    }
  }

function mapStateToProps(state) {
  return {
    user: state.usersReducer.loggedInUser
  };
}

const mapActionsToProps = dispatch => {
  return bindActionCreators({loadUser}, dispatch);
};
export default connect(mapStateToProps, mapActionsToProps)(PrivateRoute);