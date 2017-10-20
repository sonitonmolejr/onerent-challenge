import { User, Property } from './connectors';
import Sequelize from 'sequelize';

const { or, contains } = Sequelize.Op;

const resolvers = {
  Query: {
    findUser(_, args) {
      return User.find({ where: args });
    },
    allUsers() {
      return User.all();
    },
    allProperties() {
      return Property.all();
    },
    search(_, args) {
      // TODO: Use contains and or operations
      return User.findAll({
        where: {
          firstName: args.q,
        },
      }).then((userResults) => {
        return Property.findAll({
          where: {
            street: args.q,
          },
        }).then((propertyResults) => {
          const searchResults = userResults.concat(propertyResults);
          return searchResults;
        });
      });
    },
  },
  User: {
    properties(user) {
      return user.getProperties();
    },
  },
  Property: {
    user(property) {
      return property.getUser();
    },
  },
  SearchResults: {
    __resolveType(obj, context, info) {
      if (obj.firstName) {
        return 'User';
      }
      if (obj.street) {
        return 'Property';
      }
      return null;
    },
  },
};

export default resolvers;
