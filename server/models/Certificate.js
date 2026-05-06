import mongoose from 'mongoose'

const CertificateSchema = new mongoose.Schema({
  certNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true, 
    trim: true 
  },
  orgName: { 
    type: String, 
    required: true 
  },
  standard: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String 
  },
  scope: { 
    type: String 
  },
  issuedOn: { 
    type: Date 
  },
  expireOn: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Expired', 'Suspended'], 
    default: 'Active' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
})

export default mongoose.model('Certificate', CertificateSchema)
