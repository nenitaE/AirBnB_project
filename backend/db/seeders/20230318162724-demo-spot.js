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
      },
      {
        ownerId: 4,
        address: '330 Casa Manana',
        city: 'Cayo Espanto',
        state: 'San Pedro',
        country: 'Belize',
        lat: 10.44187,
        lng: -85.79046,
        name: 'Belize Beachside Villa',
        description: 'Belize Villa on the island of Cayo Espanto.',
        price: 700
      },
      {
        ownerId: 5,
        address: '220 Ocean Beach Dr',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.79216,
        lng: -117.25468,
        name: 'Ocean Beach Penthouse',
        description: '6 Bedroom Penthouse with beach views',
        price: 899
      },
      {
        ownerId: 6,
        address: '200 Miami Beach Blvd',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.76134,
        lng: -80.19177,
        name: 'Miami Beach House',
        description: 'Oceanfront Home in Miami Beach',
        price: 1100
      },
      {
        ownerId: 4,
        address: '800 Del Mar Ave.',
        city: 'Manuel Antonio',
        state: 'Quepos',
        country: 'Costa Rica',
        lat: 9.4076,
        lng: -84.15580,
        name: 'Seaside Estate in Manuel Antonio',
        description:'Perched on 2.5 acres of private rainforest reserve.', 
        price: 2500
      },
      {
        ownerId: 4,
        address: '777 Main St',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.79216,
        lng: -117.25468,
        name: 'Downtown San Diego Loft',
        description: 'This unit overlooks the Coronado bay.',
        price: 199
      },
      {
        ownerId: 3,
        address: '8779 Suarez Avenue',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.76134,
        lng: -80.19177,
        name: 'Miami Highrise Condo',
        description: 'This apartment will meet all your expectations.',
        price: 187
      },
      {
        ownerId: 4,
        address: '4 Chome 2-8 Shibakoen',
        city: 'Taito City',
        state: 'Tokyo',
        country: 'Japan',
        lat: 35.6762,
        lng: 139.6503,
        name: 'Tokyo Bath House',
        description: 'Open Air Bathhouse in Tokyo',
        price: 429
      },
      {
        ownerId: 2,
        address: '555 Country Music Ln',
        city: 'Nashville',
        state: 'TN',
        country: 'USA',
        lat: 36.174465,
        lng: -86.767960,
        name: 'Downtown Nashville Loft',
        description: 'Huge loft in the heart of Nashville',
        price: 375
      },
      {
        ownerId: 1,
        address: '555 Myrtle Blvd',
        city: 'Myrtle Beach',
        state: 'SC',
        country: 'USA',
        lat: 33.6891,
        lng: 78.8867,
        name: 'Myrtle Beach Condo',
        description: 'Oceanview Condo with Direct Beach Access',
        price: 250
      }
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Costa Rica beachfront Villa', 'Pacific Beach Penthouse', 'Miami Beach Condo', 'Belize Beachside Villa', 'Ocean Beach Penthouse', 'Miami Beach House', 'Seaside Estate in Manuel Antonio', 'Downtown San Diego Loft', 'Miami Highrise Condo','Tokyo Bath House','Downtown Nashville Loft', 'Myrtle Beach Condo'] }
    }, {});
  }
};