'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/bookmarks.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Bookmarks", data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookmarks", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  }
};
