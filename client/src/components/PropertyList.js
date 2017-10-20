import React, { Component } from 'react'
import Property from './Property'
import { graphql, gql } from 'react-apollo'

class PropertyList extends Component {

    render() {

      // 1
      if (this.props.AllPropertiesQuery && this.props.AllPropertiesQuery.loading) {
        return <div>Loading</div>
      }

      // 2
      if (this.props.AllPropertiesQuery && this.props.AllPropertiesQuery.error) {
        return <div>Error</div>
      }

      // 3
      const propertiesToRender = this.props.AllPropertiesQuery.allProperties

      return (
        <div>
          <div className="pa4">

            <div className="overflow-auto">
              <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>

                  <tr className="stripe-dark">
                    <th className="fw6 tl pa3 bg-white">ID</th>
                    <th className="fw6 tl pa3 bg-white">Street</th>
                    <th className="fw6 tl pa3 bg-white">City</th>
                    <th className="fw6 tl pa3 bg-white">State</th>
                    <th className="fw6 tl pa3 bg-white">Zip</th>
                    <th className="fw6 tl pa3 bg-white">Rent</th>

                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {propertiesToRender.map(property => (
                    <Property key={property.id} property={property}/>
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
export const ALL_PROPERTIES_QUERY = gql`
# 2
query AllPropertiesQuery {
  allProperties {
    id
    street
    city
    state
    zip
    rent
  }
}
`

// 3
export default graphql(ALL_PROPERTIES_QUERY, { name: 'AllPropertiesQuery' }) (PropertyList)
