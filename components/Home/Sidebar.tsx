"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Waves, Award, ShieldCheck, CreditCard, Heart, 
  Calendar, BookOpen, Briefcase, Settings, Menu, X 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { section: 'Profile', items: [
      { name: 'Profile Header', icon: <User size={16} />, href: '/' },
      { name: 'Equipment', icon: <Waves size={16} />, href: '/equipment' },
      { name: 'Certifications', icon: <Award size={16} />, href: '/certifications' },
      { name: 'Insurance', icon: <ShieldCheck size={16} />, href: '/insurance' },
      { name: 'Payment Methods', icon: <CreditCard size={16} />, href: '/payments' },
      { name: 'Personal Data', icon: <Heart size={16} />, href: '/personal-data' },
    ]},
    { section: 'Activity', items: [
      { name: 'Booking History', icon: <Calendar size={16} />, href: '/history' },
      { name: 'Digital Logbook', icon: <BookOpen size={16} />, href: '/logbook' },
    ]},
    { section: 'Professional', items: [
      { name: 'Bucceo for Business', icon: <Briefcase size={16} />, href: '/business' },
    ]},
    { section: 'Account', items: [
      { name: 'Settings', icon: <Settings size={16} />, href: '/settings' },
    ]}
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Premium Logo Section */}
      <div className="p-5 bg-blue-900 relative overflow-hidden shrink-0">
        <motion.div 
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl" 
        />
        
        <div className="flex items-center gap-3 text-white relative z-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src="logo.png" alt="Logo" />
          </motion.div>
        </div>
      </div>

      {/* Navigation - Spacing tightened to remove scroll */}
      <nav className="flex-1 p-3 space-y-1 overflow-hidden flex flex-col justify-between">
        <div className="space-y-4">
          {menu.map((section) => (
            <div key={section.section}>
              <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1.5 px-3">
                {section.section}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <motion.div
                          whileHover={{ x: 6, backgroundColor: isActive ? "rgba(255, 255, 255, 1)" : "rgba(239, 246, 255, 0.6)" }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[15px] transition-colors duration-300 ${
                            isActive 
                            ? 'text-blue-600 bg-white shadow-sm shadow-blue-100/50 font-bold' 
                            : 'text-slate-500 hover:text-blue-500'
                          }`}
                        >
                          {isActive && (
                            <motion.div 
                              layoutId="activeTab"
                              className="absolute left-0 w-1 h-4 bg-blue-600 rounded-r-full"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          
                          <motion.span 
                            className={`transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.4 }}
                          >
                            {item.icon}
                          </motion.span>
                          {item.name}
                        </motion.div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* User Footer - Pinned to bottom */}
      <div className="p-3 border-t border-blue-50 bg-white/40 shrink-0">
        <motion.div 
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.8)", y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all cursor-pointer border border-transparent hover:border-blue-50 hover:shadow-sm"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-7 h-7 rounded-full bg-linear-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-[9px] font-bold shadow-sm"
          >
            SM
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-700 truncate leading-tight">Sarah Martinez</p>
            <p className="text-[9px] text-slate-400 truncate uppercase tracking-tighter">Pro Diver</p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-3 z-100">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#003366] text-white rounded-lg shadow-lg transition-transform"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#F8FAFC] border-r border-slate-200 flex-col h-screen sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-80 lg:hidden"
            />
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-64 bg-[#F8FAFC] flex flex-col h-screen z-90 lg:hidden shadow-2xl overflow-hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}