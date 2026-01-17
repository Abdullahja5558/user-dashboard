"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Lock, 
  AlertCircle, 
  Search,
  MapPin,
  Phone,
  Mail,
  HeartPulse,
  UserPlus,
  Upload,
  X,
  FileText,
  Camera,
  ChevronRight,
  Filter
} from 'lucide-react';

// --- Types ---
interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
}

interface Physician {
  name: string;
  specialty: string;
  address: string;
  location: string;
  phone: string;
  hours: string;
  status: string;
}

export default function PersonalDataPage() {
  // --- State Management ---
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals
  const [showAddContact, setShowAddContact] = useState(false);
  const [showEditContact, setShowEditContact] = useState<EmergencyContact | null>(null);
  const [showUploadMedical, setShowUploadMedical] = useState(false);
  const [showPhysicianResults, setShowPhysicianResults] = useState(false);

  // Form States
  const [contactForm, setContactForm] = useState({ name: '', relation: '', phone: '', email: '' });

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('user_emergency_contacts_v1');
    if (saved) {
      setContacts(JSON.parse(saved));
    } else {
      setContacts([
        { id: '1', name: "Michael Martinez", relation: "Spouse", phone: "+1 (555) 234-5678", email: "michael.m@email.com" },
        { id: '2', name: "Dr. Jennifer Park", relation: "Primary Care Physician", phone: "+1 (555) 876-5432", email: "dr.park@healthclinic.com" },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('user_emergency_contacts_v1', JSON.stringify(contacts));
  }, [contacts, isLoaded]);

  // --- Handlers ---
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = { ...contactForm, id: Date.now().toString() };
    setContacts([...contacts, newContact]);
    setShowAddContact(false);
    setContactForm({ name: '', relation: '', phone: '', email: '' });
  };

  const handleUpdateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditContact) return;
    setContacts(contacts.map(c => c.id === showEditContact.id ? showEditContact : c));
    setShowEditContact(null);
  };

  const handleSearchPhysician = () => {
    if (searchQuery.toLowerCase() === 'zurich') {
      setShowPhysicianResults(true);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-blue-100">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Personal Data</h1>
        <p className="text-[15px] font-medium text-slate-500 mt-1">Manage your health information and emergency contacts</p>
      </header>

      {/* Premium Security Banner */}
      <div className="bg-[#F0F7FF] border border-blue-100 rounded-[2.5rem] p-8 mb-10 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
          <ShieldCheck size={28} strokeWidth={2} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-base font-extrabold text-blue-900 tracking-tight">Secure Medical Vault</h3>
          <p className="text-[14px] text-blue-700/80 leading-relaxed mt-1 font-medium">
            All personal health information is encrypted and stored securely. This information will only be shared with dive operators in case of an emergency.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Health Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Blood Type Card */}
          <div className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <HeartPulse size={18} className="text-red-500" />
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Blood Type</h4>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-blue-600">
                <Edit3 size={16} />
              </button>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-red-500 font-black text-2xl tracking-tighter">A+</span>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                Your blood group is verified. This information is critical for emergency medical care.
              </p>
            </div>
          </div>

          {/* Allergies & Conditions (Static for Design) */}
          <div className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Allergies</h4>
                <Lock size={12} className="text-slate-300" />
              </div>
              <button className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-600 border border-slate-100">
                <Plus size={14} /> Add New
              </button>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl border bg-red-50/40 border-red-100 text-[13px] font-bold text-red-700">
              <AlertCircle size={16} className="text-red-500" /> Penicillin, Shellfish
            </div>
          </div>
        </div>

        {/* Right Column: Emergency Contacts */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Emergency Contacts</h4>
              <button 
                onClick={() => setShowAddContact(true)}
                className="flex items-center gap-2 bg-[#0077C0] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
              >
                <UserPlus size={14} /> Add
              </button>
            </div>

            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="group bg-slate-50/50 border border-slate-100 rounded-4xl p-6 relative hover:bg-white hover:border-blue-100 transition-all duration-300">
                  <button 
                    onClick={() => setShowEditContact(contact)}
                    className="absolute top-6 right-6 p-2 text-slate-300 group-hover:text-blue-600"
                  >
                    <Edit3 size={14} />
                  </button>
                  <h5 className="text-[15px] font-extrabold text-slate-800">{contact.name}</h5>
                  <p className="text-[11px] font-bold text-blue-600 uppercase tracking-tighter mb-4">{contact.relation}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[12px] font-medium text-slate-600">
                      <Phone size={14} className="text-slate-400" /> {contact.phone}
                    </div>
                    <div className="flex items-center gap-3 text-[12px] font-medium text-slate-600">
                      <Mail size={14} className="text-slate-400" /> <span className="truncate">{contact.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Medical Documents */}
      <div className="mt-12 bg-white border border-slate-200/60 rounded-[3rem] p-10 shadow-sm">
        <h4 className="text-xl font-extrabold text-slate-800 tracking-tight mb-3">Medical Clearance Documents</h4>
        <p className="text-[14px] text-slate-500 mb-8 max-w-3xl leading-relaxed font-medium">Upload medical clearance forms from your physician if required by your certifying agency or dive operator.</p>
        
        <button 
          onClick={() => setShowUploadMedical(true)}
          className="flex items-center gap-2.5 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl text-xs font-bold mb-12 hover:bg-slate-50 transition-all"
        >
          <Upload size={16} /> Upload New Clearance
        </button>

        <div className="border-t border-slate-100 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MapPin size={20} /></div>
            <h5 className="text-base font-extrabold text-slate-800 tracking-tight">Find Dive Physician</h5>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city or zip code..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
              />
            </div>
            <button 
              onClick={handleSearchPhysician}
              className="bg-[#0077C0] text-white px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* ADD CONTACT MODAL */}
      {showAddContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-105 rounded-4xl shadow-2xl p-8 relative animate-in zoom-in-95">
            <button onClick={() => setShowAddContact(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"><X size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Add Contact</h2>
            <p className="text-[14px] text-slate-500 mb-8">Add a new emergency contact. Fill in all the required information.</p>
            <form onSubmit={handleSaveContact} className="space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Name *</label>
                <input type="text" required placeholder="Enter full name" className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none focus:ring-2 focus:ring-blue-100" onChange={e => setContactForm({...contactForm, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Relationship *</label>
                <input type="text" required placeholder="e.g., Spouse, Doctor, Friend" className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none focus:ring-2 focus:ring-blue-100" onChange={e => setContactForm({...contactForm, relation: e.target.value})} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Phone *</label>
                <input type="tel" required placeholder="+1 (555) 123-4567" className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none focus:ring-2 focus:ring-blue-100" onChange={e => setContactForm({...contactForm, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Email *</label>
                <input type="email" required placeholder="contact@email.com" className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none focus:ring-2 focus:ring-blue-100" onChange={e => setContactForm({...contactForm, email: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddContact(false)} className="flex-1 py-3.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600">Cancel</button>
                <button type="submit" className="flex-1 py-3.5 bg-[#0077C0] text-white rounded-xl text-xs font-bold">Add Contact</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CONTACT MODAL */}
      {showEditContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-105 rounded-4xl shadow-2xl p-8 relative animate-in zoom-in-95">
            <button onClick={() => setShowEditContact(null)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"><X size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Edit Contact</h2>
            <p className="text-[14px] text-slate-500 mb-8">Update the contact information below.</p>
            <form onSubmit={handleUpdateContact} className="space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Name *</label>
                <input type="text" value={showEditContact.name} className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none" onChange={e => setShowEditContact({...showEditContact, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Relationship *</label>
                <input type="text" value={showEditContact.relation} className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none" onChange={e => setShowEditContact({...showEditContact, relation: e.target.value})} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Phone *</label>
                <input type="tel" value={showEditContact.phone} className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none" onChange={e => setShowEditContact({...showEditContact, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Email *</label>
                <input type="email" value={showEditContact.email} className="w-full bg-slate-50 rounded-xl px-4 py-3.5 text-sm font-medium outline-none" onChange={e => setShowEditContact({...showEditContact, email: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowEditContact(null)} className="flex-1 py-3.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600">Cancel</button>
                <button type="submit" className="flex-1 py-3.5 bg-[#0077C0] text-white rounded-xl text-xs font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD MEDICAL CLEARANCE MODAL */}
      {showUploadMedical && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-120 rounded-4xl shadow-2xl p-8 relative animate-in zoom-in-95">
            <button onClick={() => setShowUploadMedical(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"><X size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Upload Medical Clearance</h2>
            <div className="border-2 border-dashed border-slate-200 rounded-4xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6"><FileText size={32} /></div>
              <p className="text-[15px] font-bold text-slate-800 mb-2">Drag and drop your file here</p>
              <p className="text-[13px] text-slate-400 mb-8">or</p>
              <button className="bg-[#0077C0] text-white px-8 py-3 rounded-xl text-xs font-bold mb-6">Browse Files</button>
              <p className="text-[11px] text-slate-400">Supported formats: PDF, PNG, JPG (Max 10MB)</p>
            </div>
          </div>
        </div>
      )}

      {/* PHYSICIAN SEARCH RESULTS MODAL */}
      {showPhysicianResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#F8FAFC] w-full max-w-225 my-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 overflow-hidden">
            <div className="bg-white p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setShowPhysicianResults(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><X size={20} /></button>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-800">Dive Physicians near "zurich"</h2>
                  <p className="text-[11px] text-slate-400 font-medium">3 certified dive physicians found</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input type="text" value="zurich" readOnly className="pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium w-64 outline-none" />
                  <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button className="bg-[#0077C0] text-white px-5 py-2 rounded-lg text-xs font-bold">Search</button>
                <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 bg-white"><Filter size={14} /> Filters</button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Dr. Sarah Martinez", specialty: "Dive Medicine Specialist", address: "123 Ocean Drive, Suite 200", location: "Miami, FL • 2.3 miles", phone: "(305) 555-0123", hours: "Mon-Fri: 9:00 AM - 5:00 PM" },
                { name: "Dr. James Chen", specialty: "Hyperbaric & Dive Medicine", address: "456 Coastal Boulevard", location: "Miami Beach, FL • 4.7 miles", phone: "(305) 555-0456", hours: "Mon-Sat: 8:00 AM - 6:00 PM" },
                { name: "Dr. Emily Roberts", specialty: "Sports & Dive Medicine", address: "789 Marina Way, Building C", location: "Coral Gables, FL • 6.1 miles", phone: "(305) 555-0789", hours: "Tue-Fri: 10:00 AM - 4:00 PM" }
              ].map((dr, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-[1.2rem] p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-[14px] font-bold text-slate-800">{dr.name}</h3>
                      <p className="text-[11px] text-slate-400 font-medium">{dr.specialty}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Accepting Patients</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <p className="text-[12px] text-slate-500 font-medium flex gap-3 items-center"><MapPin size={14} /> {dr.address}<br/>{dr.location}</p>
                    <p className="text-[12px] text-slate-500 font-medium flex gap-3 items-center"><Phone size={14} /> {dr.phone}</p>
                    <p className="text-[12px] text-slate-500 font-medium flex gap-3 items-center"><AlertCircle size={14} /> {dr.hours}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#0077C0] text-white py-2.5 rounded-lg text-xs font-bold">Book Appointment</button>
                    <button className="px-4 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-xs font-bold">View Details</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-6 mb-6 p-6 bg-blue-50/50 border border-blue-100/50 rounded-xl">
               <h4 className="text-[13px] font-bold text-blue-900 mb-2">What to expect at your dive medical exam</h4>
               <p className="text-[11px] text-blue-800/70 leading-relaxed font-medium">A dive medical examination typically includes a review of your medical history, physical examination, and may include tests such as lung function tests, ECG, and chest X-ray depending on your age and health status.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}