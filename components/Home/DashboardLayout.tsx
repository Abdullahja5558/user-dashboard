"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Copy,
  BookOpen, 
  Calendar, 
  Award, 
  ChevronRight,
  Upload,
  X
} from 'lucide-react';

const DashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    if (previewImage) {
      setProfileImage(previewImage);
      localStorage.setItem('userProfileImage', previewImage);
    }
    setIsModalOpen(false);
    setPreviewImage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewImage(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <main className="flex-1 overflow-x-hidden">
        
        
        <div className="relative h-72 bg-blue-600 flex items-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[10%] w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto w-full px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              
              <div className="relative group">
                <div className="w-36 h-36 rounded-4xl bg-white p-1.5 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full rounded-[1.7rem] bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={40} className="text-slate-300" />
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-xl shadow-xl border border-slate-100 text-blue-600 hover:scale-110 active:scale-95 transition-all  z-30  cursor-pointer"
                >
                  <Camera size={16} />
                </button>
              </div>

          
              <div className="text-white text-center md:text-left pb-2">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3">Sarah Martinez</h1>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border border-white/20 transition-colors cursor-pointer group">
                    <span className="text-blue-100">Buddy ID:</span> 
                    <span className="tracking-wider">BUCC-47291</span>
                    <Copy size={12} className="group-hover:text-blue-200 transition-colors" />
                  </div>
                  <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                  <span className="hidden md:block text-[10px] uppercase tracking-widest font-bold text-blue-100">Active Pro</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto px-8 -mt-10 pb-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Total Dives', value: '247', color: 'from-blue-500 to-blue-600', sub: 'Last dive 2 days ago' },
              { label: 'Sites Visited', value: '42', color: 'from-sky-400 to-sky-500', sub: 'Across 12 countries' },
              { label: 'Certifications', value: '5', color: 'from-indigo-500 to-indigo-600', sub: 'Master Scuba Diver' }
            ].map((stat, i) => (
              <div key={i} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`text-5xl font-black bg-linear-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 tracking-tight">{stat.label}</div>
                <div className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">
              <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">About</h2>
                  <button className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">Edit Bio</button>
                </div>
                <p className="text-sm text-slate-600 leading-[1.8] font-medium mb-8">
                  Passionate scuba diver with over 10 years of experience exploring underwater worlds. 
                  Advanced Open Water certified with specialties in deep diving, wreck diving, and 
                  underwater photography. Love connecting with dive buddies.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Wreck Diving', 'Deep Diving', 'Photography', 'Night Diving'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-xl border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Activity</h2>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
                <div className="space-y-8">
                  {[
                    { title: 'Logged a dive at Great Blue Hole', meta: '2 days ago • 42m depth • 38 min', icon: <BookOpen size={18} />, bg: 'bg-blue-50', text: 'text-blue-600' },
                    { title: 'Earned Deep Diver Specialty', meta: '1 week ago • PADI Certified', icon: <Award size={18} />, bg: 'bg-amber-50', text: 'text-amber-600' },
                    { title: 'Booked trip to Raja Ampat', meta: '2 weeks ago • March 2026', icon: <Calendar size={18} />, bg: 'bg-indigo-50', text: 'text-indigo-600' }
                  ].map((act, idx) => (
                    <div key={idx} className="flex gap-5 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-2xl ${act.bg} ${act.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        {act.icon}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{act.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium uppercase tracking-tight">{act.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-120 rounded-4xl shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <h2 className="text-2xl font-bold text-slate-800">Update Profile Picture</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-all cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            
            <div className="px-8 py-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative min-h-70 border-2 border-dashed border-blue-100 rounded-3xl flex flex-col items-center justify-center bg-blue-50/30 cursor-pointer hover:bg-blue-50/50 transition-all group overflow-hidden"
              >
                <input 
                  type="file" 
                  hidden 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
                
                {previewImage ? (
                  <div className="absolute inset-0 w-full h-full p-2 bg-white">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-xl" 
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 px-4 py-2 rounded-lg font-bold text-slate-700 shadow-sm">
                        Change Photo
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-100/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Camera size={40} className="text-blue-900/30" />
                    </div>
                    <p className="text-xl font-bold text-slate-700 mb-1">Drag and drop your photo here</p>
                    <p className="text-slate-400 text-lg font-medium mb-6">or</p>
                    <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-[15px] font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer">
                      <Upload size={18} />
                      Choose File
                    </button>
                  </div>
                )}
              </div>
              <p className="text-center mt-6 text-sm font-semibold text-slate-300 uppercase tracking-widest">
                Supports: JPG, PNG, GIF (max 5MB)
              </p>
            </div>

            
            <div className="flex items-center justify-end gap-4 p-8 pt-4">
              <button 
                onClick={handleCloseModal}
                className="px-8 py-3.5 rounded-xl text-[15px] font-bold text-slate-500 hover:bg-slate-50 transition-all border border-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSavePhoto}
                disabled={!previewImage}
                className={`flex items-center gap-2 px-10 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all shadow-lg cursor-pointer 
                  ${previewImage 
                    ? 'bg-[#82B9D9] hover:brightness-105 active:scale-95 shadow-blue-200/50' 
                    : 'bg-slate-200 cursor-not-allowed shadow-none'
                  }`}
              >
                <Camera size={20} />
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;