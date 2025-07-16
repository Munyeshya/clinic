"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AppointmentData {
  month: number;
  appointments: number;
}

interface ChartData {
  name: string;
  appointments: number;
}

const AppointmentOverviewChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/monthly-appointments');
        if (!response.ok) throw new Error('Failed to fetch appointment data');
        const appointmentData = await response.json();
        
       
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        const transformedData = appointmentData.map((item: AppointmentData) => ({
          name: monthNames[item.month - 1] || `Month ${item.month}`,
          appointments: item.appointments
        }));
        
        setData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load appointment data');
        // Fallback to static data if backend is not available
        setData([
          { name: 'Jan', appointments: 45 },
          { name: 'Feb', appointments: 52 },
          { name: 'Mar', appointments: 38 },
          { name: 'Apr', appointments: 61 },
          { name: 'May', appointments: 55 },
          { name: 'Jun', appointments: 67 },
          { name: 'Jul', appointments: 42 },
          { name: 'Aug', appointments: 58 },
          { name: 'Sep', appointments: 63 },
          { name: 'Oct', appointments: 71 },
          { name: 'Nov', appointments: 49 },
          { name: 'Dec', appointments: 55 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 shadow rounded-xl hover:shadow-md transition overflow-hidden">
        <h2 className="text-base md:text-lg font-medium mb-4 text-gray-500 text-center md:text-left">Monthly Appointments</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 shadow rounded-xl hover:shadow-md transition overflow-hidden">
        <h2 className="text-gray-500 text-lg font-medium mb-4">Monthly Appointments</h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow rounded-xl hover:shadow-md transition overflow-hidden">
        <h2 className="text-gray-500 text-lg font-medium mb-4 p-4">Monthly Appointments</h2>
      {error && (
        <div className="mb-4 p-2 bg-yellow-900/20 border border-yellow-500 rounded text-yellow-400 text-sm">
          Using fallback data: {error}
        </div>
      )}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis dataKey="name" stroke="#aaa" fontSize={12} />
            <YAxis stroke="#aaa" fontSize={12} width={30} />
            <Tooltip
              contentStyle={{ background: "#1f2937", borderColor: "#4b5563", fontSize: 12 }}
              itemStyle={{ color: "#e5e7eb" }}
              formatter={(value: number) => [`${value} appointments`, 'Appointments']}
            />
            <Line 
              type="monotone" 
              dataKey="appointments" 
              stroke="blue" 
              strokeWidth={2} 
              dot={{ r: 3, fill: "#9c27b0" }}
              activeDot={{ r: 5, stroke: "#9c27b0", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AppointmentOverviewChart;
