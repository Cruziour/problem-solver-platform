import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  LifeBuoy,
  Users,
  Settings,
  LogOut,
  FileText,
  Lock,
} from 'lucide-react';
import { useSelector } from 'react-redux';

// DUMMY CONFIG - Replace with actual role-based config loaded from Redux
const navConfig = {
  USER: [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Complaints', path: '/myComplaints', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User },
  ],
  SOLVER: [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Assigned Tickets', path: '/assigned', icon: LifeBuoy },
    { name: 'Profile', path: '/profile', icon: User },
  ],
  SUB_ADMIN: [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Category Management', path: '/category-manage', icon: Users },
    { name: 'Export Data', path: '/export', icon: FileText },
  ],
  ADMIN: [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Manage Users', path: '/manage-users', icon: Users },
    { name: 'System Settings', path: '/settings', icon: Settings },
    { name: 'Profile', path: '/profile', icon: User },
  ],
};

const Sidebar = ({ handleLogout }) => {
  const { user } = useSelector((state) => state.auth);
  const currentNavItems = navConfig[user?.role] || navConfig.USER;

  const commonItems = [
    { name: 'Change Password', path: '/change-password', icon: Lock },
    {
      name: 'Logout',
      icon: LogOut,
      action: () => handleLogout(),
    },
  ];

  const LinkItem = ({ item }) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-primary-blue text-white shadow-lg'
            : 'text-text-muted hover:bg-surface'
        }`
      }
      onClick={item.action}
      end // Ensure only exact path matches
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span className="text-sm font-medium">{item.name}</span>
    </NavLink>
  );

  return (
    <div className="w-64 bg-surface flex flex-col border-r border-default">
      {/* Logo/Title */}
      <div className="p-6 border-b border-default">
        <h1 className="text-2xl font-bold text-primary-blue">
          Problem Solver<span className="text-white"> Platform</span>
        </h1>
        <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
          {user.role}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {currentNavItems.map((item) => (
          <LinkItem key={item.name} item={item} />
        ))}

        <div className="pt-4 mt-4 border-t border-default">
          {commonItems.map((item) => (
            <LinkItem key={item.name} item={item} />
          ))}
        </div>
      </nav>

      {/* Footer / Real-Time Status Indicator */}
      <div className="p-4 border-t border-default text-xs text-text-muted">
        <span className="flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Real-time Connected
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
