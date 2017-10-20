import {
  makeExecutableSchema,
} from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type User {
  id: String! @isUnique
  firstName: String
  lastName: String
  properties: [Property] @relation(name: "UserProperties")
}

type Property {
  id: String! @isUnique
  street: String
  city: String
  state: String
  zip: String
  rent: Float
  user: User @relation(name: "UserProperties")
}

union SearchResults = User | Property

type Query {
  findUser(firstName: String, lastName: String): User
  allUsers: [User]
  allProperties: [Property]
  search(q: String): [SearchResults]
}
`;

export default makeExecutableSchema({ typeDefs, resolvers });
