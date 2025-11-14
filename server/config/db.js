import { connect } from 'mongoose';

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('MONGO_URI not set in environment');
        // don't exit here to allow running without DB for some tasks, but warn strongly
        return;
    }

    try {
        await connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // rethrow so callers can decide what to do
        throw err;
    }
};

export default connectDB;