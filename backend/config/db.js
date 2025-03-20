import mongoose from 'mongoose'

const connectDB = async () => {
	console.log(process.env.MONGO_URI)
	try {
		await mongoose.connect(process.env.MONGO_URI, {})
		console.log('MongoDB is connected')
	} catch (error) {
		console.error('Connection error', error)
		process.exit(1)
	}
}

export default connectDB
