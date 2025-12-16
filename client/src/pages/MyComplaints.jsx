import React from 'react';
import { FileText, ListFilter, Search } from 'lucide-react';
import ComplaintsTable from '../components/common/ComplaintsTable';

// Dummy Data (Same as used in UserDashboard for consistency)
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
  {
    id: 'CMP-005',
    title: 'Slow Printer Speed',
    category: 'IT Support',
    status: 'Resolved',
    createdDate: '2025-11-15',
    assignedSolver: 'Priya Singh',
  },
  {
    id: 'CMP-006',
    title: 'New Employee Onboarding Delay',
    category: 'HR',
    status: 'Open',
    createdDate: '2025-12-15',
    assignedSolver: null,
  },
  // Add more complaints to show full table view
];

const MyComplaints = () => {
  // In a real application, fetch complaints data using Redux/Thunks here

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-text-white border-b border-default pb-3 flex items-center">
        <FileText className="w-7 h-7 mr-3 text-primary-blue" /> My Complaints
        History
      </h1>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by Title or ID..."
            className="w-full bg-surface border border-default rounded-lg py-2 pl-10 pr-4 text-text-white focus:ring-primary-blue focus:border-primary-blue transition duration-150"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            className="w-full md:w-48 bg-surface border border-default rounded-lg py-2 pl-3 pr-10 text-text-white appearance-none focus:ring-primary-blue focus:border-primary-blue transition duration-150"
            defaultValue="all"
          >
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <ListFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
        </div>
      </div>

      {/* Complaints Table */}
      <section>
        <ComplaintsTable data={dummyComplaints} />
      </section>

      {/* Pagination Placeholder */}
      <div className="flex justify-between items-center text-text-muted text-sm pt-4">
        <span>
          Showing 1 to {dummyComplaints.length} of {dummyComplaints.length}{' '}
          results
        </span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-surface rounded-lg border border-default hover:bg-[#1f2937] text-primary-blue"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 bg-primary-blue rounded-lg text-white">
            1
          </button>
          <button
            className="px-3 py-1 bg-surface rounded-lg border border-default hover:bg-[#1f2937] text-primary-blue"
            disabled
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
