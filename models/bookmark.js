'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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

  Bookmark.beforeCreate(async (bookmark) => {
    user.password = await hash(user.password);
  });
};