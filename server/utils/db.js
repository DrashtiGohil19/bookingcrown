const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

// If MONGODBURI is provided, use it. Otherwise, fall back to an in-memory MongoDB
// for local development so the server can run without an external DB.
const mongoURI = process.env.MONGODBURI

const db = async () => {
    if (mongoURI && mongoURI.trim()) {
        mongoose.connect(mongoURI)
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log('MongoDB connection error:', err));
        return;
    }

    // Lazy-require mongodb-memory-server to avoid adding it to production bundles
    try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoose.connect(uri)
            .then(() => console.log('MongoDB (in-memory) connected'))
            .catch(err => console.log('In-memory MongoDB connection error:', err));

        // Ensure the in-memory server is stopped on process exit
        const cleanup = async () => {
            try { await mongoose.disconnect(); } catch (e) {}
            try { await mongod.stop(); } catch (e) {}
            process.exit(0);
        };
        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
    } catch (err) {
        console.log('Failed to start in-memory MongoDB. Please set MONGODBURI. Error:', err);
    }
}

module.exports = db