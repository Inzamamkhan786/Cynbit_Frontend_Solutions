import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  LogOut, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  IndianRupee, 
  TrendingUp, 
  Bot, 
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  Check,
  Edit2,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const STATUS_OPTIONS = ['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Rejected'];

const SERVICE_OPTIONS = [
  'All',
  'AI Automation & AI Agents',
  'Web Development',
  'Mobile App Development',
  'Custom Software Development',
  'Cloud Infrastructure',
  'UI/UX Design',
  'Other',
];

const AdminDashboardPage = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Data State
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNote, setUpdateNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fetch KPI Stats
  const fetchStats = async () => {
    try {
      const res = await api.admin.getStats();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  // Fetch Enquiries List
  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 10,
        search: search.trim() || undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        service: serviceFilter !== 'All' ? serviceFilter : undefined,
      };

      const res = await api.admin.getEnquiries(params);
      if (res.success) {
        setEnquiries(res.data || []);
        setPagination(res.pagination || { total: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
      setError(err.message || 'Failed to load enquiries list.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, search, statusFilter, serviceFilter]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchEnquiries();
    }
  }, [isAuthenticated, fetchEnquiries]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
    fetchEnquiries();
  };

  // View Details Modal
  const handleOpenDetails = async (enquiryId) => {
    setModalLoading(true);
    setSelectedEnquiry(null);
    setUpdateSuccess(false);

    try {
      const res = await api.admin.getEnquiryById(enquiryId);
      if (res.success && res.enquiry) {
        setSelectedEnquiry(res.enquiry);
        setUpdateStatus(res.enquiry.status);
        setUpdateNote('');
      }
    } catch (err) {
      alert('Failed to load enquiry details: ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  // Save Status Update
  const handleSaveStatus = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    setUpdateSuccess(false);

    try {
      const res = await api.admin.updateStatus(selectedEnquiry.id, updateStatus, updateNote);
      if (res.success) {
        setUpdateSuccess(true);
        // Refresh local details
        setSelectedEnquiry((prev) => ({
          ...prev,
          status: updateStatus,
          admin_notes: res.adminNotes || prev.admin_notes,
          logs: [
            {
              id: Date.now(),
              old_status: prev.status,
              new_status: updateStatus,
              changed_by: `${user.fullName} (${user.username})`,
              note: updateNote,
              created_at: new Date().toISOString(),
            },
            ...(prev.logs || []),
          ],
        }));
        setUpdateNote('');
        // Refresh table & stats
        fetchStats();
        fetchEnquiries();
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Quick Table Row Status Change
  const handleInlineStatusChange = async (enquiryId, newStatus) => {
    try {
      await api.admin.updateStatus(enquiryId, newStatus, 'Quick update via dashboard table');
      fetchStats();
      fetchEnquiries();
    } catch (err) {
      alert('Status update failed: ' + err.message);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      alert('No enquiries to export.');
      return;
    }

    const headers = [
      'Reference ID',
      'Client Name',
      'Email',
      'Phone',
      'Company',
      'Project Name',
      'Services',
      'Budget',
      'Timeline',
      'Status',
      'Created At',
    ];

    const rows = enquiries.map((item) => [
      item.reference_id,
      `"${item.full_name}"`,
      item.email,
      `"${item.phone}"`,
      `"${item.company || ''}"`,
      `"${item.project_name.replace(/"/g, '""')}"`,
      `"${item.services.join(', ')}"`,
      `"${item.budget}"`,
      `"${item.timeline}"`,
      item.status,
      item.created_at,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Cynbit_Enquiries_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'In Progress':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[#070a13] text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Admin Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-heading font-black text-white">
                  Architect CRM Hub
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as <strong className="text-slate-200">{user?.fullName || 'Lead Architect'}</strong> ({user?.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh CRM Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Export Table as CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 text-rose-400 border border-rose-800/40 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {/* Total Enquiries */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                Total Enquiries
                <Layers className="w-4 h-4 text-blue-400" />
              </span>
              <div className="mt-2 text-2xl md:text-3xl font-black text-white">
                {stats.totalEnquiries}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">All recorded requirements</span>
            </div>

            {/* New Submissions */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-blue-500/30 flex flex-col justify-between shadow-lg shadow-blue-500/5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center justify-between">
                New Actionable
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              </span>
              <div className="mt-2 text-2xl md:text-3xl font-black text-blue-400">
                {stats.statusCounts.New || 0}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Awaiting architect outreach</span>
            </div>

            {/* In Progress */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center justify-between">
                In Scoping / Prog
                <Clock className="w-4 h-4 text-purple-400" />
              </span>
              <div className="mt-2 text-2xl md:text-3xl font-black text-purple-400">
                {(stats.statusCounts['In Progress'] || 0) + (stats.statusCounts.Contacted || 0)}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Discovery calls in progress</span>
            </div>

            {/* Completed */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                Closed / Won
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </span>
              <div className="mt-2 text-2xl md:text-3xl font-black text-emerald-400">
                {stats.statusCounts.Completed || 0}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Kickoff contracts issued</span>
            </div>

            {/* Conversion Rate */}
            <div className="col-span-2 sm:col-span-1 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center justify-between">
                Conversion %
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </span>
              <div className="mt-2 text-2xl md:text-3xl font-black text-cyan-400">
                {stats.conversionRate}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Active qualification ratio</span>
            </div>
          </div>
        )}

        {/* Filter Controls & Search */}
        <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by client name, email, company, project, or reference ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Service:</span>
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors max-w-[200px] truncate"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enquiries Data Table */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="px-5 py-4">Reference & Project</th>
                  <th className="px-5 py-4">Client Contact</th>
                  <th className="px-5 py-4">Services Engaged</th>
                  <th className="px-5 py-4">Budget / Timeline</th>
                  <th className="px-5 py-4">Status & Stage</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-400" />
                      Loading pipeline records...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                      No project enquiries match the current filters.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Ref & Project */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[11px] font-bold text-cyan-400">
                            {enquiry.reference_id}
                          </span>
                          <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">
                            {enquiry.project_name}
                          </div>
                          <span className="text-[10px] text-slate-500 block">
                            {new Date(enquiry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <div className="font-semibold text-white">{enquiry.full_name}</div>
                          <div className="text-slate-400 text-[11px]">{enquiry.email}</div>
                          <div className="text-slate-500 text-[10px]">{enquiry.phone}</div>
                          {enquiry.company && (
                            <span className="text-[10px] text-blue-400 font-medium block">
                              {enquiry.company}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Services */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {enquiry.services.map((svc) => (
                            <span
                              key={svc}
                              className="text-[10px] px-2 py-0.5 rounded bg-blue-950/70 border border-blue-900/50 text-blue-300"
                            >
                              {svc}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Budget / Timeline */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <span className="text-emerald-400 font-semibold block text-[11px]">
                            {enquiry.budget}
                          </span>
                          <span className="text-slate-400 text-[10px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {enquiry.timeline}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleInlineStatusChange(enquiry.id, e.target.value)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-semibold focus:outline-none bg-slate-950 transition-colors ${getStatusColor(
                            enquiry.status
                          )}`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(enquiry.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-300 hover:text-white transition-all text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="px-5 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing {enquiries.length} of {pagination.total} enquiries
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-white font-mono font-bold">
                Page {page} of {pagination.totalPages || 1}
              </span>
              <button
                type="button"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Service Demand Analytics Section */}
        {stats && stats.serviceDistribution && (
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              Service Demand Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(stats.serviceDistribution).map(([svc, count]) => {
                const percentage = stats.totalEnquiries > 0 ? ((count / stats.totalEnquiries) * 100).toFixed(0) : 0;
                return (
                  <div key={svc} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300 truncate" title={svc}>{svc}</span>
                      <span className="font-bold text-blue-400">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Detail Modal / Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {selectedEnquiry.reference_id}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status}
                  </span>
                </div>
                <h2 className="text-2xl font-heading font-black text-white">
                  {selectedEnquiry.project_name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client & Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Client Profile
                </span>
                <div><span className="text-slate-500">Name:</span> <strong className="text-white">{selectedEnquiry.full_name}</strong></div>
                <div><span className="text-slate-500">Email:</span> <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-400 hover:underline">{selectedEnquiry.email}</a></div>
                <div><span className="text-slate-500">Phone:</span> <a href={`tel:${selectedEnquiry.phone}`} className="text-slate-300">{selectedEnquiry.phone}</a></div>
                {selectedEnquiry.company && (
                  <div><span className="text-slate-500">Company:</span> <strong className="text-white">{selectedEnquiry.company}</strong></div>
                )}
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Parameters
                </span>
                <div><span className="text-slate-500">Budget:</span> <strong className="text-emerald-400">{selectedEnquiry.budget}</strong></div>
                <div><span className="text-slate-500">Timeline:</span> <strong className="text-cyan-400">{selectedEnquiry.timeline}</strong></div>
                <div><span className="text-slate-500">Primary Objective:</span> <strong className="text-slate-200">{selectedEnquiry.objective}</strong></div>
                <div><span className="text-slate-500">Target Audience:</span> <strong className="text-slate-200">{selectedEnquiry.target_audience}</strong></div>
              </div>
            </div>

            {/* Services & Features */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1.5">Engaged Services:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEnquiry.services.map((svc) => (
                    <span key={svc} className="px-2.5 py-1 rounded-lg bg-blue-950 border border-blue-800/60 text-blue-300 font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {selectedEnquiry.features && selectedEnquiry.features.length > 0 && (
                <div>
                  <span className="text-slate-400 font-bold block mb-1.5">Requested Features:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEnquiry.features.map((feat) => (
                      <span key={feat} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-slate-400 font-bold block mb-1.5">Project Scope Description:</span>
                <p className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 leading-relaxed">
                  {selectedEnquiry.project_desc}
                </p>
              </div>
            </div>

            {/* Status Update Control Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <Edit2 className="w-3.5 h-3.5" />
                Update Enquiry Pipeline Status & Internal Log
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Pipeline Stage</label>
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Architect Note</label>
                  <input
                    type="text"
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    placeholder="e.g. Discovery call completed with client..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                {updateSuccess ? (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Status and audit log updated!
                  </span>
                ) : (
                  <span></span>
                )}

                <button
                  type="button"
                  disabled={updating}
                  onClick={handleSaveStatus}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  {updating ? 'Saving...' : 'Save Status Update'}
                </button>
              </div>
            </div>

            {/* Audit Trail Timeline */}
            {selectedEnquiry.logs && selectedEnquiry.logs.length > 0 && (
              <div className="space-y-2 text-xs">
                <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">
                  Audit Trail & History
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {selectedEnquiry.logs.map((log) => (
                    <div key={log.id} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-0.5">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>{log.changed_by}</span>
                        <span className="font-mono text-[10px]">{new Date(log.created_at).toLocaleString()}</span>
                      </div>
                      <div className="text-slate-200">
                        Status shifted to <strong className="text-blue-400">{log.new_status}</strong>
                      </div>
                      {log.note && <div className="text-slate-400 italic">"{log.note}"</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
