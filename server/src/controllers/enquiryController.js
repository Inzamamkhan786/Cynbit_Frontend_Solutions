const db = require('../config/db');
const { generateReferenceId } = require('../utils/referenceGenerator');

/**
 * Create a new project discovery enquiry
 */
const createEnquiry = async (req, res, next) => {
  try {
    const {
      services,
      projectName,
      projectDesc,
      objective,
      targetAudience,
      features,
      budget,
      timeline,
      fullName,
      email,
      phone,
      company,
    } = req.sanitizedBody;

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Duplicate check: Look for identical project name and email submitted within the past 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const existingRecent = await db.get(
      `SELECT id, reference_id FROM enquiries 
       WHERE email = ? AND project_name = ? AND created_at >= ?`,
      [email, projectName, tenMinutesAgo]
    );

    if (existingRecent) {
      return res.status(409).json({
        success: false,
        message: 'A discovery enquiry for this project was already submitted recently.',
        referenceId: existingRecent.reference_id,
        isDuplicate: true,
      });
    }

    // Generate unique reference ID (with collision retry)
    let referenceId = generateReferenceId();
    let collision = await db.get('SELECT id FROM enquiries WHERE reference_id = ?', [referenceId]);
    while (collision) {
      referenceId = generateReferenceId();
      collision = await db.get('SELECT id FROM enquiries WHERE reference_id = ?', [referenceId]);
    }

    const now = new Date().toISOString();

    const result = await db.run(
      `INSERT INTO enquiries (
        reference_id, services, project_name, project_desc, objective, target_audience,
        features, budget, timeline, full_name, email, phone, company, status, admin_notes,
        ip_address, user_agent, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        referenceId,
        JSON.stringify(services),
        projectName,
        projectDesc,
        objective,
        targetAudience,
        JSON.stringify(features),
        budget,
        timeline,
        fullName,
        email,
        phone,
        company,
        'New',
        '',
        ipAddress,
        userAgent,
        now,
        now,
      ]
    );

    // Record initial status audit log
    await db.run(
      `INSERT INTO enquiry_status_logs (enquiry_id, old_status, new_status, changed_by, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [result.lastID, 'None', 'New', 'System / Client Submission', 'Project enquiry initiated via Discovery Wizard', now]
    );

    res.status(201).json({
      success: true,
      message: 'Project discovery submitted successfully. Our lead architects will analyze your requirements.',
      referenceId,
      enquiryId: result.lastID,
      createdAt: now,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Public client tracking endpoint: lookup enquiry status by reference ID
 */
const trackEnquiry = async (req, res, next) => {
  try {
    const { refId } = req.params;
    if (!refId || typeof refId !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid reference ID is required.',
      });
    }

    const cleanRefId = refId.trim().toUpperCase();
    const enquiry = await db.get(
      `SELECT reference_id, project_name, services, status, created_at, updated_at
       FROM enquiries WHERE reference_id = ?`,
      [cleanRefId]
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: `No enquiry found with reference ID '${cleanRefId}'. Please double-check your code.`,
      });
    }

    res.json({
      success: true,
      enquiry: {
        referenceId: enquiry.reference_id,
        projectName: enquiry.project_name,
        services: JSON.parse(enquiry.services || '[]'),
        status: enquiry.status,
        submittedAt: enquiry.created_at,
        lastUpdated: enquiry.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all enquiries with filtering, search, and pagination
 */
const getAllEnquiries = async (req, res, next) => {
  try {
    const {
      search = '',
      status = '',
      service = '',
      budget = '',
      page = 1,
      limit = 15,
      sortBy = 'created_at',
      sortOrder = 'DESC',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 15));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    const params = [];

    if (search.trim()) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      conditions.push(`(
        LOWER(reference_id) LIKE ? OR
        LOWER(full_name) LIKE ? OR
        LOWER(email) LIKE ? OR
        LOWER(company) LIKE ? OR
        LOWER(project_name) LIKE ?
      )`);
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (status.trim()) {
      conditions.push('status = ?');
      params.push(status.trim());
    }

    if (service.trim()) {
      conditions.push('services LIKE ?');
      params.push(`%${service.trim()}%`);
    }

    if (budget.trim()) {
      conditions.push('budget = ?');
      params.push(budget.trim());
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total matching count
    const countQuery = `SELECT COUNT(*) as total FROM enquiries ${whereClause}`;
    const countResult = await db.get(countQuery, params);
    const total = countResult ? countResult.total : 0;

    // Validate sort order
    const safeOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const allowedSortFields = ['created_at', 'updated_at', 'project_name', 'full_name', 'status', 'budget'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';

    // Query rows
    const dataQuery = `
      SELECT id, reference_id, services, project_name, project_desc, objective,
             target_audience, features, budget, timeline, full_name, email, phone,
             company, status, admin_notes, created_at, updated_at
      FROM enquiries
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeOrder}
      LIMIT ${limitNum} OFFSET ${offset}
    `;

    const rows = await db.all(dataQuery, params);

    const formattedRows = rows.map((r) => ({
      ...r,
      services: JSON.parse(r.services || '[]'),
      features: JSON.parse(r.features || '[]'),
    }));

    res.json({
      success: true,
      data: formattedRows,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get complete enquiry details including audit trail logs
 */
const getEnquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await db.get('SELECT * FROM enquiries WHERE id = ?', [id]);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    const logs = await db.all(
      `SELECT * FROM enquiry_status_logs WHERE enquiry_id = ? ORDER BY created_at DESC`,
      [id]
    );

    res.json({
      success: true,
      enquiry: {
        ...enquiry,
        services: JSON.parse(enquiry.services || '[]'),
        features: JSON.parse(enquiry.features || '[]'),
        logs,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update enquiry status and optional internal notes
 */
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note } = req.sanitizedStatus;

    const existing = await db.get('SELECT * FROM enquiries WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    const now = new Date().toISOString();
    const updatedNotes = note
      ? (existing.admin_notes ? existing.admin_notes + '\n' : '') + `[${now.slice(0, 10)}] ${note}`
      : existing.admin_notes;

    await db.run(
      `UPDATE enquiries 
       SET status = ?, admin_notes = ?, updated_at = ? 
       WHERE id = ?`,
      [status, updatedNotes, now, id]
    );

    // Record audit log
    const changedBy = req.user ? `${req.user.fullName} (${req.user.username})` : 'Admin User';
    await db.run(
      `INSERT INTO enquiry_status_logs (enquiry_id, old_status, new_status, changed_by, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, existing.status, status, changedBy, note || `Status updated from ${existing.status} to ${status}`, now]
    );

    res.json({
      success: true,
      message: `Enquiry status successfully updated to '${status}'.`,
      status,
      adminNotes: updatedNotes,
      updatedAt: now,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete enquiry
 */
const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db.get('SELECT id, reference_id FROM enquiries WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    await db.run('DELETE FROM enquiry_status_logs WHERE enquiry_id = ?', [id]);
    await db.run('DELETE FROM enquiries WHERE id = ?', [id]);

    res.json({
      success: true,
      message: `Enquiry ${existing.reference_id} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  trackEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};
