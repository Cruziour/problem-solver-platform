import React from 'react';
import { UserPlus, Edit } from 'lucide-react';

const CategoryComplaintsTable = ({ data }) => {
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

  const handleAction = (complaint) => {
    if (!complaint.assignedSolver) {
      alert(`Assigning Solver for ${complaint.id}`);
    } else {
      alert(`Updating status for ${complaint.id}`);
    }
  };

  return (
    <div className="overflow-x-auto bg-surface rounded-xl shadow-lg border border-default">
      <table className="min-w-full divide-y divide-default">
        <thead className="bg-surface/50">
          <tr>
            {[
              'Complaint ID',
              'User',
              'Category',
              'Assigned Solver',
              'Status',
              'Action (Assign / Update)',
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
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {complaint.assignedSolver || (
                  <span className="text-red-400 font-medium">Unassigned</span>
                )}
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
                  onClick={() => handleAction(complaint)}
                  className={`p-2 rounded-full transition-colors duration-150 flex items-center ${
                    complaint.assignedSolver
                      ? 'text-yellow-400 hover:bg-yellow-400/10'
                      : 'text-primary-blue hover:bg-primary-blue/10'
                  }`}
                  title={
                    complaint.assignedSolver ? 'Update Status' : 'Assign Solver'
                  }
                >
                  {complaint.assignedSolver ? (
                    <Edit className="w-5 h-5 mr-1" />
                  ) : (
                    <UserPlus className="w-5 h-5 mr-1" />
                  )}
                  {complaint.assignedSolver ? 'Update' : 'Assign'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryComplaintsTable;
