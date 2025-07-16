"use client"

import type React from "react"
import Image from "next/image"
import valensImg from "@/public/images/valens.jpg"
import tuyishimeImg from "@/public/images/tuyishime.jpg"

interface Doctor {
  id: number
  name: string
  image: any
  description: string
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Muhire Valens",
    image: valensImg,
    description:
      "Dr. MUHRE Valens holds a bachelor's degree in Dental Surgery from University of Rwanda and Under Training in Master's degree in Orthodontics. He has over 7 years of experience in general dentistry in different Hospitals and private clinics in Rwanda, and has orthodontics and Crown Veneer and Bridge fellowship from Kenya.",
  },
  {
    id: 2,
    name: "Dr. Tuyishime Gabby",
    image: tuyishimeImg,
    description: "Sample paragraph about Dr. Tuyishime Gabby...",
  },
]

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            Our Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Meet Your <span className="text-blue-600">Doctors</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Our experienced and compassionate team is dedicated to providing you with the best dental care in a warm,
            welcoming environment.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="group">
                {/* Main Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative mx-auto mb-6 w-48 h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        fill
                      />
                    </div>
                    {/* Blue ring on hover */}
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"></div>
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {doctor.name}
                    </h3>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mb-4 rounded-full"></div>
                    <p className="text-gray-600 leading-relaxed line-clamp-4 group-hover:text-gray-700 transition-colors duration-300">
                      {doctor.description}
                    </p>
                  </div>

                  {/* Hover overlay for mobile/additional info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-600/95 to-blue-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl flex flex-col justify-center items-center text-white p-8 backdrop-blur-sm lg:hidden">
                    <h3 className="text-2xl font-bold mb-4">{doctor.name}</h3>
                    <p className="text-center text-sm leading-relaxed">{doctor.description}</p>
                  </div>
                </div>

                {/* Professional Badge */}
                <div className="flex justify-center mt-4">
                  <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium border border-blue-100 group-hover:bg-blue-100 transition-colors duration-300">
                    Dental Specialist
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Team
