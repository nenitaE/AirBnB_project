'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: '1',
        userId: '2',
        review: "Such an awesome location.  The villa has everything you need.",
        stars: 5
      },
      {
        spotId: '2',
        userId: '3',
        review: "Beautiful views of the Pacific coast.  The penthouse was clean but a little cramped.",
        stars: 4
      },
      {
        spotId: '3',
        userId: '1',
        review: "Luxurious hotel penthouse with gorgeous views.  Easy access to everything.",
        stars: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
}
