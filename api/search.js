import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  certNumber: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  standard: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Suspended'], default: 'Active' }
});

const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

// Connect to MongoDB
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/qams';
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { cert } = req.query;

    if (!cert) {
      return res.status(400).json({
        success: false,
        error: 'Certificate number is required'
      });
    }

    const certificate = await Certificate.findOne({ certNumber: cert.toUpperCase() });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        found: false,
        error: 'Certificate not found'
      });
    }

    return res.status(200).json({
      success: true,
      found: true,
      data: {
        certNumber: certificate.certNumber,
        companyName: certificate.companyName,
        standard: certificate.standard,
        issueDate: certificate.issueDate,
        expiryDate: certificate.expiryDate,
        status: certificate.status
      }
    });

  } catch (error) {
    console.error('Certificate search error:', error);
    return res.status(500).json({
      success: false,
      error: 'Search failed. Please try again.'
    });
  }
}
