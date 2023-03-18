'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'C6R5+FQ Playa Flamingo',
        city: 'Playa Flamingo',
        state: 'Guanacaste',
        country: 'Costa Rica',
        lat: 10.44187,
        lng: -85.79046,
        name: 'Flamingo Beach Villa',
        description: 'Costa Rica beachfront Villa',
        price: 1045
      },
      {
        ownerId: 2,
        address: '711 Pacific Beach Dr',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.79216,
        lng: -117.25468,
        name: 'Pacific Beach Penthouse',
        description: '4 Bedroom Penthouse with beach views',
        price: 549
      },
      {
        ownerId: 3,
        address: '1395 Brickell Ave',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.76134,
        lng: -80.19177,
        name: 'Miami Beach Condo',
        description: 'Oceanview Condo in luxurious AKA Hotel',
        price: 171
      }
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Costa Rica beachfront Villa', 'Pacific Beach Penthouse', 'Miami Beach Condo'] }
    }, {});
  }
};