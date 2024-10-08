'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      Bookmark.belongsTo(models.Movie, {
        foreignKey: "movieId",
      });

      Bookmark.belongsTo(models.User, {
        foreignKey: "userId"
      });
    }
  }
  Bookmark.init({
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });

  return Bookmark;
};