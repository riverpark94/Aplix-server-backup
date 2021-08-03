'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UsersLikeMovies',
      {
      movieId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
          as: 'movieId'
        }
      },
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      }
    );

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UsersLikeMovies');

  }
};
