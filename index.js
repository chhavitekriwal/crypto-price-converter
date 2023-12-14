const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const logger = require('./utils/winston');

const PORT = process.env.PORT || 8080;
let server;
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
          logger.info("Connected to MongoDB database")
          server = app.listen(PORT, ()=>{
            logger.info(`Server listening on ${PORT}`)
          });
        })

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});