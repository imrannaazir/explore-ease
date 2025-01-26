/* eslint-disable no-console */

import colors from 'colors';
import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import AuthServices from './app/modules/auth/auth.services';
import { initializeSocket } from './socket';
let server: Server = createServer(app);
const port = process.env.PORT || 3000;
async function main() {
  try {
    if (!config.database_url) {
      throw new Error(
        'DATABASE_URL is not defined in the environment variables',
      );
    }
    await mongoose.connect(config.database_url as string);
    await AuthServices.seedAdmin();
    server = app.listen(
      port,

      () => {
        console.log(
          colors.green(`Server is running: `),
          colors.blue.bold(`http://localhost:${port}`),
        );
      },
    );
    initializeSocket(server);
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandledRejection
process.on('unhandledRejection', (error) => {
  console.log(
    colors.red.bold('😈 unhandledRejection is detected, shutting down...'),
    error,
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// handle uncaughtException
process.on('uncaughtExceptionMonitor', (error) => {
  console.log(
    colors.red.bold('😈 unhandledRejection is detected, shutting down...'),
    error,
  );
});
