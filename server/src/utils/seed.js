require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const seedData = async () => {
  console.log('--- Initializing Cynbit Database Seeder ---');
  await db.initDatabase();

  // 1. Seed Default Admin User
  const existingAdmin = await db.get('SELECT * FROM admin_users WHERE username = ? OR email = ?', [
    'admin',
    'admin@cynbit.in',
  ]);

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@Cynbit2026!', salt);
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO admin_users (username, email, password_hash, full_name, role, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['admin', 'admin@cynbit.in', passwordHash, 'Cynbit Lead Architect', 'admin', now]
    );
    console.log('Default admin created: admin@cynbit.in / Admin@Cynbit2026!');
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Seed Realistic Demo Enquiries if table is empty
  const enquiryCount = await db.get('SELECT COUNT(*) as count FROM enquiries');
  if (enquiryCount && enquiryCount.count === 0) {
    console.log('Seeding demo project enquiries for recruiter walkthrough...');
    const now = new Date();

    const sample1Date = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const sample2Date = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString();
    const sample3Date = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();

    await db.run(
      `INSERT INTO enquiries (
        reference_id, services, project_name, project_desc, objective, target_audience,
        features, budget, timeline, full_name, email, phone, company, status, admin_notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'CYN-2026-A8F21D',
        JSON.stringify(['AI Automation & AI Agents', 'Cloud Infrastructure']),
        'Automated Supply Chain Intelligence',
        'Enterprise AI agent system that reads logistics telemetry and predicts inventory stockouts across 4 regional warehouses.',
        'Automate manual workflow',
        'Enterprise B2B',
        JSON.stringify(['Autonomous Agents', 'Predictive Analytics', 'Role-Based Access', 'Slack Alerts']),
        '₹1,00,000–₹5,00,000',
        '1–3 months',
        'Rajesh Sharma',
        'rajesh.s@logistixflow.com',
        '+91 98290 12345',
        'LogistixFlow India',
        'In Progress',
        'Initial discovery call scheduled with lead architect. Architecture doc shared.',
        sample1Date,
        sample1Date,
      ]
    );

    await db.run(
      `INSERT INTO enquiries (
        reference_id, services, project_name, project_desc, objective, target_audience,
        features, budget, timeline, full_name, email, phone, company, status, admin_notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'CYN-2026-E49C7B',
        JSON.stringify(['Web Development', 'UI/UX Design']),
        'Fintech Micro-Lending Portal',
        'High-performance Next.js customer portal with Aadhaar e-KYC integration and instant risk assessment dashboard.',
        'Build new MVP from scratch',
        'B2C Consumers & MSMEs',
        JSON.stringify(['KYC Integration', 'Interactive Dashboard', 'Payment Gateway', 'Audit Trail']),
        '₹50,000–₹1,00,000',
        'Within 1 month',
        'Pooja Verma',
        'pooja.verma@fintechedge.io',
        '+91 98765 43210',
        'FinEdge Technologies',
        'Contacted',
        'Shared portfolio case studies. Follow-up meeting scheduled for Friday.',
        sample2Date,
        sample2Date,
      ]
    );

    await db.run(
      `INSERT INTO enquiries (
        reference_id, services, project_name, project_desc, objective, target_audience,
        features, budget, timeline, full_name, email, phone, company, status, admin_notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'CYN-2026-8B132C',
        JSON.stringify(['Mobile App Development', 'Custom Software Development']),
        'Smart Clinic Patient Booking System',
        'Cross-platform Flutter mobile app with doctor calendar sync, automated SMS reminders, and prescription storage.',
        'Scale existing product',
        'Healthcare Providers & Patients',
        JSON.stringify(['Real-time Calendar', 'Push Notifications', 'PDF Export', 'HIPAA Compliant']),
        '₹25,000–₹50,000',
        'ASAP',
        'Dr. Ankit Mehta',
        'dr.mehta@carepulse.in',
        '+91 88990 11223',
        'CarePulse Clinics',
        'New',
        '',
        sample3Date,
        sample3Date,
      ]
    );

    console.log('Sample demo enquiries seeded successfully.');
  }

  console.log('--- Database Seeding Complete ---');
};

if (require.main === module) {
  seedData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = seedData;
