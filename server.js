const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection');
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception');
  process.exit(1);
});

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = require('./app');

const server = app.listen(process.env.PORT, () => console.log('Server is running!'));

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully!')
  server.close(() => {
    console.log('Process terminated!')
  })
})
