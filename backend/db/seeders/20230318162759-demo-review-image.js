'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://media.vrbo.com/lodging/30000000/29670000/29664400/29664396/4fce644a.f10.jpg'
      },
      {
        reviewId: 2,
        url: 'https://media.vrbo.com/lodging/31000000/30300000/30298900/30298855/c656d9e5.f10.jpg'
      },
      {
        reviewId: 3,
        url: 'https://media.vrbo.com/lodging/76000000/75800000/75799500/75799429/ef446a94.f10.jpg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
