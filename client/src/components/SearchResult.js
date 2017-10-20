import React, { Component } from 'react'

class SearchResult extends Component {

  render() {
    let searchResult = null;
    let userProperties = null;

    if (this.props.searchResult.firstName) {
      searchResult = this.props.searchResult.firstName + " " + this.props.searchResult.lastName;

      userProperties = this.props.searchResult.properties.map((property, index) => (
        <li key={index}>{property.street + ", " + property.city + ", " + property.state + ", " + property.zip + " (Rent: $" + property.rent + ")"}</li>
      ))

    } else {
      searchResult = this.props.searchResult.street + ", " + this.props.searchResult.city + ", " + this.props.searchResult.state + ", " + this.props.searchResult.zip + " (Rent: $" + this.props.searchResult.rent + ")";
    }

    return (
      <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">{searchResult} {userProperties ? <ul>{userProperties}</ul>: null}</li>
    )
  }
}

export default SearchResult
