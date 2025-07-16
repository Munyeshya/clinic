"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Calendar, House, Info, Settings, LucideIcon, Menu, Users } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  House,
  Calendar,
  Settings,
  Bell,
  Info,
  Users,
};

interface SidebarItem {
  name: string;
  href: string;
  icon: keyof typeof ICONS;
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems));
  }, []);

  return (
    <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}>
      <div className="h-full bg-white border-r border-gray-200 p-4 flex flex-col">
        <button onClick={() => { setIsSidebarOpen(!isSidebarOpen) }} className="p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600">
          <Menu />
        </button>
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors cursor-pointer
                    ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
                >
                  <IconComponent size={20} className={isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"} />
                  {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
