const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create our User model
class User extends Model {}

// define table columns and configurations
User.init(
  {
    // define the id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // if allowNull is set to false, we can validate the data
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate to make sure length is greater than 4 characters
      validate: {
        len: [4],
      },
    },
  },
  {
    // table configuration options go here
    hooks: {
      // beforeCreate of new user hook
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // beforeUpdate of new password hook
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    // pass in our imported sequelize connection
    sequelize,

    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,

    // don't pluralize name of the database table
    freezeTableName: true,

    // use underscores instead of came-casing
    underscored: true,

    // make is so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
