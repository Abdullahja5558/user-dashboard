"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ExternalLink, 
  ChevronRight,
  TrendingUp,
  Globe,
  X,
  Info,
  Waves,
  Fish,
  FileText,
  Clock,
  ShieldCheck,
  Activity,
  ClipboardList
} from 'lucide-react';

// --- Types ---
interface Booking {
  location: string;
  status: string;
  country: string;
  date: string;
  divers: number;
  price: string;
  operator: string;
  hasLogEntry: boolean;
  showLogPrompt?: boolean;
}

type TabType = 'Conditions' | 'Marine Life' | 'Dive Details' | 'Notes';

export default function BookingHistoryPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('Conditions');

  const stats = [
    { label: "Total Bookings", value: "12", color: "text-blue-600", bg: "bg-blue-50/50" },
    { label: "Dive Operators", value: "8", color: "text-indigo-600", bg: "bg-indigo-50/50" },
    { label: "$5,840", value: "Total Spent", isCurrency: true, color: "text-emerald-600", bg: "bg-emerald-50/50" },
    { label: "Upcoming", value: "1", color: "text-cyan-600", bg: "bg-cyan-50/50" },
  ];

  const bookings: Booking[] = [
    {
      location: "Great Blue Hole",
      status: "Completed",
      country: "Belize",
      date: "November 27, 2025",
      divers: 2,
      price: "$280",
      operator: "Blue Hole Diving Center",
      hasLogEntry: true
    },
    {
      location: "SS Thistlegorm Wreck",
      status: "Completed",
      country: "Red Sea, Egypt",
      date: "October 15, 2025",
      divers: 3,
      price: "$420",
      operator: "Red Sea Explorers",
      hasLogEntry: true
    },
    {
      location: "Raja Ampat Liveaboard",
      status: "Upcoming",
      country: "Indonesia",
      date: "March 15-22, 2026",
      divers: 24,
      price: "$3,200",
      operator: "Indo Aggressor",
      hasLogEntry: false
    },
    {
      location: "Cenote Dos Ojos",
      status: "Completed",
      country: "Tulum, Mexico",
      date: "September 8, 2025",
      divers: 2,
      price: "$180",
      operator: "Cenote Adventures",
      hasLogEntry: true
    },
    {
      location: "Blue Corner",
      status: "Completed",
      country: "Palau",
      date: "July 22, 2025",
      divers: 4,
      price: "$560",
      operator: "Palau Dive Adventures",
      hasLogEntry: true
    },
    {
      location: "Barracuda Point",
      status: "Completed",
      country: "Sipadan, Malaysia",
      date: "June 10, 2025",
      divers: 2,
      price: "$390",
      operator: "Sipadan Dive Center",
      hasLogEntry: false,
      showLogPrompt: true
    }
  ];

  const handleOpenDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setActiveTab('Conditions');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Conditions':
        return (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Visibility</p>
              <p className="text-[13px] font-medium text-slate-700">30m+ Clear</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Water Temp</p>
              <p className="text-[13px] font-medium text-slate-700">28°C / 82°F</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Current</p>
              <p className="text-[13px] font-medium text-slate-700">Mild</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Surface</p>
              <p className="text-[13px] font-medium text-slate-700">Calm</p>
            </div>
          </div>
        );
      case 'Marine Life':
        return (
          <div className="space-y-2 animate-in fade-in duration-300">
            {['Whale Shark sighting', 'Schools of Barracuda', 'Green Sea Turtles'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100/50">
                <Fish size={12} className="text-blue-500" />
                <span className="text-[13px] font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        );
      case 'Dive Details':
        return (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Max Depth</p>
              <p className="text-[13px] font-medium text-slate-700">40.2m</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Gas Mix</p>
              <p className="text-[13px] font-medium text-slate-700">Air 21%</p>
            </div>
          </div>
        );
      case 'Notes':
        return (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in duration-300">
            <p className="text-[13px] leading-relaxed text-slate-600 font-normal italic">
              "Entry was smooth from the boat. The coral formations at {selectedBooking?.location} were breathtaking."
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-white font-sans antialiased text-slate-900">
      <header className="mb-10">
        <h1 className="text-3xl font-light tracking-tight text-slate-800">Booking History</h1>
        <p className="text-[15px] font-normal text-slate-500 mt-1">View all your past and upcoming dive bookings</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                {stat.isCurrency ? <TrendingUp size={18} className={stat.color} /> : <Globe size={18} className={stat.color}/>}
            </div>
            <div className={`text-2xl font-light tracking-tight ${stat.color}`}>
              {stat.isCurrency ? stat.label : stat.value}
            </div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">
              {stat.isCurrency ? stat.value : stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {bookings.map((booking, idx) => (
          <div key={idx} className="group bg-white border border-slate-200/60 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${booking.status === 'Completed' ? 'bg-emerald-400' : 'bg-blue-500'}`} />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-light text-slate-800 tracking-tight">{booking.location}</h3>
                  <span className={`text-[9px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-5 text-[13px] text-slate-400 font-normal">
                  <div className="flex items-center gap-1.5"><MapPin size={14} /> {booking.country}</div>
                  <div className="flex items-center gap-1.5"><Calendar size={14} /> {booking.date}</div>
                  <div className="flex items-center gap-1.5"><Users size={14} /> {booking.divers} divers</div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 text-left md:text-right">
                <div className="text-2xl font-light text-slate-800">{booking.price}</div>
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Total paid</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-slate-50 pt-6 gap-4">
              <p className="text-[13px] font-normal text-slate-500">Operator: <span className="font-medium text-slate-800">{booking.operator}</span></p>
              <div className="flex gap-3 w-full md:w-auto">
                {booking.hasLogEntry && (
                  <button className="flex-1 md:flex-none px-5 py-3 border border-slate-200 rounded-xl text-[11px] font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all">
                    View Log
                  </button>
                )}
                <button 
                  onClick={() => handleOpenDetails(booking)}
                  className="flex-1 md:flex-none px-5 py-3 bg-slate-900 text-white rounded-xl text-[11px] font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all"
                >
                  Full Details
                </button>
              </div>
            </div>

            {booking.showLogPrompt && (
              <div className="mt-8 bg-blue-600 rounded-[2rem] p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h4 className="text-white font-medium text-[14px]">Missing Log Entries</h4>
                    <p className="text-[12px] text-blue-100/80">Keep your diving profile up to date.</p>
                </div>
                <button className="w-full md:w-auto bg-white text-blue-600 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider">
                  Add to Log
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --- POPUP (MODAL) --- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[460px] rounded-[2rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Upper Section (Compact) */}
            <div className="bg-slate-900 p-6 pb-8 text-white relative">
              <button onClick={() => setSelectedBooking(null)} className="absolute top-5 right-5 p-1.5 hover:bg-white/10 rounded-full transition-colors"><X size={18} /></button>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-blue-500 rounded-full text-[8px] font-bold uppercase tracking-widest">Dive Detail</span>
                <div className="flex items-center gap-1 text-blue-400 text-[9px] font-semibold uppercase tracking-tight"><ShieldCheck size={12} /> Verified</div>
              </div>

              <h2 className="text-2xl font-light tracking-tight mb-1">{selectedBooking.location}</h2>
              <div className="flex items-center gap-1.5 text-slate-400 text-[13px]"><MapPin size={14} className="text-blue-500" />{selectedBooking.country}</div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Date</p>
                  <p className="text-[12px] font-light truncate">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Operator</p>
                  <p className="text-[12px] font-light truncate">{selectedBooking.operator}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Team</p>
                  <p className="text-[12px] font-light">{selectedBooking.divers} Divers</p>
                </div>
              </div>
            </div>

            {/* Content Section (Refined & Compact) */}
            <div className="p-6">
              <div className="flex items-center p-1 bg-slate-50 border border-slate-100 rounded-xl mb-6 overflow-x-auto no-scrollbar">
                {(['Conditions', 'Marine Life', 'Dive Details', 'Notes'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap ${
                      activeTab === tab ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[160px]">
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="w-0.5 h-3 bg-blue-500 rounded-full" />
                  <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{activeTab}</h4>
                </div>
                {renderTabContent()}
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-[11px] font-semibold uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}