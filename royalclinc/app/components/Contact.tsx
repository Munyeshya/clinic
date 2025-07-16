"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Twitter, Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react"

const contactItems = [
  { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+250 777 888 999" },
  { icon: <Twitter className="w-5 h-5" />, label: "Twitter", value: "@_vicen" },
  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "dentalclin@gmail.com" },
  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Kigali, Rwanda" },
]

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="w-full flex justify-between items-center text-left py-6 text-gray-900 font-medium hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && <div className="pb-6 text-gray-600 leading-relaxed">{children}</div>}
    </div>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            Contact Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Feel free to reach out with any questions or to schedule your appointment today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact Info */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h3>
            <div className="space-y-6">
              {contactItems.map(({ icon, label, value }, i) => (
                <div key={i} className="flex items-center group">
                  <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl mr-6 group-hover:bg-blue-100 transition-colors border border-blue-100">
                    {icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">{label}</div>
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blue accent line */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Available for consultations
              </div>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Additional <span className="text-blue-600">Information</span>
            </h3>

            <AccordionItem title="Opening Hours" defaultOpen>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-blue-700">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span>Saturday</span>
                  <span className="font-semibold text-blue-700">8:00 AM - 7:00 PM</span>
                </div>
               
              </div>
            </AccordionItem>

            <AccordionItem title="Our Location">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-700 font-medium">
                    Kicukiro, Kagarama
                    <br />
                    Kigali, Rwanda
                  </p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 hover:bg-blue-100"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Google Maps
                </a>
                <div className="mt-6">  

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.439302153581!2d30.100852575038022!3d-1.9787071980033892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7f1309af419%3A0xd636113764d5e598!2sGOODRICH%20TV!5e0!3m2!1sen!2srw!4v1751637359501!5m2!1sen!2srw"
                    loading="lazy"
                    title="Google Map"
                    allowFullScreen
                    className="w-full h-48 rounded-2xl border-2 border-blue-100"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </AccordionItem>
          </div>
        </div>

   
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-3xl border border-blue-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">Contact us today to schedule your appointment or ask any questions.</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              <a href="/#contact">View Contacts</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
