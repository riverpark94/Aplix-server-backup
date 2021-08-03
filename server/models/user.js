'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Board);
      // this.belongsToMany(models.Movie,{ through: models.UsersLikeMovies });
    }
    
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};