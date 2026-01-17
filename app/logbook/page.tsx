"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Users, 
  Globe,
  Award,
  Waves,
  Info,
  Navigation,
  Compass,
  X,
  Clock,
  Thermometer,
  ShieldCheck,
  Calendar,
  Eye,
  Trash2
} from 'lucide-react';

// --- Types ---
interface DiveLog {
  id: string;
  site: string;
  location: string;
  date: string;
  rating: number;
  depth: string;
  duration: string;
  visibility: string;
  temp: string;
  buddy: string;
  cosigned: boolean;
  notes?: string;
  equipment?: string;
}

export default function LogbookPage() {
  // Initial Data
  const initialLogs: DiveLog[] = [
    {
      id: "247",
      site: "Great Blue Hole",
      location: "Belize",
      date: "Nov 27, 2025",
      rating: 5,
      depth: "42m",
      duration: "38 min",
      visibility: "Excellent (30m+)",
      temp: "28°C",
      buddy: "Malek Chen",
      cosigned: true,
      notes: "Incredible visibility. Saw three reef sharks near the stalactites.",
      equipment: "5mm Wetsuit, Nitrox 32%"
    },
    {
      id: "246",
      site: "Great Blue Hole",
      location: "Belize",
      date: "Nov 27, 2025",
      rating: 5,
      depth: "38m",
      duration: "35 min",
      visibility: "Excellent (30m+)",
      temp: "28°C",
      buddy: "Maria Chen",
      cosigned: true,
      notes: "Second dive of the day. Slightly more current than the morning.",
      equipment: "5mm Wetsuit, Air"
    },
    {
      id: "245",
      site: "SS Thistlegorm - Stern",
      location: "Red Sea, Egypt",
      date: "Oct 15, 2025",
      rating: 5,
      depth: "32m",
      duration: "42 min",
      visibility: "Good (20m)",
      temp: "25°C",
      buddy: "James Wilson",
      cosigned: false,
      notes: "Explored the locomotive and the stern guns. Remarkable wreck.",
      equipment: "3mm Wetsuit, Nitrox 30%"
    }
  ];

  // State initialized from LocalStorage for persistence
  const [logs, setLogs] = useState<DiveLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLogs = localStorage.getItem('dive_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      setLogs(initialLogs);
    }
    setIsLoaded(true);
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dive_logs', JSON.stringify(logs));
    }
  }, [logs, isLoaded]);

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDive, setSelectedDive] = useState<DiveLog | null>(null);
  
  const [newDive, setNewDive] = useState({
    site: '',
    location: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    rating: 5,
    depth: '',
    duration: '',
    visibility: '',
    temp: '',
    buddy: '',
  });

  const stats = [
    { label: "Total Dives", value: logs.length > 0 ? logs.length + 244 : "244", active: true },
    { label: "Bottom Time", value: "412h", active: false },
    { label: "Max Depth", value: "42m", active: false },
    { label: "Avg Depth", value: "18m", active: false },
  ];

  const achievements = [
    { name: "Century Diver", desc: "100+ dives", icon: <Award size={22} className="text-blue-500" /> },
    { name: "Deep Explorer", desc: "Reached 40m+", icon: <Waves size={22} className="text-blue-500" /> },
    { name: "Globe Trotter", desc: "25+ dive sites", icon: <Globe size={22} className="text-blue-500" /> },
    { name: "Social Diver", desc: "50+ buddy dives", icon: <Users size={22} className="text-blue-500" /> },
  ];

  const handleSaveDive = () => {
    const nextId = logs.length > 0 ? (parseInt(logs[0].id) + 1).toString() : "248";
    const logToAdd: DiveLog = {
      ...newDive,
      id: nextId,
      cosigned: false,
      notes: "New dive logged successfully.",
      equipment: "Standard Gear"
    };
    setLogs([logToAdd, ...logs]);
    setIsLogModalOpen(false);
    setNewDive({ site: '', location: '', date: '', rating: 5, depth: '', duration: '', visibility: '', temp: '', buddy: '' });
  };

  const handleDeleteDive = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const openDetails = (log: DiveLog) => {
    setSelectedDive(log);
    setIsDetailModalOpen(true);
  };

  if (!isLoaded) return null;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-white font-sans antialiased text-slate-900">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-tight text-slate-800">Digital Logbook</h1>
        <p className="text-[16px] font-normal text-slate-500 mt-1">Track your diving journey and professional achievements</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm ${
            stat.active 
              ? 'bg-gradient-to-br from-[#004488] to-[#0066AA] border-blue-400 text-white shadow-lg shadow-blue-100 hover:-translate-y-1' 
              : 'bg-white border-slate-100 text-slate-800 hover:border-slate-300'
          }`}>
            <div className="text-3xl font-light mb-1 tracking-tight">{stat.value}</div>
            <div className={`text-[11px] font-semibold uppercase tracking-widest ${stat.active ? 'text-blue-100' : 'text-slate-400'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mb-12">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
           <Award size={14} className="text-blue-500" /> Milestones & Badges
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((ach, i) => (
            <div key={i} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                {ach.icon}
              </div>
              <h4 className="text-[13px] font-semibold text-slate-800 tracking-tight">{ach.name}</h4>
              <p className="text-[11px] font-normal text-slate-400 mt-1 uppercase tracking-tight">{ach.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Action */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by dive site, location, or buddy..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-[15px] font-normal focus:outline-none focus:ring-4 focus:ring-blue-400/5 focus:bg-white focus:border-blue-300 transition-all"
          />
        </div>
        <button 
          onClick={() => setIsLogModalOpen(true)}
          className="bg-[#002244] text-white px-10 py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={18} /> Log New Dive
        </button>
      </div>

      {/* Log Entries */}
      <div className="space-y-6 mb-16">
        {logs.map((log) => (
          <div key={log.id} className="bg-white border border-slate-200/60 rounded-[3rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-[15px] font-light tracking-tighter shadow-lg shadow-slate-200">
                  #{log.id}
                </div>
                <div>
                  <h3 className="font-light text-slate-800 text-2xl tracking-tight">{log.site}</h3>
                  <div className="flex flex-wrap items-center gap-5 text-[13px] text-slate-400 font-normal mt-1.5">
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-500" /> {log.location}</span>
                    <span className="flex items-center gap-2"><Navigation size={14} /> {log.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <div className="flex gap-1.5 p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < log.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                  ))}
                </div>
                <button 
                  onClick={() => handleDeleteDive(log.id)}
                  className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  title="Delete Log"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              {[
                { label: "Max Depth", val: log.depth, icon: <Waves size={14}/> },
                { label: "Duration", val: log.duration, icon: <Clock size={14}/> },
                { label: "Visibility", val: log.visibility, icon: <Eye size={14}/> },
                { label: "Water Temp", val: log.temp, icon: <Thermometer size={14}/> },
                { label: "Buddy", val: log.buddy, icon: <Users size={14}/> }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-50 transition-colors hover:bg-white hover:border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-slate-300">{item.icon}</span>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="text-[14px] font-medium text-slate-700 truncate">{item.val}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-50 gap-6">
              {log.cosigned ? (
                <div className="flex items-center gap-2.5 text-emerald-600 text-[11px] font-semibold uppercase tracking-widest bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100 shadow-sm shadow-emerald-50">
                  <CheckCircle2 size={15} /> Co-signed by buddy
                </div>
              ) : (
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest px-5 py-2.5">Verification Pending</div>
              )}
              <div className="flex gap-4 w-full md:w-auto">
                {!log.cosigned && (
                  <button className="flex-1 md:flex-none text-[11px] font-bold uppercase tracking-widest text-blue-600 border border-blue-100 px-7 py-3.5 rounded-2xl hover:bg-blue-50 transition-all">Request Co-sign</button>
                )}
                <button 
                  onClick={() => openDetails(log)}
                  className="flex-1 md:flex-none text-[11px] font-bold uppercase tracking-widest text-slate-600 border border-slate-200 px-7 py-3.5 rounded-2xl hover:bg-slate-50 transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-[#001122] to-[#003366] rounded-[3rem] p-12 flex flex-col md:flex-row gap-10 items-center text-white shadow-2xl shadow-blue-200/50">
        <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center text-blue-300 shrink-0 border border-white/10">
          <ShieldCheck size={40} />
        </div>
        <div className="text-center md:text-left">
          <h5 className="text-2xl font-light tracking-tight mb-3">Buddy Co-signing Security</h5>
          <p className="text-[15px] text-blue-100/70 leading-relaxed font-normal max-w-4xl">
            Search for your dive buddies by their unique Buddy ID. Co-signed logs add professional credibility to your profile, 
            verifying depth and conditions for advanced certification paths and technical diving prerequisites.
          </p>
        </div>
      </div>

      {/* --- LOG NEW DIVE POPUP --- */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[600px] rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 p-10 pb-12 text-white relative">
              <button onClick={() => setIsLogModalOpen(false)} className="absolute top-8 right-8 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
              <h2 className="text-3xl font-light tracking-tight">Log New Entry</h2>
              <p className="text-slate-400 text-[14px] mt-2 font-normal">Enter the technical details of your dive.</p>
            </div>
            
            <div className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Dive Site Name</label>
                  <input value={newDive.site} onChange={(e) => setNewDive({...newDive, site: e.target.value})} type="text" placeholder="e.g. Blue Hole" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] focus:ring-4 focus:ring-blue-500/5 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Location</label>
                  <input value={newDive.location} onChange={(e) => setNewDive({...newDive, location: e.target.value})} type="text" placeholder="e.g. Belize" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] focus:ring-4 focus:ring-blue-500/5 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Max Depth</label>
                  <input value={newDive.depth} onChange={(e) => setNewDive({...newDive, depth: e.target.value})} type="text" placeholder="40m" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                  <input value={newDive.duration} onChange={(e) => setNewDive({...newDive, duration: e.target.value})} type="text" placeholder="45 min" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Buddy</label>
                  <input value={newDive.buddy} onChange={(e) => setNewDive({...newDive, buddy: e.target.value})} type="text" placeholder="Buddy ID" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] outline-none" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-4">
                <button onClick={() => setIsLogModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[13px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Discard</button>
                <button onClick={handleSaveDive} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[13px] font-bold uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">Save Entry</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW DETAILS POPUP --- */}
      {isDetailModalOpen && selectedDive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[550px] rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-[#002244] p-10 pb-12 text-white relative">
              <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-8 right-8 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-blue-500 rounded-full text-[10px] font-bold uppercase tracking-widest">Entry #{selectedDive.id}</span>
                {selectedDive.cosigned && <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase"><CheckCircle2 size={14} /> Verified</span>}
              </div>
              <h2 className="text-3xl font-light tracking-tight">{selectedDive.site}</h2>
              <p className="flex items-center gap-2 text-slate-400 text-[15px] mt-2 font-normal">
                <MapPin size={16} className="text-blue-500" /> {selectedDive.location}
              </p>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><Calendar size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                      <p className="text-[15px] font-medium text-slate-700">{selectedDive.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><Waves size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max Depth</p>
                      <p className="text-[15px] font-medium text-slate-700">{selectedDive.depth}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><Clock size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bottom Time</p>
                      <p className="text-[15px] font-medium text-slate-700">{selectedDive.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><Users size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dive Buddy</p>
                      <p className="text-[15px] font-medium text-slate-700">{selectedDive.buddy}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><Thermometer size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Water Temp</p>
                      <p className="text-[15px] font-medium text-slate-700">{selectedDive.temp}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><ShieldCheck size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Equipment</p>
                      <p className="text-[15px] font-medium text-slate-700">{selectedDive.equipment}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 mb-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Compass size={12} /> Diver's Log Notes</p>
                <p className="text-[14px] font-normal leading-relaxed text-slate-600 italic">"{selectedDive.notes}"</p>
              </div>

              <button onClick={() => setIsDetailModalOpen(false)} className="w-full py-4.5 bg-slate-900 text-white rounded-2xl text-[13px] font-bold uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">Close Entry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}