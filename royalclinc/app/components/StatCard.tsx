import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ name, value, icon: Icon, loading = false }) => {
  return (
    <div className="bg-white border border-gray-200 shadow rounded-xl hover:shadow-md transition overflow-hidden">
      <div className="px-6 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-500 mb-2">
          <Icon size={20} className="mr-2 text-blue-600" />
          {name}
        </span>
        {loading ? (
          <div className="mt-1 h-8 bg-gray-100 rounded animate-pulse"></div>
        ) : (
          <p className="mt-1 text-3xl font-bold text-blue-700">{value}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
