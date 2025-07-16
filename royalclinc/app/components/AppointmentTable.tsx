"use client";

import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Appointment {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  department: string;
  disease_description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    department: '',
    diseaseDescription: '',
    status: 'pending'
  });

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filter appointments based on search term
  useEffect(() => {
    const filtered = appointments.filter(appointment =>
      appointment.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingAppointment 
        ? `http://localhost:5000/update-appointment/${editingAppointment.id}`
        : 'http://localhost:5000/add_appointment';
      const method = editingAppointment ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fname: formData.firstName,
          lname: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date: formData.preferredDate,
          department: formData.department,
          message: formData.diseaseDescription,
          status: formData.status
        })
      });
      if (!response.ok) throw new Error('Failed to save appointment');
      await fetchAppointments();
      setShowAddModal(false);
      setEditingAppointment(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        department: '',
        diseaseDescription: '',
        status: 'pending'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };


  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600';
      case 'pending': return 'text-gray-500';
      case 'completed': return 'text-blue-900';
      case 'cancelled': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const updateStatus = async (id: number, status: 'completed' | 'cancelled') => {
    try {
      const response = await fetch(`http://localhost:5000/update-appointment-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update status');
      }
      await fetchAppointments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating status');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-100 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-blue-50 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-2">Appointments</h2>
          <p className="text-gray-400">Manage your appointments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Appointment
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-blue-50 border border-gray-200 rounded-lg text-blue-700 placeholder-blue-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Contacts</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Department</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Status</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  {appointment.first_name} {appointment.last_name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-blue-900">{appointment.email}</div>
                  <div className="text-gray-500 text-xs">{appointment.phone}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(appointment.preferred_date).toISOString().split('T')[0]}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{appointment.department}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-semibold flex items-center gap-2 ${getStatusColor(appointment.status)}`}>{getStatusIcon(appointment.status)}{appointment.status}</td>
                <td className="px-4 py-3 whitespace-nowrap flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await updateStatus(appointment.id, 'completed');
                      } catch {}
                    }}
                    className="border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                    disabled={appointment.status !== 'pending'}
                  >
                    Completed
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await updateStatus(appointment.id, 'cancelled');
                      } catch {}
                    }}
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                    disabled={appointment.status !== 'pending'}
                  >
                    Cancelled
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Add/Edit Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#ffffff] rounded-xl p-6 w-full max-w-md mx-4 border border-[#2f2f2f]"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="First Name"
      value={formData.firstName}
      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      className="col-span-1 px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <input
      type="text"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      className="col-span-1 px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <input
    type="email"
    placeholder="Email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    type="tel"
    placeholder="Phone"
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    type="date"
    value={formData.preferredDate}
    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
    className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <select
    value={formData.department}
    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
    className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select Department</option>
    <option value="Orthodontics">Orthodontics</option>
    <option value="Prosthodontics">Prosthodontics</option>
    <option value="Restorative">Restorative</option>
    <option value="Conservative">Conservative</option>
    <option value="Periodontology">Periodontology</option>
    <option value="Oral maxillofacial surgery">Oral maxillofacial surgery</option>
  </select>

  <textarea
    placeholder="Medical History / Disease Description"
    value={formData.diseaseDescription}
    onChange={(e) => setFormData({ ...formData, diseaseDescription: e.target.value })}
    className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
  />

  <div className="flex gap-3 pt-4">
    <button
      type="submit"
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
    >
      {editingAppointment ? 'Update' : 'Add'} Appointment
    </button>
    <button
      type="button"
      onClick={() => {
        setShowAddModal(false);
        setEditingAppointment(null);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredDate: '',
          department: '',
          diseaseDescription: '',
          status: 'pending',
        });
      }}
      className="flex-1 bg-gray-300 hover:bg-gray-400 text-blue-800 py-2 rounded-lg transition-colors"
    >
      Cancel
    </button>
  </div>
</form>

              </motion.div>
            </div>
          )}
    </div>
  );
};

export default AppointmentTable; 