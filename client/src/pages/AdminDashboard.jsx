import React from 'react';
import {
  Shield,
  Users,
  LifeBuoy,
  Zap,
  Settings,
  FileText,
  UserPlus,
} from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import QuickActions from '../components/common/QuickActions';
import UsersListTable from '../components/common/UsersListTable';

// Dummy Data
const adminStats = [
  {
    title: 'Total Complaints',
    value: 150,
    icon: FileText,
    trend: { value: '5% increase', type: 'negative' },
  },
  { title: 'Total Users', value: 250, icon: Users },
  { title: 'Total Solvers', value: 15, icon: LifeBuoy },
  { title: 'Total Sub-Admins', value: 5, icon: Shield },
];

const quickActions = [
  {
    name: 'Manage Users',
    icon: Users,
    handler: () => alert('Navigating to User Management'),
  },
  {
    name: 'Assign Roles',
    icon: UserPlus,
    handler: () => alert('Opening Role Assignment Modal'),
  },
  {
    name: 'Export All Data',
    icon: FileText,
    handler: () => alert('Initiating System-wide Data Export'),
  },
  {
    name: 'System Settings',
    icon: Settings,
    handler: () => alert('Opening System Configuration'),
  },
];

const dummyUsersList = [
  {
    id: 'U-001',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
    lastLogin: '2025-12-15',
  },
  {
    id: 'U-002',
    name: 'Priya Singh',
    email: 'priya@solver.com',
    role: 'SOLVER',
    lastLogin: '2025-12-16',
  },
  {
    id: 'U-003',
    name: 'Amit Sharma',
    email: 'amit@user.com',
    role: 'USER',
    lastLogin: '2025-12-16',
  },
  {
    id: 'U-004',
    name: 'Ravi Kumar',
    email: 'ravi@subadmin.com',
    role: 'SUB_ADMIN',
    lastLogin: '2025-12-16',
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-text-white border-b border-default pb-3">
        👑 Super Admin Control Panel
      </h1>

      {/* 📊 STATS CARDS (System Overview) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* ⚡ QUICK ACTIONS */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-primary-blue" /> System
          Controls
        </h2>
        <QuickActions actions={quickActions} />
      </section>

      {/* 📋 TABLE: Users List */}
      <section>
        <h2 className="text-xl font-semibold text-text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-primary-blue" /> Users List (Role
          Management)
        </h2>
        <UsersListTable data={dummyUsersList} />
      </section>

      {/* 🔐 SPECIAL POWERS & AUTOMATION */}
      <section className="p-4 bg-surface rounded-xl border border-default">
        <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center">
          <Zap className="w-5 h-5 mr-2" /> Admin Privileges & Automation
        </h3>
        <ul className="text-text-muted space-y-1 text-sm">
          <li className="text-white font-medium">
            • Change any user role (USER → SOLVER / SUB-ADMIN)
          </li>
          <li className="text-white font-medium">
            • Create multiple sub-admins / solvers
          </li>
          <li>
            <span className="text-green-400">•</span> Automation Rule: Resolved
            complaints are auto-deleted after 30 days.
          </li>
        </ul>
        <div className="mt-4 p-3 bg-red-800/20 text-red-300 rounded-lg text-sm">
          Real-Time Alert: Role change updates and new complaint alerts are
          system-wide.
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
