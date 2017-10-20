import React, { Component } from 'react'
import { gql, graphql, withApollo } from 'react-apollo'
import Downshift from "downshift";
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

const Items = ({
  data: { loading, search },
  highlightedIndex,
  selectedItem,
  getItemProps,
  inputValue
}) =>
  loading ? null : (
    <div>
      {search.slice(0, 10).map((searchResult, index) => (
        <div
          {...getItemProps({ item: (searchResult.firstName) ? (searchResult.firstName.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ? searchResult.firstName : searchResult.lastName) : (searchResult.street.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) ? searchResult.street : (searchResult.city.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) ? searchResult.city : (searchResult.state.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) ? searchResult.state : (searchResult.zip.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) ? searchResult.zip : searchResult.rent })}

          key={searchResult.firstName ? searchResult.id + "-" + searchResult.firstName + "-" + searchResult.lastName : searchResult.id + "-" + searchResult.street + "-" + searchResult.city + "-" + searchResult.state}
          style={{
            backgroundColor: highlightedIndex === index ? "gray" : "white",
            fontWeight: selectedItem === (searchResult.firstName ? searchResult.firstName : searchResult.street) ? "bold" : "normal"
          }}
        >
          {searchResult.firstName ? searchResult.firstName + " " + searchResult.lastName : searchResult.street + ", " + searchResult.city + ", " + searchResult.state + ", " + searchResult.zip + " (Rent: $" + searchResult.rent + ")" }
        </div>
      ))}
    </div>
  );

const FetchItems = graphql(SEARCH_QUERY, {
  options: ({ searchText }) => ({ variables: { searchText } })
})(Items);

const BasicAutocomplete = ({ items, onChange }) => (
  <Downshift onChange={onChange}>
    {({
      getInputProps,
      getItemProps,
      isOpen,
      inputValue,
      selectedItem,
      highlightedIndex
    }) => (
      <div className="fl">
        <input {...getInputProps({ placeholder: "Search" })} />
        {isOpen ? (
          <div style={{ border: "1px solid #ccc" }}>
            <FetchItems
              searchText={inputValue}
              selectedItem={selectedItem}
              highlightedIndex={highlightedIndex}
              getItemProps={getItemProps}
              inputValue={inputValue}
            />
          </div>
        ) : null}
      </div>
    )}
  </Downshift>
);

class Search extends Component {

  state = {
    searchResults: [],
    searchText: ''
  }

  render() {
    return (
      <div>
        <div>
          <BasicAutocomplete onChange={selectedItem => this.setState({ searchText: selectedItem })} />
          <button onClick={() => this._executeSearch()}>OK</button>
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

  _executeSearch = async () => {
    const { searchText } = this.state
    const result = await this.props.client.query({
      query: SEARCH_QUERY,
      variables: { searchText }
    })
    const searchResults = result.data.search
    this.setState({ searchResults })
  }

}

export default withApollo(Search)




