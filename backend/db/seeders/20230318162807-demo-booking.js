'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-01-01',
        endDate: '2022-01-08'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-01-03',
        endDate: '2023-01-07'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2022-06-15',
        endDate: '2022-06-20'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2022-08-29',
        endDate: '2022-09-07'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-08-19',
        endDate: '2022-08-25'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-05-10',
        endDate: '2023-05-17'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] },
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
}