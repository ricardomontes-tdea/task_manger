const mongoose = require('mongoose');

const {
  MONGODB_URI,
  DB_NAME
} = process.env

const dbConnection = async () => {
  console.log('---> mongo: ',MONGODB_URI);
  console.log('---> db: ',DB_NAME);

  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log('[INFO] MongoDB is online');
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Is not possible to initialize the connection with MONGO');
  }
}

module.exports = {
  dbConnection
}
