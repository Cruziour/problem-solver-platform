import React from 'react';
import { Layers, FileText, CheckCircle, Upload, Users } from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import QuickActions from '../components/common/QuickActions';
import CategoryComplaintsTable from '../components/common/CategoryComplaintsTable';

// Dummy Data (Assuming this Sub-Admin manages the 'IT Support' category)
const subAdminStats = [
  { title: 'Total Complaints (IT Support)', value: 45, icon: Layers },
  {
    title: 'Open Complaints',
    value: 10,
    icon: FileText,
    trend: { value: '2 new', type: 'negative' },
  },
  {
    title: 'In-Progress Complaints',
    value: 15,
    icon: CheckCircle,
    trend: { value: '5 ongoing', type: 'positive' },
  },
];

const quickActions = [
  {
    name: 'Assign Solver',
    icon: Users,
    handler: () => alert('Opening Solver Assignment Modal'),
  },
  {
    name: 'Export Complaints (PDF)',
    icon: FileText,
    handler: () => alert('Initiating PDF Export...'),
  },
  {
    name: 'Export Complaints (Excel)',
    icon: Upload,
    handler: () => alert('Initiating Excel Export...'),
  },
];

const dummyCategoryComplaints = [
  {
    id: 'CMP-007',
    user: 'Ravi Kumar',
    category: 'IT Support',
    assignedSolver: 'Priya Singh',
    status: 'In Progress',
  },
  {
    id: 'CMP-012',
    user: 'Alia Khan',
    category: 'IT Support',
    assignedSolver: null,
    status: 'Open',
  },
  {
    id: 'CMP-020',
    user: 'Vikas Gupta',
    category: 'IT Support',
    assignedSolver: 'Rahul Sharma',
    status: 'Resolved',
  },
  {
    id: 'CMP-025',
    user: 'Sana Mehra',
    category: 'IT Support',
    assignedSolver: null,
    status: 'Open',
  },
];

const SubAdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-text-white border-b border-default pb-3">
        Sub-Admin Portal (IT Support Management)
      </h1>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subAdminStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* ⚡ QUICK ACTIONS */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-primary-blue" /> Management
          Actions
        </h2>
        <QuickActions actions={quickActions} />
      </section>

      {/* 📋 TABLE: Category Complaints Table */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <Layers className="w-5 h-5 mr-2 text-primary-blue" /> IT Support
          Complaints
        </h2>
        <CategoryComplaintsTable data={dummyCategoryComplaints} />
      </section>

      {/* 🔔 REAL-TIME & RESTRICTION */}
      <section className="p-4 bg-surface rounded-xl border border-default">
        <h3 className="text-lg font-semibold text-primary-blue mb-2">
          Category Updates (Socket.io)
        </h3>
        <ul className="text-text-muted space-y-1 text-sm">
          <li>
            <span className="text-blue-400">•</span> New complaint **CMP-025**
            created in IT Support.
          </li>
          <li>
            <span className="text-green-400">•</span> Solver Priya Singh
            confirmed assignment for CMP-007.
          </li>
        </ul>
        <p className="mt-2 text-xs italic text-red-400">
          Restriction: Cannot change user roles or create new Sub-Admin/Solver
          accounts.
        </p>
      </section>
    </div>
  );
};

export default SubAdminDashboard;
