import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // eslint-disable-next-line no-undef
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`MongoDB connection failed: ${error.message}`);
        console.warn('Server will continue without database connection.');
        console.warn('To enable database, ensure MongoDB is running or update MONGO_URI in .env');
    }
};

export default connectDB;
