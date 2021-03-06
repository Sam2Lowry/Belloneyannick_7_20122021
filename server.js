const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error');
const cors = require('cors');

// Route files
const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const auth = require('./routes/auth');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//CORS
app.use(
	cors({
		origin: 'http://localhost:4200',
		credentials: true,
	})
);

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/comments', comments);

// Handle Unhandled routes
app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'fail',
		message: `Route ${req.originalUrl} not found on this server`,
	});
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(
	PORT,
	console.log(
		`🚀 Server 🚀 running in ${process.env.NODE_ENV} mode on port ${PORT}`
			.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red.bold);
	// Close server & exit process
	server.close(() => process.exit(1));
});
