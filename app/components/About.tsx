'use client';

import React from 'react';
import Image from 'next/image';
import logo from '@/public/images/logo.png';

const About = () => {
  return (
    <section id="intro" className="bg-white py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center justify-between px-4 md:px-8">
        {/* Text Content */}
        <div className="flex-1">
          <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            Who We Are
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Discover Our <span className="text-blue-600">Mission</span>
          </h2>
          
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <div>
              <h5 className="text-lg font-semibold border-b-2 border-blue-500 pb-1 mb-2">Mission</h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                Specializes in correcting misaligned teeth and jaws using braces, aligners, and other devices to improve bite, appearance, and oral health.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h5 className="text-lg font-semibold border-b-2 border-blue-500 pb-1 mb-2">Vision</h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                Specializes in correcting misaligned teeth and jaws using braces, aligners, and other devices to improve bite, appearance, and oral health.
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <div className="rounded-2xl overflow-hidden bg-white p-4">
            <Image
              src={logo}
              alt="Royal Dental Logo"
              className="w-full max-w-sm mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
