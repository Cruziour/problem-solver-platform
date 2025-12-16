import React from 'react';
import { ChevronUp } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend = null }) => {
  return (
    <div className="bg-surface p-5 rounded-xl shadow-lg border border-default transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-1">
            {title}
          </p>
          <h2 className="text-3xl font-bold text-text-white">{value}</h2>
        </div>
        {Icon && (
          <div className="p-3 bg-primary-blue/20 rounded-lg text-primary-blue">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend && (
        <div
          className={`mt-3 flex items-center text-xs font-medium ${
            trend.type === 'positive' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          <ChevronUp
            className={`w-4 h-4 mr-1 ${
              trend.type === 'negative' ? 'transform rotate-180' : ''
            }`}
          />
          {trend.value} since last month
        </div>
      )}
    </div>
  );
};

export default StatsCard;
