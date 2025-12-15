import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// import routes
import healthCheck from './controllers/healthCheck.controller.js';

// routes
app.get('/healthcheck', healthCheck);

// import error routes
import errorHandler from './middlewares/error.middleware.js';

// error handling middleware
app.use(errorHandler);

export default app;
