"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Search, Filter } from 'lucide-react';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  disease_description:string;
}

const PatientTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);


  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    disease_description:''
  });

  // Fetch patients from backend
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/appointments');
      if (!response.ok) throw new Error('Failed to fetch patients');
      const data = await response.json();
      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on search term
  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)||
      patient.disease_description.includes(searchTerm)
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);


  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-2">Patient Records</h2>
          <p className="text-gray-400">Manage your patient information</p>
        </div>
        
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Disease</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredPatients.map((patient) => (
              <motion.tr
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-[#ffffff] hover:bg-blue-100 transition-colors"
              >
                <td className="py-3 px-4">
                  <div>
                    <div className="text-gray-500 font-medium">
                      {patient.first_name} {patient.last_name}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-500">{patient.email}</td>
                <td className="py-3 px-4 text-gray-500">{patient.phone}</td>
                 <td className="py-3 px-4 text-gray-500">{patient.disease_description}</td>
             
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {filteredPatients.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            {searchTerm ? 'No patients found matching your search.' : 'No patients found.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTable;