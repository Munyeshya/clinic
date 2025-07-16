import { Bell } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-white text-blue-600 px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Royal Dental</h1>
        
        <button className="relative group">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-white group-hover:bg-blue-300 transition"></span>
        </button>
      </div>
    </header>
  )
}

export default Header
