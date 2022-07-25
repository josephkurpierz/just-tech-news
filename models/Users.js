const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

//create user model
class User extends Model {}

//define table columns and configuration
User.init(
  {
    //Table column definitions go here
    //define the id column
    id: {
      //use the special sequelize datatypes object to provide what datatype it is
      type: DataTypes.INTEGER,
      //this is equivalent od SQL's 'NOT NULL" option
      allowNull: false,
      //instruct that this is the primart key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define the username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //there cannot be any duplicate email values in this table
      unique: true,
      //if allowNull is set to false, we can run our data through validators before creation
      validate: {
        isEmail: true,
      },
    },
    //define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //this means the password must be at least 4 characters long
        len: [4],
      },
    },
  },
  {
    hooks: {
      // set up before Create lifecycle hook functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password,10);
        return updatedUserData;
      }
    },
    // table configuration options go here
    //pass in our imported sequelize connection
    sequelize,
    //don't automatically create timestamps fields
    timestamps: false,
    //don't pluralize name of database table
    freezeTableName: true,
    //use underscores instead of camel casing
    underscored: true,
    //make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
