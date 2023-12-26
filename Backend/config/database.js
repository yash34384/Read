const mongoose = require('mongoose');

// database connection function 
const databaseConnected = () => {
  mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
      console.log('Database connected succesfully');
    })
    .catch((err) => {
      console.log(`Error Occur => ${err}`);
    })
}

module.exports = databaseConnected;