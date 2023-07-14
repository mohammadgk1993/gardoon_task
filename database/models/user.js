const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const User = connection.sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "user",
      values: ["admin", "user"]
    }
  },
  {
    tableName: "Users",
    timestamps: true
  }
);

(async () => {
  try {
    // Check if an admin user already exists
    const adminUser = await User.findOne({ where: { username: "admin" } });
    
    // If no admin user found, create one
    if (!adminUser) {
      const username = 'admin';
      const password = 'adminPassword'; // Replace with a secure password
      
      await User.create({ username, password, role: "admin" });
      console.log('Admin user created successfully.');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
})();

module.exports = { User };