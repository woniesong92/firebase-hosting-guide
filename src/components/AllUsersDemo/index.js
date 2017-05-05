import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Actions from './actions'

// Show all users and their stored files
class AllUsersDemo extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.fetchUsers())
  }

  render() {
    const { users } = this.props

    return (
      <div className="all-users-demo">
        <h1>AllUsersDemo</h1>

        {users.length > 0 &&
          <div className="all-users-demo__users">
            <ul>
              {users.map(user =>
                <li key={user.uid}>{user.uid} - {user.email}</li>
              )}
            </ul>
          </div>
        }

        <Link to="/">Home</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.AllUsersDemo.users,
  }
}

export default connect(
  mapStateToProps,
  null,
)(AllUsersDemo)
