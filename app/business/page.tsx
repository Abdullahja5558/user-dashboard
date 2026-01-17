"use client";

import React from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Briefcase, 
  Upload, 
  Settings, 
  Edit3, 
  CheckCircle2,
  ChevronRight,
  Building2,
  Mail,
  ShieldCheck,
  Zap
} from 'lucide-react';

/**
 * TYPOGRAPHY REFINEMENT:
 * - We utilize "Inter" or the system sans-serif as a base.
 * - Added tracking-tight and tracking-tighter for a modern, compact look.
 * - Used font-light and font-normal for prose to keep it elegant and "tall".
 * - Reduced font weights from "black/extrabold" to "semibold/medium" where appropriate
 * to ensure a premium, non-heavy feel.
 */

export default function BusinessPage() {
  const stats = [
    { label: "Total Guests Served", value: "1,247", icon: <Users size={22} />, active: true },
    { label: "Active Courses", value: "12", icon: <Calendar size={22} />, active: false },
    { label: "Monthly Revenue", value: "$24,690", icon: <TrendingUp size={22} />, active: false },
    { label: "Upcoming Bookings", value: "34", icon: <Briefcase size={22} />, active: false },
  ];

  const quickActions = [
    { title: "Log Guest Dive", desc: "Record a dive for a guest or student", icon: <Upload className="text-blue-500" size={20} /> },
    { title: "Manage Courses", desc: "View and update active certifications", icon: <Users className="text-cyan-500" size={20} /> },
    { title: "Business Settings", desc: "Update business profile and preferences", icon: <Settings className="text-slate-600" size={20} /> },
  ];

  const guestLogs = [
    { name: "John Anderson", activity: "Open Water Certification", diveNo: 3, date: "Nov 20, 2025", instructor: "You", status: "Logged" },
    { name: "Emily Roberts", activity: "Advanced Open Water", diveNo: 1, date: "Nov 20, 2025", instructor: "Maria Lopez", status: "Logged" },
    { name: "David Kim", activity: "Fun Dive", diveNo: 2, date: "Nov 20, 2025", instructor: "You", status: "Logged" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-9xl mx-auto min-h-screen bg-white font-sans antialiased text-slate-900">
      {/* Header Section */}
      <header className="mb-10 relative">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
          <h1 className="text-4xl font-light text-slate-800 tracking-tight">Bucceo for Business</h1>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-blue-100">
              Professional Mode
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-widest ml-2">
                <Zap size={12} className="text-amber-400 fill-amber-400" /> Premium Account
            </div>
          </div>
        </div>
        <p className="text-[15px] font-normal text-slate-500 tracking-wide">The central operations hub for dive centers and professional instructors.</p>
      </header>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className={`group p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm ${
            stat.active 
              ? 'bg-linear-to-br from-[#004488] to-[#0066AA] border-blue-400 text-white shadow-xl shadow-blue-100 hover:-translate-y-1' 
              : 'bg-white border-slate-100 text-slate-800 hover:border-slate-200 hover:shadow-md'
          }`}>
            <div className={`mb-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-3 ${
              stat.active ? 'bg-white/10 backdrop-blur-md shadow-inner' : 'bg-slate-50 text-blue-600 border border-slate-100'
            }`}>
              {stat.icon}
            </div>
            <div className="text-4xl font-light mb-1.5 tracking-tighter">{stat.value}</div>
            <div className={`text-[10px] font-bold uppercase tracking-[0.25em] ${stat.active ? 'text-blue-100' : 'text-slate-400'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
           <Zap size={14} className="text-blue-500" /> High-Priority Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, i) => (
            <div key={i} className="group bg-white p-8 rounded-4xl border border-slate-200/60 shadow-sm flex flex-col items-start hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-105 transition-all shadow-inner">
                {action.icon}
              </div>
              <h4 className="text-lg font-semibold text-slate-800 tracking-tight flex items-center gap-2">
                {action.title} <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[14px] text-slate-500 mt-2 font-normal leading-relaxed tracking-normal">{action.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Guest Logs Table */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Operations Activity</h3>
            <p className="text-sm font-medium text-slate-600">Real-time guest diving logs</p>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 bg-slate-50 border border-slate-200 px-6 py-2.5 rounded-xl hover:bg-slate-100 transition-all">View All Entries</button>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-sm overflow-hidden border-separate">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">Guest Name</th>
                  <th className="px-10 py-6">Course/Activity</th>
                  <th className="px-10 py-6 text-center">Dive #</th>
                  <th className="px-10 py-6">Date</th>
                  <th className="px-10 py-6">Instructor</th>
                  <th className="px-10 py-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {guestLogs.map((log, i) => (
                  <tr key={i} className="text-[14px] font-normal text-slate-600 hover:bg-blue-50/20 transition-colors">
                    <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-[11px] font-bold text-slate-500">
                                {log.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-slate-800 tracking-tight">{log.name}</span>
                        </div>
                    </td>
                    <td className="px-10 py-6 font-medium text-slate-700">{log.activity}</td>
                    <td className="px-10 py-6 text-center">
                        <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg border border-slate-100 font-mono text-xs">{log.diveNo}</span>
                    </td>
                    <td className="px-10 py-6 text-slate-400 font-medium">{log.date}</td>
                    <td className="px-10 py-6">
                        <span className={log.instructor === 'You' ? 'text-blue-600 font-semibold' : ''}>{log.instructor}</span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit shadow-sm shadow-emerald-50/50">
                        <CheckCircle2 size={12} strokeWidth={2.5} /> {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Business Profile Section */}
      <div className="bg-white border border-slate-200/60 rounded-[3rem] p-12 shadow-sm mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full -mr-40 -mt-40 blur-3xl opacity-40 pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Building2 size={24} strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-light text-slate-800 tracking-tight">Business Profile</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 relative z-10">
          {[
            { label: "Business Name", value: "Blue Horizon Dive Center", icon: <Building2 size={12}/> },
            { label: "Business ID", value: "BUCC-BIZ-8472", icon: <Zap size={12}/> },
            { label: "Location", value: "Cozumel, Mexico", icon: <Building2 size={12}/> },
            { label: "Contact Email", value: "info@bluehorizondive.com", icon: <Mail size={12}/> },
            { label: "Certifying Agency", value: "PADI 5-Star IDC", icon: <ShieldCheck size={12}/> },
            { label: "License Number", value: "PADI-S-729481", icon: <ShieldCheck size={12}/> },
          ].map((item, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-300">{item.icon}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">{item.label}</p>
              </div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-300">{item.value}</p>
            </div>
          ))}
        </div>
        
        <button className="mt-14 flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95">
          <Edit3 size={16} /> Edit Business Profile
        </button>
      </div>

      {/* Premium Footer Info Banner */}
      <div className="bg-linear-to-br from-[#002244] to-[#001122] rounded-[3.5rem] p-16 text-white shadow-2xl shadow-blue-200/50 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-500/5 rounded-full -mb-64 -mr-64 blur-3xl" />
        
        <div className="flex items-center gap-3 mb-10">
            <Zap className="text-blue-400 fill-blue-400" size={22}/>
            <h4 className="text-2xl font-light tracking-tight">Enterprise Infrastructure</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          <div>
            <h5 className="text-[17px] font-semibold mb-4 text-blue-200 tracking-tight">Seamless Guest Management</h5>
            <p className="text-[14px] text-blue-100/60 leading-relaxed font-normal tracking-wide">Log dives for guests instantly and sync with their personal logbooks automatically via secure cloud protocols.</p>
          </div>
          <div>
            <h5 className="text-[17px] font-semibold mb-4 text-blue-200 tracking-tight">Professional Dashboard</h5>
            <p className="text-[14px] text-blue-100/60 leading-relaxed font-normal tracking-wide">Track bookings, course certifications, and recurring revenue in one consolidated executive interface.</p>
          </div>
          <div>
            <h5 className="text-[17px] font-semibold mb-4 text-blue-200 tracking-tight">Unified Platform Sync</h5>
            <p className="text-[14px] text-blue-100/60 leading-relaxed font-normal tracking-wide">Your operational data propagates across the Bucceo ecosystem, ensuring live updates for all connected users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}