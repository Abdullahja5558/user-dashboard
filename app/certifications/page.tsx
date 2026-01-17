"use client";

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Copy, 
  Maximize, 
  Upload, 
  ShieldCheck,
  ExternalLink,
  X,
  Camera,
  ArrowLeft,
  Calendar,
  Trash2
} from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  agency: string;
  type: string;
  number: string;
  date: string;
  expiryDate?: string;
  certifyingAgency: string;
}

export default function CertificationsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  
  const [certifications, setCertifications] = useState<Certification[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    agency: '',
    number: '',
    date: '',
    expiryDate: '',
    type: 'Specialty'
  });

  // Persistence: Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem('diving_certs_data_v2');
    if (saved) {
      setCertifications(JSON.parse(saved));
    } else {
      const initial = [
        { id: '1', title: "Advanced Open Water Diver", agency: "PADI", type: "Advanced", number: "PADI-10387291", date: "March 12, 2022", certifyingAgency: "PADI" },
        { id: '2', title: "Deep Diver Specialty", agency: "PADI", type: "Specialty", number: "PADI-59271847", date: "November 20, 2024", certifyingAgency: "PADI" },
        { id: '3', title: "Wreck Diver Specialty", agency: "PADI", type: "Specialty", number: "PADI-58029183", date: "July 8, 2023", certifyingAgency: "PADI" }
      ];
      setCertifications(initial);
    }
    setIsLoaded(true);
  }, []);

  // Persistence: Save data
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('diving_certs_data_v2', JSON.stringify(certifications));
    }
  }, [certifications, isLoaded]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newCert: Certification = {
      id: Date.now().toString(),
      title: formData.title,
      agency: formData.agency,
      type: formData.type,
      number: formData.number || "N/A",
      date: formData.date || "Not set",
      expiryDate: formData.expiryDate,
      certifyingAgency: formData.agency
    };

    setCertifications(prev => [newCert, ...prev]);
    setShowFormModal(false);
    setFormData({ title: '', agency: '', number: '', date: '', expiryDate: '', type: 'Specialty' });
  };

  const deleteCertificate = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  if (!isLoaded) return null;

  return (
    <div className="p-6 md:p-10 max-w-8xl mx-auto min-h-screen bg-white font-sans antialiased">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Certifications</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage your diving certifications and credentials</p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2.5 bg-[#0077C0] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg shadow-blue-200/50 hover:bg-blue-600 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Maximize size={16} strokeWidth={2.5} /> Scan Document
        </button>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2.5 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
        >
          <Upload size={16} strokeWidth={2.5} /> Upload PDF/Image
        </button>
      </div>

      {/* Certification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert) => (
          <div key={cert.id} className="group bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col relative">
            
            {/* Premium Delete Button Overlay */}
            <button 
              onClick={() => deleteCertificate(cert.id)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-red-500 text-white rounded-xl backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              title="Delete Certificate"
            >
              <Trash2 size={16} />
            </button>

            <div className="bg-linear-to-br from-[#0077C0] via-[#0066A4] to-[#00558C] p-6 text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <Award className="mb-4 text-blue-200/80 group-hover:scale-110 transition-transform duration-500" size={28} strokeWidth={1.5} />
              
              {/* Type Badge */}
              <div className="absolute top-6 right-6 bg-white/15 backdrop-blur-lg border border-white/20 px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest group-hover:opacity-0 transition-opacity">
                {cert.type}
              </div>

              <h3 className="font-extrabold text-base leading-tight mb-1.5 pr-8">{cert.title}</h3>
              <p className="text-[10px] text-blue-100 font-bold uppercase tracking-[0.2em] opacity-90">{cert.agency}</p>
            </div>

            <div className="p-6 space-y-4 flex-1 bg-linear-to-b from-white to-slate-50/50">
              {[
                { label: "Certification Number", value: cert.number },
                { label: "Issue Date", value: cert.date },
                { label: "Certifying Agency", value: cert.certifyingAgency }
              ].map((field, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-[1.25rem] p-4 flex justify-between items-center hover:border-blue-100 hover:bg-blue-50/20 transition-all">
                  <div>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{field.label}</p>
                    <p className="text-[13px] font-bold text-slate-700 mt-1">{field.value}</p>
                  </div>
                  <button className="p-2 rounded-lg text-slate-300 hover:text-blue-500 hover:bg-white transition-all shadow-none hover:shadow-sm cursor-pointer">
                    <Copy size={14} />
                  </button>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 py-3 mt-2 text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors border-t border-slate-50 pt-4 cursor-pointer">
                <ExternalLink size={12} /> View Digital Credential
              </button>
            </div>
          </div>
        ))}

        {/* Add Card Placeholder */}
        <div 
          onClick={() => setShowUploadModal(true)}
          className="border-2 border-dashed border-slate-200 rounded-4xl flex flex-col items-center justify-center p-10 bg-slate-50/40 group cursor-pointer hover:bg-blue-50/40 hover:border-blue-300 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
            <Award size={32} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-700">Add Certification</h4>
          <p className="text-[11px] text-slate-400 mt-1.5 font-medium">Upload or scan a new card</p>
        </div>
      </div>

      {/* ADD CERTIFICATION MODAL (Form Step) */}
      {showFormModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in zoom-in-95 duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[95vh]">
            <div className="p-8">
              {/* Header as per design */}
              <div className="flex items-center gap-4 mb-10">
                <button onClick={() => { setShowFormModal(false); setShowUploadModal(true); }} className="text-slate-800 hover:bg-slate-50 p-2 rounded-full transition-colors cursor-pointer">
                  <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-[#F0F5FA] rounded-full flex items-center justify-center border border-slate-100">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Award className="text-blue-500/40" size={22} />
                      </div>
                   </div>
                   <div>
                     <h2 className="text-xl font-bold text-slate-800">Add Certification</h2>
                     <p className="text-slate-400 text-xs font-medium">Upload or scan a new certification card</p>
                   </div>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Certification Document</label>
                  <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center gap-4 border-dashed">
                    <div className="flex gap-3 w-full">
                      <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 py-3.5 rounded-xl text-[11px] font-bold text-slate-600 hover:border-slate-300 shadow-sm transition-all cursor-pointer">
                        <Upload size={14} /> Upload File
                      </button>
                      <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 py-3.5 rounded-xl text-[11px] font-bold text-slate-600 hover:border-slate-300 shadow-sm transition-all cursor-pointer">
                        <Camera size={14} /> Scan Card
                      </button>
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold">Support for PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Certification Name *</label>
                    <input 
                      required
                      placeholder="e.g., CPR Certification"
                      className="w-full bg-[#F7F9FB] border-none rounded-xl px-5 py-4 text-sm font-semibold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Issuing Organization *</label>
                    <input 
                      required
                      placeholder="e.g., American Red Cross"
                      className="w-full bg-[#F7F9FB] border-none rounded-xl px-5 py-4 text-sm font-semibold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      value={formData.agency}
                      onChange={e => setFormData({...formData, agency: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Credential ID</label>
                    <input 
                      placeholder="Enter credential ID (optional)"
                      className="w-full bg-[#F7F9FB] border-none rounded-xl px-5 py-4 text-sm font-semibold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      value={formData.number}
                      onChange={e => setFormData({...formData, number: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Issue Date *</label>
                      <div className="relative">
                        <input 
                          type="text"
                          required
                          placeholder="Select date"
                          className="w-full bg-white border border-slate-100 rounded-xl px-12 py-3.5 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Expiration Date</label>
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Select date"
                          className="w-full bg-white border border-slate-100 rounded-xl px-12 py-3.5 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          value={formData.expiryDate}
                          onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3.5 pt-6">
                  <button type="button" onClick={() => setShowFormModal(false)} className="px-8 py-3.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all border border-slate-100 cursor-pointer">Cancel</button>
                  <button type="submit" className="px-10 py-3.5 bg-[#0077C0] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200/50 hover:bg-blue-600 transition-all active:scale-95 cursor-pointer">Save Certification</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: Upload Modal (Triggered by main buttons) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative">
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Upload Documents</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">Upload your files to get started</p>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-300 hover:text-slate-600 transition-colors p-1 cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Upload className="text-slate-400" size={20} />
                </div>
                <p className="text-slate-700 font-bold text-sm">Drag and drop your files here</p>
                <p className="text-slate-400 text-xs my-2">or</p>
                <button 
                  onClick={() => { setShowUploadModal(false); setShowFormModal(true); }}
                  className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Browse Files
                </button>
                <p className="text-slate-400 text-[10px] font-bold mt-6 uppercase tracking-widest">
                  Supported formats: PDF, JPG, PNG
                </p>
              </div>

              <div className="flex justify-between items-center mt-8">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">0 files selected</span>
                <div className="flex gap-3">
                  <button onClick={() => setShowUploadModal(false)} className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
                  <button className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#82B9D9] text-white opacity-80 cursor-not-allowed">Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}