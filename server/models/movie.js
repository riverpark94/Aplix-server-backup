'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.User, { through: models.UsersLikeMovies });
    }
  };
  Movie.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    link: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: DataTypes.STRING,
    director:{
      allowNull: false,
      type: DataTypes.STRING
    },
    actor: {
      allowNull: false,
      type: DataTypes.STRING
    },
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};