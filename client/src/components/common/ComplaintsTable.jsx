import React from 'react';
import { ExternalLink } from 'lucide-react';

const ComplaintsTable = ({ data }) => {
  // Function to get Tailwind color class for status
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

  return (
    <div className="overflow-x-auto bg-surface rounded-xl shadow-lg border border-default">
      <table className="min-w-full divide-y divide-default">
        <thead className="bg-surface/50">
          <tr>
            {[
              'Complaint ID',
              'Title',
              'Category',
              'Status',
              'Created Date',
              'Assigned Solver',
              'Action',
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
                {complaint.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {complaint.category}
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {complaint.createdDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-white">
                {complaint.assignedSolver || (
                  <span className="text-red-400">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => alert(`Viewing details for ${complaint.id}`)}
                  className="text-primary-blue hover:text-secondary-blue transition-colors duration-150 p-1 rounded-full hover:bg-primary-blue/10"
                  title="View Details"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
