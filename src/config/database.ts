import { Sequelize } from "sequelize";
const config = require('./config.js')
// import config from "./config.js"; // Import configuration file

const env = (process.env.NODE_ENV || "development") as keyof typeof config;
const sequelize = new Sequelize(config[env].database!, config[env].username!, config[env].password!, {
    host: config[env].host,
    port: Number(config[env].port),
    dialect: config[env].dialect, // dialect should be typed as Dialect
});

// Test the connection
sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
