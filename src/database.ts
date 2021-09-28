import mongoose = require('mongoose');

export const mongooseConnect = (): void => {
	mongoose.Promise = global.Promise

	let options: mongoose.ConnectOptions = {
		minPoolSize: 1,
		maxPoolSize: 20,
		socketTimeoutMS: 60000,
		serverSelectionTimeoutMS: 60000,
		loggerLevel: 'error'
	}

	mongoose.connect(process.env.MONGO_URI!, options);

	mongoose.connection.on('connecting', () => console.info('database connecting'))
	mongoose.connection.on('connected', () => console.info('database connected'))
	mongoose.connection.on('disconnecting', () => console.info('database disconnecting'))
	mongoose.connection.on('disconnected', () => console.info('database disconnected'))
	mongoose.connection.on('error', () => console.error('database error'))
}
