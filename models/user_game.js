/** @format */

'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserGameHistory, { as: 'user_game_history', foreignKey: 'id_user' });
    }
  }
  UserGame.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          isUnique: (value, next) => {
            UserGame.findAll({
              where: { username: value },
              attributes: ['username'],
            })
              .then((user) => {
                if (user.length != 0) next(new Error('Username Telah digunakan!'));
                next();
              })
              .catch((onError) => console.log(onError));
          },
          notNull: {
            msg: 'Username tidak boleh kosong!',
          },
        },
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          isUnique: (value, next) => {
            UserGame.findAll({
              where: { email: value },
              attributes: ['email'],
            })
              .then((user) => {
                if (user.length != 0) next(new Error('Email Telah digunakan!'));
                next();
              })
              .catch((onError) => console.log(onError));
          },
          isEmail: {
            msg: 'Email tidak valid!',
          },
          notNull: {
            msg: 'Email tidak boleh kosong!',
          },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password tidak boleh kosong!',
          },
          min: 6,
        },
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'user_games',
      modelName: 'UserGame',
    }
  );
  return UserGame;
};
