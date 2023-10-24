import mongoose from 'mongoose';

async function connect() {
    const dbUri: string = process.env.MONGODB_URI
    try {
        await mongoose.connect(dbUri);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connect