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
        url: 'https://www.rentalescapes.com/images/properties/125347/original/125347_1631804372796386_original.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://www.rentalescapes.com/images/properties/125347/original/125347_1631804296070126_original.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.rentalescapes.com/images/properties/125347/original/125347_1631804095697025_original.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.rentalescapes.com/images/properties/125347/original/125347_1631804210482877_original.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.rentalescapes.com/images/properties/125347/original/125347_1631803980480051_original.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/8843cfd2-0a51-457b-88ef-5581a50f5499.jpg?im_w=1440',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/8edafcb6-82d9-47de-a43f-22fd9a374d6c.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/b2336467-2156-4888-a113-ea7a1a2f978e.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/72301440-16d3-4ef0-8ca5-b3c065afc46c.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/aa1de7b7-44b3-48ee-afb3-9dbd4cb20f94.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/84ecc291-3934-4820-b1b4-a6b158d5f709.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/90c192d2-bc2c-426d-93e4-afc2cdb7c249.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/07d55f69-b229-4110-bfed-157fc1099999.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/37e83ede-25eb-4682-aa63-4715fbdb9f82.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/a7a1506c-fcc0-4c5f-9980-38a6cc87074b.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45945949/original/d013c43e-904c-49a9-9dd8-92a9e090124f.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45945949/original/0b68a28b-db3f-4677-bdb1-8d37a12c99e3.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45945949/original/7f056fa6-174a-47bd-9412-d1e2d4971a61.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45945949/original/2e5b1643-e9bb-4a2c-b692-5af9c72c9261.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45945949/original/3c87a8ee-ee54-4693-900f-e5b030174202.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/94fbe801-b1ec-4faf-af6f-72f7d972b873.jpg?im_w=1440',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-562915491810130929/original/c17c67cf-96cd-452c-ba88-c3852ddeea27.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-562915491810130929/original/461545b7-f7d3-4ffe-8968-88b8b4748827.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/f7f6550d-fcff-43d4-9198-81b0df3865c4.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/b086a621-702f-4eb6-b893-48ef8c551c08.jpg?im_w=1440',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-633162076506488935/original/98935927-6283-4dc5-829c-987e2af4e96c.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-633162076506488935/original/4c560f8c-9f05-44d0-a067-a386d2864cde.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-633162076506488935/original/3bf7ab1c-f331-4803-814e-c573f66cc85d.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-633162076506488935/original/788e091c-43db-4741-89b4-226d8a6284fb.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-633162076506488935/original/cff7041f-5268-4291-94b5-f03ccdc760e9.jpeg?im_w=1440',
        preview: false
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};