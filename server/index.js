import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.js'
import searchRoutes from './routes/search.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/search', searchRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handler
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' })
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/qams'

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    // Start server anyway for development without DB
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`)
    })
  })
