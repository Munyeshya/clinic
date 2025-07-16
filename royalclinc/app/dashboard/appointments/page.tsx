"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import StatCard from "../../components/StatCard";

import AppointmentTable from "../../components/AppointmentTable";

interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  thisMonthAppointments: number;
  pendingAppointments: number;
}

const PatientPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalAppointments: 0,
    thisMonthAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/dashboard-stats');
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        const data = await response.json();
        
        // Check if data is valid and has the expected structure
        if (data && typeof data === 'object') {
          setStats({
            totalPatients: Number(data.totalPatients) || 0,
            totalAppointments: Number(data.totalAppointments) || 0,
            thisMonthAppointments: Number(data.thisMonthAppointments) || 0,
            pendingAppointments: Number(data.pendingAppointments) || 0
          });
        } else {
          throw new Error('Invalid data structure received');
        }
      } catch (err) {
        console.error('Dashboard stats error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
        // Fallback to static data if backend is not available
        setStats({
          totalPatients: 1437,
          totalAppointments: 2456,
          thisMonthAppointments: 156,
          pendingAppointments: 23
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-blue-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard 
            name="Total Patients" 
            icon={Users} 
            value={(stats?.totalPatients || 0).toLocaleString()} 
            loading={loading}
          />
          <StatCard 
            name="Total Appointments" 
            icon={Calendar} 
            value={(stats?.totalAppointments || 0).toLocaleString()} 
            loading={loading}
          />
          <StatCard 
            name="This Month" 
            icon={Clock} 
            value={(stats?.thisMonthAppointments || 0).toLocaleString()} 
            loading={loading}
          />
          <StatCard 
            name="Pending" 
            icon={CheckCircle} 
            value={(stats?.pendingAppointments || 0).toLocaleString()} 
            loading={loading}
          />
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
            Using fallback data: {error}
          </div>
        )}
        
        <AppointmentTable/>
      </main>
    </div>
  );
};

export default PatientPage;
