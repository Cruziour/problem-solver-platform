import React from 'react';
import { RefreshCw, Edit } from 'lucide-react';

const AssignedComplaintsTable = ({ data }) => {
  // Function to get color for Status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-500/20 text-red-400';
      case 'In Progress':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Resolved':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Function to get color for Priority
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'text-white bg-red-600';
      case 'High':
        return 'text-red-400 bg-red-400/20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Low':
        return 'text-green-400 bg-green-400/20';
      default:
        return 'text-text-muted';
    }
  };

  const handleUpdateStatus = (id) => {
    alert(`Opening modal to update status for ${id}`);
  };

  return (
    <div className="overflow-x-auto bg-surface rounded-xl shadow-lg border border-default">
      <table className="min-w-full divide-y divide-default">
        <thead className="bg-surface/50">
          <tr>
            {[
              'Complaint ID',
              'User Name',
              'Category',
              'Priority',
              'Status',
              'Action (Update Status)',
            ].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-default">
          {data.map((complaint) => (
            <tr key={complaint.id} className="hover:bg-[#1f2937]">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-blue">
                {complaint.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-white">
                {complaint.user}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {complaint.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 inline-flex text-xs leading-5 font-semibold rounded ${getPriorityClass(
                    complaint.priority,
                  )}`}
                >
                  {complaint.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                    complaint.status,
                  )}`}
                >
                  {complaint.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleUpdateStatus(complaint.id)}
                  className="text-yellow-400 hover:text-yellow-500 transition-colors duration-150 p-1 rounded-full hover:bg-yellow-400/10 flex items-center"
                  title="Update Status"
                >
                  <RefreshCw className="w-5 h-5 mr-1" />
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedComplaintsTable;
