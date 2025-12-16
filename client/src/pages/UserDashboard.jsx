import React from 'react';
import { FileText, CheckCircle, PlusCircle, List, Send } from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import QuickActions from '../components/common/QuickActions';
import ComplaintsTable from '../components/common/UsersListTable'; // This will contain the table structure

// Dummy Data
const userStats = [
  {
    title: 'Open Complaints',
    value: 5,
    icon: FileText,
    trend: { value: '2 new', type: 'positive' },
  },
  {
    title: 'Resolved Complaints',
    value: 18,
    icon: CheckCircle,
    trend: { value: '10% more', type: 'positive' },
  },
];

const quickActions = [
  {
    name: 'Create New Complaint',
    icon: PlusCircle,
    handler: () => alert('Navigating to New Complaint Form'),
  },
  {
    name: 'View My Complaints',
    icon: List,
    handler: () => alert('Navigating to My Complaints List'),
  },
  {
    name: 'Send Message',
    icon: Send,
    handler: () => alert('Opening Solver Chat'),
  },
];

const dummyComplaints = [
  {
    id: 'CMP-001',
    title: 'Wifi Connectivity Issue',
    category: 'Technical',
    status: 'In Progress',
    createdDate: '2025-12-01',
    assignedSolver: 'Rahul Sharma',
  },
  {
    id: 'CMP-002',
    title: 'Office Heating broken',
    category: 'Facilities',
    status: 'Open',
    createdDate: '2025-12-05',
    assignedSolver: null,
  },
  {
    id: 'CMP-003',
    title: 'Software License Expired',
    category: 'IT Support',
    status: 'Resolved',
    createdDate: '2025-11-20',
    assignedSolver: 'Priya Singh',
  },
  {
    id: 'CMP-004',
    title: 'Desk Chair Squeaks',
    category: 'Facilities',
    status: 'In Progress',
    createdDate: '2025-12-10',
    assignedSolver: 'Rahul Sharma',
  },
];

const UserDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-text-white border-b border-default pb-3">
        Welcome Back, User!
      </h1>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* ⚡ QUICK ACTIONS */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <PlusCircle className="w-5 h-5 mr-2 text-primary-blue" /> Quick
          Actions
        </h2>
        <QuickActions actions={quickActions} />
      </section>

      {/* 📋 TABLE: My Complaints Table */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-primary-blue" /> My Recent
          Complaints
        </h2>
        <ComplaintsTable data={dummyComplaints} />
      </section>

      {/* 🔔 REAL-TIME SECTION */}
      <section className="p-4 bg-surface rounded-xl border border-default">
        <h3 className="text-lg font-semibold text-primary-blue mb-2">
          Real-Time Notifications (Socket.io)
        </h3>
        <ul className="text-text-muted space-y-1 text-sm">
          <li>
            <span className="text-green-400">•</span> Complaint CMP-003 has been
            **Resolved**!
          </li>
          <li>
            <span className="text-yellow-400">•</span> Solver Rahul Sharma sent
            you a message regarding CMP-001.
          </li>
          <li>
            <span className="text-blue-400">•</span> Your complaint CMP-002 is
            now **In Progress**.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UserDashboard;
