import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';

const app: Application = express();
// parser
app.use(express.json());
app.use(cookieParser());

// List of allowed origins
const allowedOrigins: string[] = [config.client_url!];

// Configure CORS
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({
    status: StatusCodes.OK,
    success: true,
    message: `App is alive 😀`,
  });
});

// all route
app.use('/api/v1', router);

// handle global error handler
app.use(globalErrorHandler);

// handle 404 error
app.use(notFoundHandler);

export default app;
