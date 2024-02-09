'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Post.belongsTo(models.User, {
      //   foreignKey: 'userId', // Name of the foreign key column in the Posts table
      //   onDelete: 'CASCADE',  // Optional: Cascade deletes
      // })


      Post.belongsTo(models.User, {
         foreignKey: 'userId'
      });
      //Post.hasOne(models.User);

      Post.hasMany(models.Like);
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    body: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};