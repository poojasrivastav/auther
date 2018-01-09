import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/users';

/* -----------------    COMPONENT     ------------------ */

class UserItem extends Component {

  constructor (props) {
    super(props);
    this.removeUserCallback = this.removeUserCallback.bind(this);
  }

  render () {
    const { user } = this.props;
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle" src={user.photo} />
          </div>
          <Link className="media-body" to={`/users/${user.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="Jean Doe">{user.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{user.email}</span>
            </h5>
            <h5 className="tucked">
              <span>{user.phone}</span>
            </h5>
          </Link>
          <div className="media-right media-middle">
            <button className="btn btn-default" onClick={this.removeUserCallback}>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  removeUserCallback (event) {
    const { removeUser, user } = this.props;
    removeUser(user.id);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

// When given just an object, react-redux wraps the functions in dispatch, so when `removeUser` is invoked off of props in the component, it will call `dispatch(removeUser(params))`
const mapDispatch = { removeUser };

// The above is a shorthand for what is below
// const mapDispatch = (dispatch) => ({
//   removeUser: (userId) => dispatch(removeUser(userId))
// })

export default connect(mapState, mapDispatch)(UserItem);
