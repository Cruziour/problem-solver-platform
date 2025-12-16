import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-4 md:p-8 flex-1">
          <div className="mx-auto max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
