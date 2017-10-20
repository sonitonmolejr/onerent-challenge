import React, { Component } from 'react'
import User from './User'
import { graphql, gql } from 'react-apollo'

class UserList extends Component {

    render() {

      // 1
      if (this.props.AllUsersQuery && this.props.AllUsersQuery.loading) {
        return <div>Loading</div>
      }

      // 2
      if (this.props.AllUsersQuery && this.props.AllUsersQuery.error) {
        return <div>Error</div>
      }

      // 3
      const usersToRender = this.props.AllUsersQuery.allUsers

      return (
        <div>
          <div className="pa4">

            <div className="overflow-auto">
              <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>

                  <tr className="stripe-dark">
                    <th className="fw6 tl pa3 bg-white">ID</th>
                    <th className="fw6 tl pa3 bg-white">First Name</th>
                    <th className="fw6 tl pa3 bg-white">Last Name</th>

                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {usersToRender.map(user => (
                    <User key={user.id} user={user}/>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

}

// 1
export const ALL_USERS_QUERY = gql`
# 2
query AllUsersQuery {
  allUsers {
    id
    firstName
    lastName
  }
}
`

// 3
export default graphql(ALL_USERS_QUERY, { name: 'AllUsersQuery' }) (UserList)
