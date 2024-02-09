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
      // define association here
      // User.hasMany(models.Post, {
      //   foreignKey: 'userId', // Name of the foreign key column in the Posts table
      //   onDelete: 'CASCADE',  // Optional: Cascade deletes
        
      // });// This establishes a one-to-many relationship
      //User.belongsTo(models.Post)

      // User.belongsToMany(models.Post, {
      //   through: 'Like',
      //   foreignKey: 'userId'
      // });
      //models.User.belongsToMany(models.Post, { through: models.Like, foreignKey: 'userId'  });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};