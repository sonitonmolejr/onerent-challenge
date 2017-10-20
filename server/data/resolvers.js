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
          $or: [
            { firstName: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('firstName')
            ), 'LIKE', '%' + args.q + '%') },
            { lastName: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('lastName')
            ), 'LIKE', '%' + args.q + '%') },
          ],
        },
      }).then((userResults) => {
        return Property.findAll({
          where: {
            $or: [
              { street: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('street')
              ), 'LIKE', '%' + args.q + '%') },
              { city: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('city')
              ), 'LIKE', '%' + args.q + '%') },
              { state: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('state')
              ), 'LIKE', '%' + args.q + '%') },
              { zip: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('zip')
              ), 'LIKE', '%' + args.q + '%') },
              { rent: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('rent')
              ), 'LIKE', '%' + args.q + '%') },
            ],
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
