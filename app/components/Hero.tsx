'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import backgrnd from '@/public/images/bl.png';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
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
    <section id="hero" className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 h-[500px] md:h-[600px]">
        {/* Left green section */}
        <div className="md:col-span-2 bg-blue-900 hidden md:block"></div>

        {/* Right image section */}
        <div className="md:col-span-3 relative w-full h-full">
          <Image
            src={backgrnd}
            alt="Dental clinic"
            layout="fill"
            objectFit="cover"
            className="rounded-none"
            priority
          />
        </div>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center bg-black/50 px-6 md:px-16">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-blue-400">Brighten</span> Your Smile,<br />
            Enhance Your <span className="text-blue-400">Life.</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            We blend advanced dental care with a gentle touch—helping you smile brighter, feel better, and live confidently every day.
          </p>
          <button
            className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition"
            onClick={() => setShowAddModal(true)}
          >
            Request an Appointment Today
          </button>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 border border-blue-200 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
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
    </section>
  );
};

export default Hero;
