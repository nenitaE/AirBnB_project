'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: '1',
        url: 'https://media.vrbo.com/lodging/30000000/29670000/29664400/29664396/5e4ae9c3.f10.jpg',
        preview: true
      },
      {
        spotId: '2',
        url: 'https://media.vrbo.com/lodging/31000000/30300000/30298900/30298855/83a9648a.f10.jpg',
        preview: true
      },
      {
        spotId: '3',
        url: 'https://media.vrbo.com/lodging/76000000/75800000/75799500/75799429/ae3e4aaa.f10.jpg',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};