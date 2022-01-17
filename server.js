const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Route files
const users = require('./routes/users');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 3000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
