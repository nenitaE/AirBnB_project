'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'luxtraveler@user.io',
        username: 'Travel-queen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'worldtraveler@user.io',
        username: 'Worldly1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'budgetgal@user.io',
        username: 'Budgetgal2',
        hashedPassword: bcrypt.hashSync('password2')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Travel-queen', 'Worldly1', 'Budgetgal2'] }
    }, {});
  }
};
