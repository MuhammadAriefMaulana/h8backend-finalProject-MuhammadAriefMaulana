'use strict';
const { hash, verify: verifyHash } = require("argon2");
const { sign, verify } = require("jsonwebtoken");
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }

    generateToken() {
      const { id, email } = this;
      const token = sign({ id, email }, process.env.JWT_SECRET);
      return token;
    }

    async verify(password) {
      return verifyHash(this.password, password);
    }
  }

  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    address: DataTypes.TEXT,
    phoneNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    user.password = await hash(user.password);
  });

  return User;
};