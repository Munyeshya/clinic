"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface DepartmentData {
  department: string;
  count: number;
}

interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  "#4D96FF", // bright blue
  "#1E3A8A", // dark navy blue
  "#60A5FA", // sky blue
  "#CBD5E1", // light gray-blue
  "#E2E8F0", // soft white-gray
  "#F8FAFC"  // almost white
];


const DepartmentChart = () => {
  const [departmentData, setDepartmentData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/department-stats');
        if (!response.ok) throw new Error('Failed to fetch department data');
        const data = await response.json();
        
        // Transform data to match chart format
        const transformedData = data.map((item: DepartmentData) => ({
          name: item.department,
          value: item.count
        }));
        
        setDepartmentData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load department data');
        // Fallback to static data if backend is not available
        setDepartmentData([
          { name: "Orthodontics", value: 25 },
          { name: "Prosthodontics", value: 15 },
          { name: "Restorative", value: 30 },
          { name: "Conservative", value: 20 },
          { name: "Periodontology", value: 10 },
          { name: "Oral maxillofacial surgery", value: 5 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#4c4c4c] mx-2 md:mx-0">
        <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
          Department Distribution
        </h2>
        <div className="h-64 md:h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error && departmentData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 shadow rounded-xl hover:shadow-md transition overflow-hidden">
        <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
          Department Distribution
        </h2>
        <div className="h-64 md:h-80 flex items-center justify-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow rounded-xl hover:shadow-md transition overflow-hidden">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-500 text-center md:text-left p-4">
        Department Distribution
      </h2>
      {error && (
        <div className="mb-4 p-2 bg-yellow-900/20 border border-yellow-500 rounded text-yellow-400 text-sm">
          Using fallback data: {error}
        </div>
      )}
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius="80%"
              fill="#8884d8"
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4b5563",
                borderRadius: 8,
                padding: 8,
                fontSize: 12,
              }}
              itemStyle={{ color: "#e5e7eb" }}
              formatter={(value: number, name: string) => [value, name]}
            />
            
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentChart;
