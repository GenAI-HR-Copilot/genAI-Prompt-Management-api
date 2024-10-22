import { Sequelize } from 'sequelize';
import { config } from '../config/config.js';
// import config from '../config/config.js';

const chosenConfig = config.development;

const db = new Sequelize(
  chosenConfig.database,
  chosenConfig.username,
  chosenConfig.password,
  {
    host: chosenConfig.host,
    dialect: chosenConfig.dialect,
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    await db.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default db;
