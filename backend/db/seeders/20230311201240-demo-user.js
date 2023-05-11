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
        firstName: "Jen",
        lastName: "Smith",
        email: 'luxtraveler@user.io',
        username: 'Travel-queen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Mark",
        lastName: "Jones",
        email: 'worldtraveler@user.io',
        username: 'Worldly1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: "April",
        lastName: "Escobar",
        email: 'budgetgal@user.io',
        username: 'Budgetgal2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Demo",
        lastName: "Lition",
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Henry",
        lastName: "Jones",
        email: 'budgetguy@user.io',
        username: 'Budgetguy2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Lily",
        lastName: "Padd",
        email: 'lily@user.io',
        username: 'Lilypadd',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Travel-queen', 'Worldly1', 'Budgetgal2', 'Demo-lition', 'Budgetguy2', 'Lilypadd'] }
    }, {});
  }
};
