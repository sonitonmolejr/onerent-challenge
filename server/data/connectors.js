
import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

// Use postgres dialect here
const db = new Sequelize('onerent-challenge', null, null, {
  dialect: 'sqlite',
  storage: './onerent-challenge.sqlite',
});

const UserModel = db.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PropertyModel = db.define('property', {
  street: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  zip: { type: Sequelize.STRING },
  rent: { type: Sequelize.FLOAT },
});

UserModel.hasMany(PropertyModel);
PropertyModel.belongsTo(UserModel);

// create mock data using casual with a seed, so we store the same data on our sqlite database
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return UserModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((user) => {
      return user.createProperty({
        street: casual.street,
        city: casual.city,
        state: casual.state,
        zip: casual.zip(5),
        rent: casual.integer(1000, 10000),
      });
    });
  });

  UserModel.create({
    firstName: 'Edmond',
    lastName: 'Michaels',
  }).then((user) => {
    user.createProperty({
      street: 'Liza Route',
      city: 'Davao City',
      state: 'Davao del Sur',
      zip: '8000',
      rent: 9000,
    });

    user.createProperty({
      street: 'Edmond',
      city: 'Manila',
      state: 'Manila',
      zip: '8000',
      rent: 9000,
    });
  });

  UserModel.create({
    firstName: 'Edmond',
    lastName: 'Freecs',
  });
});


const User = db.models.user;
const Property = db.models.property;

export { User, Property };
