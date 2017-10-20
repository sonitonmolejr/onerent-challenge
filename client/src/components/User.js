import React, { Component } from 'react'

class House extends Component {

  render() {
    return (
      <tr className="stripe-dark">
        <td className="pa3">{this.props.user.id}</td>
        <td className="pa3">{this.props.user.firstName}</td>
        <td className="pa3">{this.props.user.lastName}</td>
      </tr>
    )
  }
}

export default House
