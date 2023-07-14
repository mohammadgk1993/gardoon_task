const { File } = require("./models/file");
const { User } = require("./models/user");

const loadDatabase = async () => {
  await File.sync({ alter: process.env.MODE === "development" });
  await User.sync({ alter: process.env.MODE === "development" });
};

loadDatabase().catch((e) => {
  console.log(e);
  process.exit(1);
});