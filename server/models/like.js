'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //  models.User.belongsToMany(models.Post, { through: Like, foreignKey: 'userId'  });
      //models.Post.belongsToMany(models.User, { through: Like, foreignKey: 'postId'  });
    }
  }
  Like.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};