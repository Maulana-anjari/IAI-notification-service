// src/app.js
import express from 'express';
import connectDB from './config/database.js';
import cron from 'cron';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routesNotif from './routes/index.js';
import userRoutes from './routes/userRoutes.js';
import { notifyUsers } from './controllers/notificationController.js';

dotenv.config();

const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors({
	origin: ["http://localhost:3000",  process.env.CLIENT_URL],
	methods: "GET,POST,PUT,DELETE",
	credentials: true,
	allowedHeaders: ['Content-Type']
	// allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api', routesNotif);
app.use('/api', userRoutes);
app.use((req, res, next) => {
	const error = new Error("Not found!");
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: true,
		message: error.message
	});
});

const PORT = process.env.PORT || 3000;
connectDB(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	  });
});

// Schedule notification to run every 30 minutes
const notificationJob = new cron.CronJob('*/30 * * * *', notifyUsers);
notificationJob.start();
