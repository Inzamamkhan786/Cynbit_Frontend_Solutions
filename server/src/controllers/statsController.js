const db = require('../config/db');

/**
 * Admin: Aggregated KPI metrics & pipeline statistics
 */
const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total Enquiries
    const totalRow = await db.get('SELECT COUNT(*) as total FROM enquiries');
    const totalEnquiries = totalRow ? totalRow.total : 0;

    // 2. Status Breakdown
    const statusRows = await db.all(
      `SELECT status, COUNT(*) as count FROM enquiries GROUP BY status`
    );
    const statusCounts = {
      New: 0,
      Contacted: 0,
      'In Progress': 0,
      Completed: 0,
      Rejected: 0,
    };
    statusRows.forEach((row) => {
      if (statusCounts[row.status] !== undefined) {
        statusCounts[row.status] = row.count;
      }
    });

    // 3. Conversion Rate: Active/Completed vs Total
    const qualifiedCount = statusCounts['In Progress'] + statusCounts['Completed'];
    const conversionRate = totalEnquiries > 0 ? ((qualifiedCount / totalEnquiries) * 100).toFixed(1) : 0;

    // 4. Budget Distribution
    const budgetRows = await db.all(
      `SELECT budget, COUNT(*) as count FROM enquiries GROUP BY budget ORDER BY count DESC`
    );

    // 5. Timeline Distribution
    const timelineRows = await db.all(
      `SELECT timeline, COUNT(*) as count FROM enquiries GROUP BY timeline ORDER BY count DESC`
    );

    // 6. Service Demand Analysis
    const allEnquiries = await db.all('SELECT services FROM enquiries');
    const serviceDistribution = {};
    allEnquiries.forEach((item) => {
      try {
        const parsed = JSON.parse(item.services || '[]');
        parsed.forEach((service) => {
          serviceDistribution[service] = (serviceDistribution[service] || 0) + 1;
        });
      } catch (e) {
        // ignore malformed JSON
      }
    });

    // 7. Recent 5 submissions
    const recentRows = await db.all(
      `SELECT id, reference_id, project_name, full_name, email, company, budget, timeline, status, created_at
       FROM enquiries ORDER BY created_at DESC LIMIT 5`
    );

    res.json({
      success: true,
      stats: {
        totalEnquiries,
        statusCounts,
        qualifiedCount,
        conversionRate: `${conversionRate}%`,
        budgetDistribution: budgetRows,
        timelineDistribution: timelineRows,
        serviceDistribution,
        recentSubmissions: recentRows,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
