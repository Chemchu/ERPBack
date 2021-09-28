import mongoose = require('mongoose');

export const mongooseConnection = (): void => {
	mongoose.Promise = global.Promise

    let mongoURI: string = process.env.MONGO_URI!
	let options: mongoose.ConnectOptions = {
		minPoolSize: 1,
		maxPoolSize: 20,
		socketTimeoutMS: 60000,
		serverSelectionTimeoutMS: 60000,
		loggerLevel: 'error'
	}

	mongoose.connect(mongoURI, options);

	mongoose.connection.on('connecting', () => console.info('database connecting'))
	mongoose.connection.on('connected', () => console.info('database connected'))
	mongoose.connection.on('disconnecting', () => console.info('database disconnecting'))
	mongoose.connection.on('disconnected', () => console.info('database disconnected'))
	mongoose.connection.on('error', () => console.error('database error'))
}
