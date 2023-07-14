const { Sequelize } = require("sequelize");

function DatabaseConnection() {
  this.sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
    }
  );
  this.testConnection = async () => {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", e);
      process.exit(1);
    }
  };
  this.testConnection();
}

module.exports = { connection: new DatabaseConnection() };