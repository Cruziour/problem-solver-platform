import React from 'react';
import { Briefcase, Clock, CheckCircle, ListPlus } from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import QuickActions from '../components/common/QuickActions';
import AssignedComplaintsTable from '../components/common/AssignedComplaintsTable';

// Dummy Data
const solverStats = [
  {
    title: 'Assigned Complaints',
    value: 12,
    icon: Briefcase,
    trend: { value: '3 pending', type: 'negative' },
  },
  {
    title: 'Resolved Complaints (MTD)',
    value: 8,
    icon: CheckCircle,
    trend: { value: '20% better', type: 'positive' },
  },
  { title: 'Average Resolution Time', value: '4.5 hrs', icon: Clock },
];

const quickActions = [
  {
    name: 'Update Complaint Status',
    icon: CheckCircle,
    handler: () => alert('Opening Status Update Modal'),
  },
  {
    name: 'Add Resolution Notes',
    icon: ListPlus,
    handler: () => alert('Opening Resolution Notes Form'),
  },
];

const dummyAssignedComplaints = [
  {
    id: 'CMP-001',
    user: 'Amit Sharma',
    category: 'Technical',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'CMP-004',
    user: 'Sunita Verma',
    category: 'Facilities',
    priority: 'Medium',
    status: 'Open',
  },
  {
    id: 'CMP-007',
    user: 'Ravi Kumar',
    category: 'IT Support',
    priority: 'Urgent',
    status: 'In Progress',
  },
  {
    id: 'CMP-010',
    user: 'Pooja Devi',
    category: 'HR',
    priority: 'Low',
    status: 'Open',
  },
];

const SolverDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-text-white border-b border-default pb-3">
        Solver Portal (Assigned Tickets)
      </h1>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {solverStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* ⚡ QUICK ACTIONS */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-primary-blue" /> Complaint
          Management
        </h2>
        <QuickActions actions={quickActions} />
      </section>

      {/* 📋 TABLE: Assigned Complaints Table */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-primary-blue" /> My Assigned
          Complaints
        </h2>
        <AssignedComplaintsTable data={dummyAssignedComplaints} />
      </section>

      {/* 🔔 REAL-TIME SECTION */}
      <section className="p-4 bg-surface rounded-xl border border-default">
        <h3 className="text-lg font-semibold text-primary-blue mb-2">
          Real-Time Notifications
        </h3>
        <ul className="text-text-muted space-y-1 text-sm">
          <li>
            <span className="text-red-400">•</span> You have a **New
            Assignment**: CMP-010 (Pooja Devi).
          </li>
          <li>
            <span className="text-green-400">•</span> Complaint CMP-007 status
            synced to **In Progress**.
          </li>
        </ul>
        <p className="mt-2 text-xs italic text-text-muted">
          Restriction: Cannot assign complaints, change roles, or export data.
        </p>
      </section>
    </div>
  );
};

export default SolverDashboard;
