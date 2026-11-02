const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { app, startServer } = require('../src/server');

test.before(async () => {
  process.env.NODE_ENV = 'test';
  await startServer();
});

test('GET /api/health should return 200 OK and healthy status', async () => {
  const res = await request(app).get('/api/health');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, 'healthy');
  assert.strictEqual(res.body.service, 'Cynbit Smart Project Discovery API');
});

test('POST /api/enquiries should reject empty or invalid payload with 400', async () => {
  const res = await request(app).post('/api/enquiries').send({});
  assert.strictEqual(res.status, 400);
  assert.strictEqual(res.body.success, false);
  assert.ok(Array.isArray(res.body.errors));
  assert.ok(res.body.errors.length > 0);
});

let createdReferenceId = '';

test('POST /api/enquiries should successfully submit valid project discovery', async () => {
  const validPayload = {
    services: ['AI Automation & AI Agents', 'Web Development'],
    projectName: 'Autonomous Agent Platform',
    projectDesc: 'Building an automated agent swarm for customer support triage and resolution.',
    objective: 'Automate manual workflow',
    targetAudience: 'Global SaaS customers',
    features: ['LLM Support', 'Multi-tenant', 'Vector DB'],
    budget: '₹1,00,000–₹5,00,000',
    timeline: '1–3 months',
    fullName: 'Aditya Mathur',
    email: 'aditya.mathur@example.com',
    phone: '+91 99887 76655',
    company: 'Apex Intelligence',
  };

  const res = await request(app).post('/api/enquiries').send(validPayload);
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.referenceId.startsWith('CYN-'));
  createdReferenceId = res.body.referenceId;
});

test('POST /api/enquiries should detect duplicate submissions', async () => {
  const duplicatePayload = {
    services: ['AI Automation & AI Agents'],
    projectName: 'Autonomous Agent Platform',
    projectDesc: 'Building an automated agent swarm for customer support triage and resolution.',
    objective: 'Automate manual workflow',
    targetAudience: 'Global SaaS customers',
    features: ['LLM Support'],
    budget: '₹1,00,000–₹5,00,000',
    timeline: '1–3 months',
    fullName: 'Aditya Mathur',
    email: 'aditya.mathur@example.com',
    phone: '+91 99887 76655',
    company: 'Apex Intelligence',
  };

  const res = await request(app).post('/api/enquiries').send(duplicatePayload);
  assert.strictEqual(res.status, 409);
  assert.strictEqual(res.body.success, false);
  assert.strictEqual(res.body.isDuplicate, true);
});

test('GET /api/enquiries/track/:refId should return enquiry status for valid reference ID', async () => {
  assert.ok(createdReferenceId, 'Reference ID should have been created');
  const res = await request(app).get(`/api/enquiries/track/${createdReferenceId}`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.strictEqual(res.body.enquiry.referenceId, createdReferenceId);
  assert.strictEqual(res.body.enquiry.status, 'New');
});

test('GET /api/enquiries/track/:refId should return 404 for non-existent reference ID', async () => {
  const res = await request(app).get('/api/enquiries/track/CYN-9999-FAKE99');
  assert.strictEqual(res.status, 404);
  assert.strictEqual(res.body.success, false);
});

test('POST /api/auth/login should reject invalid credentials with 401', async () => {
  const res = await request(app).post('/api/auth/login').send({
    identifier: 'admin@cynbit.in',
    password: 'WrongPassword123!',
  });
  assert.strictEqual(res.status, 401);
  assert.strictEqual(res.body.success, false);
});

let adminToken = '';

test('POST /api/auth/login should authenticate seeded admin and return JWT', async () => {
  const res = await request(app).post('/api/auth/login').send({
    identifier: 'admin@cynbit.in',
    password: 'Admin@Cynbit2026!',
  });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.token);
  assert.strictEqual(res.body.user.role, 'admin');
  adminToken = res.body.token;
});

test('GET /api/admin/enquiries should reject request without JWT with 401', async () => {
  const res = await request(app).get('/api/admin/enquiries');
  assert.strictEqual(res.status, 401);
});

test('GET /api/admin/enquiries should return enquiries list with valid JWT', async () => {
  const res = await request(app)
    .get('/api/admin/enquiries')
    .set('Authorization', `Bearer ${adminToken}`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.ok(res.body.data.length > 0);
  assert.ok(res.body.pagination.total >= 1);
});

test('GET /api/admin/stats should return aggregated KPI analytics', async () => {
  const res = await request(app)
    .get('/api/admin/stats')
    .set('Authorization', `Bearer ${adminToken}`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.stats.totalEnquiries > 0);
  assert.ok(res.body.stats.statusCounts.New >= 1);
  assert.ok(res.body.stats.serviceDistribution);
});
