import express from 'express'
import { body, validationResult } from 'express-validator'
import Contact from '../models/Contact.js'
import nodemailer from 'nodemailer'

const router = express.Router()

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .trim()
    .matches(/^\d{10}$/)
    .withMessage('Phone must be 10 digits'),
  body('message')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Message must be at least 20 characters'),
]

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    const { name, email, phone, company, service, message } = req.body

    // Create contact submission
    const contact = new Contact({
      name,
      email,
      phone,
      company,
      service,
      message,
      ipAddress: req.ip,
    })

    await contact.save()

    // Send email notification (optional - if email config is available)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'info@qamsglobal.com',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        })
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr)
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
      data: { id: contact._id },
    })
  } catch (error) {
    next(error)
  }
})

export default router
