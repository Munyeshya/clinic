'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import ortho from '@/public/images/ortho.jpg';
import pro from '@/public/images/pro.jpeg';
import res from '@/public/images/res.jpeg';
import per from '@/public/images/per.jpg';
import cons from '@/public/images/cons.jpg';
import oral from '@/public/images/oral.jpg';

interface Department {
  id: number;
  title: string;
  image: any;
  description: string;
}

const departments: Department[] = [
  {
    id: 1,
    title: 'Orthodontics',
    image: ortho,
    description:
      'Specializes in correcting misaligned teeth and jaws using braces, aligners, and other devices to improve bite, appearance, and oral health.',
  },
  {
    id: 2,
    title: 'Prosthodontics',
    image: pro,
    description:
      'Specialize in replacing teeth with dental appliances, such as crowns or veneers, as well as fixing tooth structure problems with surgery or other methods.',
  },
  {
    id: 3,
    title: 'Restorative',
    image: res,
    description:
      'Restorative dental treatment focuses on repairing or replacing damaged or missing teeth to restore their function, shape, and appearance.',
  },
  {
    id: 4,
    title: 'Periodontology',
    image: per,
    description:
      'Specializes in the prevention, diagnosis, and treatment of gum diseases and conditions affecting the structures supporting the teeth, including the gums and bone.',
  },
  {
    id: 5,
    title: 'Conservative',
    image: cons,
    description:
      'Focuses on preserving natural teeth by treating cavities, fractures, and minor damage using fillings, inlays, and other restorative techniques.',
  },
  {
    id: 6,
    title: 'Oral maxillofacial surgery',
    image: oral,
    description:
      'Surgical treatment of conditions affecting the mouth, jaw, face, and neck — including tooth extractions, jaw corrections, and facial injury repair.',
  },
];

const Departments: React.FC = () => {
  return (
    <section id="deps" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            What We Do
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Our <span className="text-blue-600">Departments</span>
          </h2>
          
        </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-4">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-blue-50 rounded-2xl shadow-sm border border-gray-200 min-w-[280px] md:min-w-0 flex-shrink-0 hover:shadow-lg transition-all flex flex-col h-full"
            >
              <Image
                src={dept.image}
                alt={dept.title}
                className="rounded-t-2xl w-full h-48 object-cover"
                width={400}
                height={200}
              />
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{dept.title}</h3>
                  <p className="text-sm text-gray-600">{dept.description}</p>
                </div>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center text-blue-600 hover:underline text-sm font-medium"
                >
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;
