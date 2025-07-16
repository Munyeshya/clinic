'use client';

import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-blue-900 to-blue-700 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Clinic Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Royal Dental Clinic</h3>
          <p className="text-sm text-blue-100">
            Feel free to reach out with any questions or to schedule your appointment today!
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-300 transition">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-300 transition">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-300 transition">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><a href="#intro" className="hover:text-white">About Us</a></li>
            <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li className="flex items-center gap-2"><Phone size={16} /> +250 777 888 999</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +250 777 111 999</li>
            <li className="flex items-center gap-2"><Mail size={16} /> dentalclin@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Kigali, Rwanda</li>
          </ul>
        </div>

        {/* Subscription */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Subscribe for Updates</h3>
          <form className="flex items-center border border-blue-200 rounded-lg overflow-hidden mt-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 text-sm text-blue-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2"
              aria-label="Submit"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-blue-700 pt-4 text-center text-sm text-blue-300">
        <p>&copy; 2024 Royal Dental Clinic. All rights reserved.</p>
        <p className="mt-1">User Terms and Conditions | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
