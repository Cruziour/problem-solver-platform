import React from 'react';

const QuickActions = ({ actions }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.handler}
          className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl shadow-lg border border-default 
                     text-text-white hover:bg-primary-blue/20 hover:text-primary-blue transition-colors duration-200"
        >
          <action.icon className="w-6 h-6 mb-2" />
          <span className="text-sm font-semibold text-center">
            {action.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
