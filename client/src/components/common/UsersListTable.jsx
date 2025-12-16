import React from 'react';
import { Repeat2, Trash2 } from 'lucide-react';

const UsersListTable = ({ data }) => {
  // Function to get color for Role
  const getRoleClass = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'text-white bg-red-600/90';
      case 'SUB_ADMIN':
        return 'text-purple-400 bg-purple-400/20';
      case 'SOLVER':
        return 'text-blue-400 bg-blue-400/20';
      case 'USER':
        return 'text-green-400 bg-green-400/20';
      default:
        return 'text-text-muted';
    }
  };

  const handleChangeRole = (user) => {
    alert(
      `Opening role selection modal for ${user.name} (Current Role: ${user.role})`,
    );
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      alert(`Deleting ${user.name}...`);
    }
  };

  return (
    <div className="overflow-x-auto bg-surface rounded-xl shadow-lg border border-default">
      <table className="min-w-full divide-y divide-default">
        <thead className="bg-surface/50">
          <tr>
            {['User ID', 'Name', 'Email', 'Role', 'Last Login', 'Action'].map(
              (header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-default">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-[#1f2937]">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-blue">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-white">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getRoleClass(
                    user.role,
                  )}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {user.lastLogin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => handleChangeRole(user)}
                  className="text-primary-blue hover:text-secondary-blue transition-colors duration-150 p-2 rounded-full hover:bg-primary-blue/10"
                  title="Change Role"
                >
                  <Repeat2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="text-red-500 hover:text-red-400 transition-colors duration-150 p-2 rounded-full hover:bg-red-500/10"
                  title="Delete User"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersListTable;
