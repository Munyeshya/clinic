'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [showAddModal, setShowAddModal] = useState(false);
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('http://localhost:5000/add_appointment', {
        method: 'POST',
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
      if (!response.ok) throw new Error('Failed to book appointment');
      setSuccess('Appointment booked successfully!');
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
      setTimeout(() => setShowAddModal(false), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-blue-500 font-bold text-xl">Royal Dental</h1>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none px-6 lg:px-0 py-4 lg:py-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col lg:flex-row gap-4">
            {[
              { href: '/', label: 'Home' },
              { href: '/#intro', label: 'About Us' },
              { href: '/#deps', label: 'Departments' },
              { href: '/#team', label: 'Team' },
              { href: '/#contact', label: 'Contacts' },
              { href: '/login', label: 'Dashboard' },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="text-black font-medium hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Appointment Button */}
          <div className="mt-4 lg:mt-0 lg:ml-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => setShowAddModal(true)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 border border-blue-200 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
              Book an Appointment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="col-span-1 px-3 py-2 bg-white border border-blue-300 rounded-lg text-black text-black focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="col-span-1 px-3 py-2 bg-white border border-blue-300 rounded-lg text-black text-black focus:outline-none"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-black text-black focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-black text-black focus:outline-none"
                required
              />
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-black focus:outline-none"
                required
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-black focus:outline-none"
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
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-black text-black focus:outline-none h-20 resize-none"
              />
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              {success && <div className="text-green-600 text-sm text-center">{success}</div>}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
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
                    setError(null);
                    setSuccess(null);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-blue-800 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
