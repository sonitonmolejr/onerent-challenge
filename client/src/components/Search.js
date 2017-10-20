import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import SearchResult from './SearchResult'

const SEARCH_QUERY = gql`
query SearchQuery($searchText: String!) {
  search(q: $searchText) {
    ... on User {
      id
      firstName
      lastName
      properties {
        id
        street
        city
        state
        zip
        rent
      }
    }

    ... on Property {
      id
      street
      city
      state
      zip
      rent
    }
  }
}
`

class Search extends Component {

  state = {
    searchResults: [],
    searchText: ''
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type='text'
            onChange={(e) => this._executeSearch(e.target.value)}
          />
        </div>
        <div className="pa3 pa5-ns">
          <ul className="list pl0 measure center">
            {this.state.searchResults.map((searchResult, index) => (
              <SearchResult key={index} searchResult={searchResult} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  _executeSearch = async (searchText) => {
    // const { searchText } = this.state
    const result = await this.props.client.query({
      query: SEARCH_QUERY,
      variables: { searchText }
    })
    const searchResults = result.data.search
    this.setState({ searchResults })
  }

}

export default withApollo(Search)
