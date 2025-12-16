import React, { useState, useEffect } from 'react';
import socket from '../../utils/socket.js';
import { Bell, LogOut, User } from 'lucide-react';

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const user = { role: 'ADMIN' }; // Dummy: Replace with actual Redux user

  useEffect(() => {
    // Listen for general system-wide notifications (for ADMINs)
    if (user.role === 'ADMIN') {
      socket.on('system-notification', (data) => {
        console.log('System Notification:', data);
        setNotifications((prev) =>
          [
            { id: Date.now(), message: data.message, type: data.type },
            ...prev,
          ].slice(0, 5),
        );
      });
    }

    // Listen for role-specific notifications (e.g., New Assignment for SOLVER)
    socket.on('role-specific-alert', (data) => {
      console.log('Role Alert:', data);
      if (data.role === user.role) {
        setNotifications((prev) =>
          [
            { id: Date.now(), message: data.message, type: 'warning' },
            ...prev,
          ].slice(0, 5),
        );
      }
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('system-notification');
      socket.off('role-specific-alert');
    };
  }, [user.role]);

  return (
    <header className="sticky top-0 bg-surface/95 backdrop-blur-sm z-30 shadow-md border-b border-default p-4 flex justify-end items-center space-x-4">
      {/* Real-time Notifications */}
      <div className="relative">
        <button className="text-text-white hover:text-primary-blue p-2 rounded-full transition duration-150">
          <Bell className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-surface"></span>
          )}
        </button>
        {/* Notification Dropdown (implementation omitted for brevity) */}
      </div>

      {/* Profile & Logout */}
      <button className="flex items-center space-x-2 text-text-white hover:text-primary-blue">
        <User className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          {user.role}
        </span>
      </button>
      <button
        className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-400/10 transition duration-150"
        onClick={() => alert('Logging Out...')}
      >
        <LogOut className="w-5 h-5" />
      </button>
    </header>
  );
};

export default Header;
