const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
