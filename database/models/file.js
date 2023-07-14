const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const File = connection.sequelize.define(
  "File",
  {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_list: {
      type: DataTypes.STRING,
    },
    limit: {
      type: DataTypes.STRING
    },
    limit_count: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "Files",
    timestamps: true
  }
);

module.exports = { File };