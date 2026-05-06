import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true, 
    minlength: 2 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  phone: { 
    type: String, 
    trim: true 
  },
  company: { 
    type: String, 
    trim: true 
  },
  service: { 
    type: String, 
    enum: ['Audit', 'Training', 'Certification', 'Other'], 
    default: 'Other' 
  },
  message: { 
    type: String, 
    required: true, 
    minlength: 20 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  ipAddress: { 
    type: String 
  },
})

export default mongoose.model('Contact', ContactSchema)
