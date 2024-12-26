import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  pool: {
    max: 1,
    idle: Infinity,
    maxUses: Infinity,
  },
});

export default sequelize;
