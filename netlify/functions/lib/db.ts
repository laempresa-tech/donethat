import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const connection = await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  cachedConnection = connection;
  return connection;
}

// Submission Schema
const submissionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['user', 'expert'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Index for cursor-based pagination
  },
});

// Create compound index for efficient pagination
submissionSchema.index({ createdAt: -1, _id: -1 });

export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
