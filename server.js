const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middlewares/error');

// Route files
const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/comments', comments);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red.bold);
	// Close server & exit process
	server.close(() => process.exit(1));
});
