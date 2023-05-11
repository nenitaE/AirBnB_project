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
        spotId: 1,
        url: 'https://media.vrbo.com/lodging/30000000/29670000/29664400/29664396/5e4ae9c3.f10.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media.vrbo.com/lodging/31000000/30300000/30298900/30298855/83a9648a.f10.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media.vrbo.com/lodging/76000000/75800000/75799500/75799429/ae3e4aaa.f10.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.rentalescapes.com/images/properties/117475/original/117475_1470770494_original.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.rentalescapes.com/images/properties/117475/original/117475_15730501900007_original.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.rentalescapes.com/images/properties/117475/original/117475_15730506300008_original.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.rentalescapes.com/images/properties/117475/original/117475_15730507070009_original.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.rentalescapes.com/images/properties/117475/original/117475_1470770525_original.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53814871/original/021160fb-bfea-44df-907c-2a231b18d715.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-577415924660754726/original/9e54c300-97f0-4a3e-a2ca-db2a6bf0cf22.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-577415924660754726/original/36a36e2e-c065-481f-8ae6-ddeba1d33377.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-577415924660754726/original/394a13c7-6a36-4fed-927e-8deb3c963a95.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-577415924660754726/original/5c83ec33-2155-4b6b-9fe0-f391dc8d13b2.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40213812/original/a58c4994-d614-4dad-aa41-fa40b9b70e7f.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/7941c840-5f62-418c-97d7-936694ce7f0a.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/c6b3f173-a6b7-4aaf-86d9-d52a15778f57.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/06afaa92-7f4e-4bed-9888-ed11227905bb.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/29d2ebb7-6673-4e8b-9c3e-e5febfb52c88.jpg?im_w=960',
        preview: false
      },
      {
        spotId: 7,
        url: '',
        preview: true
      },
      {
        spotId: 7,
        url: '',
        preview: false
      },
      {
        spotId: 8,
        url: '',
        preview: true
      },
      {
        spotId: 9,
        url: '',
        preview: true
      },
      {
        spotId: 10,
        url: '',
        preview: true
      },
      {
        spotId: 11,
        url: '',
        preview: true
      },
      {
        spotId: 12,
        url: '',
        preview: true
      },
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