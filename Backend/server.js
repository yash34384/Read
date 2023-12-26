const app = require('./app');
const dotenv = require('dotenv');
const databaseConnected = require('./config/database');
const cloudinary = require('cloudinary');

// uncaught exception error 
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to uncaught exception');
  process.exit(1);
})

// reading .env file 
dotenv.config({ path: "Backend/config/config.env" });

// database connection call 
databaseConnected();

// cloudinary setup 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// running nodejs port
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running at port:${process.env.PORT}`);
})

// unhandeled promise rejection 
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to unhandeled promise rejection');
  server.close(() => {
    process.exit(1);
  })
})