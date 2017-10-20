import React, { Component } from 'react'

class Property extends Component {

  render() {
    return (
      <tr className="stripe-dark">
        <td className="pa3">{this.props.property.id}</td>
        <td className="pa3">{this.props.property.street}</td>
        <td className="pa3">{this.props.property.city}</td>
        <td className="pa3">{this.props.property.state}</td>
        <td className="pa3">{this.props.property.zip}</td>
        <td className="pa3">{this.props.property.rent}</td>
      </tr>
    )
  }
}

export default Property
