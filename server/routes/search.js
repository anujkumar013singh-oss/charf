import express from 'express'
import Certificate from '../models/Certificate.js'

const router = express.Router()

// GET /api/search?cert=XXXX - Search for certificate
router.get('/', async (req, res, next) => {
  try {
    const { cert } = req.query

    if (!cert || cert.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Certificate number is required',
      })
    }

    // Search for certificate (case-insensitive)
    const certificate = await Certificate.findOne({
      certNumber: { $regex: new RegExp(`^${cert.trim()}$`, 'i') },
    })

    if (!certificate) {
      return res.status(404).json({
        success: false,
        found: false,
        error: 'Certificate not found',
      })
    }

    res.json({
      success: true,
      found: true,
      certNumber: certificate.certNumber,
      orgName: certificate.orgName,
      standard: certificate.standard,
      address: certificate.address,
      scope: certificate.scope,
      issuedOn: certificate.issuedOn,
      expireOn: certificate.expireOn,
      status: certificate.status,
    })
  } catch (error) {
    next(error)
  }
})

// POST /api/search/seed - Seed sample certificates (for development)
router.post('/seed', async (req, res, next) => {
  try {
    const sampleCertificates = [
      {
        certNumber: 'QAMS-ISO9001-2024-0001',
        orgName: 'Sample Manufacturing Ltd',
        standard: 'ISO 9001:2015',
        address: '123 Industrial Area, Mumbai, Maharashtra',
        scope: 'Design, development and manufacturing of precision components',
        issuedOn: new Date('2024-01-15'),
        expireOn: new Date('2027-01-14'),
        status: 'Active',
      },
      {
        certNumber: 'QAMS-ISO14001-2024-0002',
        orgName: 'Green Solutions Pvt Ltd',
        standard: 'ISO 14001:2015',
        address: '45 Eco Park, Bangalore, Karnataka',
        scope: 'Environmental management for IT services and software development',
        issuedOn: new Date('2024-02-01'),
        expireOn: new Date('2027-01-31'),
        status: 'Active',
      },
      {
        certNumber: 'QAMS-ISO45001-2024-0003',
        orgName: 'SafeBuild Construction',
        standard: 'ISO 45001:2018',
        address: '78 Construction Hub, Delhi NCR',
        scope: 'Occupational health and safety management for construction projects',
        issuedOn: new Date('2024-03-10'),
        expireOn: new Date('2027-03-09'),
        status: 'Active',
      },
    ]

    // Clear existing certificates and insert new ones
    await Certificate.deleteMany({})
    await Certificate.insertMany(sampleCertificates)

    res.json({
      success: true,
      message: 'Sample certificates seeded successfully',
      count: sampleCertificates.length,
    })
  } catch (error) {
    next(error)
  }
})

export default router
