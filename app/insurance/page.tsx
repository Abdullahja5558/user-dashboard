"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Maximize, 
  Upload, 
  AlertTriangle, 
  ShieldAlert,
  Info,
  X,
  ArrowLeft,
  Camera,
  Calendar,
  Printer,
  Download,
  RotateCcw
} from 'lucide-react';

// --- Types ---
interface Policy {
  id: string;
  provider: string;
  type: string;
  policyNumber: string;
  validFrom: string;
  validUntil: string;
  issueDate?: string;
  certificateNumber?: string;
  coverage: string;
  status: "Active" | "Expiring Soon" | "Expired";
  statusColor: string;
  warning?: string;
}

const InsurancePage = () => {
  // --- State ---
  const [activePolicies, setActivePolicies] = useState<Policy[]>([]);
  const [expiredPolicies, setExpiredPolicies] = useState<Policy[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modals
  const [showScanModal, setShowScanModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Selected Data
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [editFormData, setEditFormData] = useState<Policy | null>(null);

  // --- Persistence ---
  useEffect(() => {
    const savedActive = localStorage.getItem('active_policies');
    const savedExpired = localStorage.getItem('expired_policies');

    if (savedActive && savedExpired) {
      setActivePolicies(JSON.parse(savedActive));
      setExpiredPolicies(JSON.parse(savedExpired));
    } else {
      // Initial Data
      const initialActive: Policy[] = [
        {
          id: "1",
          provider: "DAN (Divers Alert Network)",
          type: "Dive Accident Insurance",
          policyNumber: "DAN-2024-8472910",
          validFrom: "January 1, 2025",
          validUntil: "December 31, 2025",
          issueDate: "December 15, 2024",
          certificateNumber: "CERT-9372510",
          coverage: "Worldwide coverage up to $500,000",
          status: "Active",
          statusColor: "bg-green-50 text-green-600 border-green-100"
        },
        {
          id: "2",
          provider: "World Nomads",
          type: "Travel Insurance",
          policyNumber: "WN-2025-847201",
          validFrom: "March 1, 2025",
          validUntil: "March 31, 2025",
          coverage: "Medical, trip cancellation, and equipment",
          status: "Expiring Soon",
          statusColor: "bg-orange-50 text-orange-600 border-orange-100",
          warning: "This policy will expire on March 31, 2025. Consider renewing to maintain coverage."
        }
      ];
      const initialExpired: Policy[] = [
        {
          id: "3",
          provider: "DAN Europe",
          type: "Dive Accident Insurance",
          policyNumber: "DANE-2023-729184",
          validFrom: "January 1, 2024",
          validUntil: "December 31, 2024",
          coverage: "Standard Dive Coverage",
          status: "Expired",
          statusColor: "bg-red-50 text-red-600 border-red-100"
        }
      ];
      setActivePolicies(initialActive);
      setExpiredPolicies(initialExpired);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('active_policies', JSON.stringify(activePolicies));
      localStorage.setItem('expired_policies', JSON.stringify(expiredPolicies));
    }
  }, [activePolicies, expiredPolicies, isLoaded]);

  // --- Handlers ---
  const handleEditClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setEditFormData({ ...policy });
    setShowViewModal(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;
    
    const updateList = (list: Policy[]) => 
      list.map(p => p.id === editFormData.id ? editFormData : p);

    setActivePolicies(updateList(activePolicies));
    setExpiredPolicies(updateList(expiredPolicies));
    
    setShowEditModal(false);
    setSelectedPolicy(editFormData);
    setShowViewModal(true);
  };

  if (!isLoaded) return null;

  return (
    <div className="p-6 md:p-10 max-w-8xl mx-auto bg-white min-h-screen font-sans antialiased selection:bg-blue-100">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-light text-slate-800 tracking-tight leading-tight">Insurance</h1>
        <p className="text-[15px] font-normal text-slate-500 mt-1 tracking-wide">Manage your diving and travel insurance policies</p>
      </header>

      {/* Top Actions */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button 
          onClick={() => setShowScanModal(true)}
          className="flex items-center gap-2.5 bg-[#0077C0] text-white px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-blue-200/50 hover:bg-blue-600 transition-all active:scale-95 cursor-pointer"
        >
          <Maximize size={16} /> Scan Insurance Document
        </button>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2.5 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
        >
          <Upload size={16} /> Upload Insurance Document
        </button>
      </div>

      {/* Active Policies */}
      <section className="mb-12">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Active Policies</h2>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {activePolicies.map((policy) => (
            <div key={policy.id} className="bg-white border border-slate-100 rounded-3xl shadow-2xl hover:shadow-md transition-shadow p-8 relative group">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner">
                    <ShieldCheck size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 text-lg tracking-tight">{policy.provider}</h3>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{policy.type}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${policy.statusColor}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${policy.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
                  {policy.status}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-[0.2em]">Policy Number</p>
                  <p className="text-[14px] font-medium text-slate-700 mt-1 tracking-wide">{policy.policyNumber}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-[0.2em]">Valid From</p>
                  <p className="text-[14px] font-medium text-slate-700 mt-1 tracking-wide">{policy.validFrom}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-[0.2em]">Valid Until</p>
                  <p className="text-[14px] font-medium text-slate-700 mt-1 tracking-wide">{policy.validUntil}</p>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-2xl p-6 mb-8 border border-slate-100/50">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-2">Coverage Details</p>
                <p className="text-[14px] font-normal text-slate-600 leading-relaxed tracking-wide">{policy.coverage}</p>
              </div>

              {policy.warning && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex gap-4 mb-8 items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <AlertTriangle size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-orange-900 uppercase tracking-widest">Policy Alert</p>
                    <p className="text-[13px] font-normal text-orange-800/80 mt-0.5 tracking-wide">{policy.warning}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button 
                  onClick={() => { setSelectedPolicy(policy); setShowViewModal(true); }}
                  className="flex-1 px-5 py-3.5 bg-slate-800 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 active:scale-[0.98] cursor-pointer"
                >
                  View Document
                </button>
                <button 
                  onClick={() => handleEditClick(policy)}
                  className="px-6 py-3.5 border border-slate-200 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-50 transition-colors active:scale-[0.98] cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expired Policies */}
      <section className="mb-12">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Expired Policies</h2>
        <div className="space-y-4">
          {expiredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <ShieldAlert size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 text-[15px] tracking-tight">{policy.provider}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{policy.type}</p>
                  </div>
               </div>
               <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Policy No.</p>
                    <p className="text-[13px] font-medium text-slate-700 tracking-wide">{policy.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Expired On</p>
                    <p className="text-[13px] font-medium text-slate-700 tracking-wide">{policy.validUntil}</p>
                  </div>
                  <div className="hidden md:block">
                    <button 
                      onClick={() => { setSelectedPolicy(policy); setShowViewModal(true); }}
                      className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
                    >
                      Archive
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1. SCAN MODAL */}
      {showScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="p-8">
               <div className="flex justify-between items-center mb-2">
                 <h2 className="text-2xl font-light text-slate-800 tracking-tight">Scan Insurance Document</h2>
                 <button onClick={() => setShowScanModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={20}/></button>
               </div>
               <p className="text-[15px] font-normal text-slate-400 mb-8 tracking-wide">Upload or scan your insurance documents for processing</p>

               <div className="border border-dashed border-slate-200 bg-slate-50/50 rounded-[2.5rem] p-16 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100/50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <Upload size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 tracking-tight">Upload Your Documents</h3>
                  <p className="text-[15px] font-normal text-slate-400 mt-2 mb-8 tracking-wide">Drag and drop files here, or click to browse</p>
                  
                  <div className="flex gap-4">
                    <button className="bg-[#0077C0] text-white px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer">
                      <Upload size={14} /> Choose Files
                    </button>
                    <button className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer">
                      <Camera size={14} /> Take Photo
                    </button>
                  </div>
                  <p className="text-[10px] font-bold text-slate-300 mt-10 uppercase tracking-[0.2em]">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative">
            <div className="p-8">
               <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-light text-slate-800 tracking-tight">Upload Document</h2>
                 <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={20}/></button>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5">Document Type</label>
                    <select className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 appearance-none">
                      <option>Select document type</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5">Policy Number</label>
                    <input placeholder="Enter your policy number" className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-sm font-medium text-slate-700 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-100 tracking-wide" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5">Upload File</label>
                    <div className="border border-slate-200 bg-slate-50 rounded-3xl p-10 flex flex-col items-center border-dashed">
                       <Upload size={32} strokeWidth={1} className="text-slate-300 mb-4" />
                       <p className="text-[14px] font-medium text-slate-600 tracking-tight">Drag and drop your file here, or</p>
                       <button className="mt-4 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-700 shadow-sm active:scale-95 transition-all">Browse Files</button>
                       <p className="text-[10px] text-slate-300 font-bold mt-6 uppercase tracking-widest">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>
               </div>

               <div className="flex justify-end gap-3 mt-10">
                 <button onClick={() => setShowUploadModal(false)} className="px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 border border-slate-100 active:scale-95 transition-all cursor-pointer">Cancel</button>
                 <button className="px-8 py-3.5 bg-blue-400 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all cursor-pointer">Upload Document</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. VIEW DOCUMENT MODAL */}
      {showViewModal && selectedPolicy && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
            {/* Toolbar */}
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur sticky top-0 z-10">
               <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Insurance Policy Document</h3>
               <div className="flex items-center gap-3">
                 <button className="p-2.5 hover:bg-slate-50 rounded-full text-slate-400 transition-colors cursor-pointer"><Printer size={18}/></button>
                 <button className="p-2.5 hover:bg-slate-50 rounded-full text-slate-400 transition-colors cursor-pointer"><Download size={18}/></button>
                 <button onClick={() => setShowViewModal(false)} className="p-2.5 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"><X size={18}/></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
               <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -mr-10 -mt-10" />
                  
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <ShieldCheck size={32} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em]">Certificate of Insurance</h4>
                  <p className="text-xl font-light text-slate-800 mt-3 tracking-tight">{selectedPolicy.provider}</p>
                  <p className="text-[12px] font-medium text-slate-400 uppercase tracking-widest mt-1">{selectedPolicy.type}</p>

                  <div className="mt-12 text-left">
                     <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] border-b border-slate-100 pb-3 mb-8">Policy Information</h5>
                     <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Policy Number</p>
                           <p className="text-[15px] font-medium text-slate-700 mt-1.5 tracking-wide">{selectedPolicy.policyNumber}</p>
                        </div>
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Status</p>
                           <p className="text-[15px] font-medium text-green-500 mt-1.5 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-green-500 rounded-full"/> {selectedPolicy.status}
                           </p>
                        </div>
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Effective Date</p>
                           <p className="text-[15px] font-medium text-slate-700 mt-1.5 tracking-wide">{selectedPolicy.validFrom}</p>
                        </div>
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Expiration Date</p>
                           <p className="text-[15px] font-medium text-slate-700 mt-1.5 tracking-wide">{selectedPolicy.validUntil}</p>
                        </div>
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Issue Date</p>
                           <p className="text-[15px] font-medium text-slate-700 mt-1.5 tracking-wide">{selectedPolicy.issueDate || "N/A"}</p>
                        </div>
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Certificate Number</p>
                           <p className="text-[15px] font-medium text-slate-700 mt-1.5 tracking-wide">{selectedPolicy.certificateNumber || "N/A"}</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 text-left bg-blue-50/50 rounded-4xl p-8 border border-blue-100/50">
                    <p className="text-[9px] font-bold text-blue-900 uppercase tracking-[0.3em] mb-3">Coverage Details</p>
                    <p className="text-[15px] font-medium text-slate-700 tracking-tight leading-snug">{selectedPolicy.coverage}</p>
                    <p className="text-[13px] text-slate-500 mt-3 leading-relaxed font-normal tracking-wide">This policy provides comprehensive dive accident insurance coverage for recreational and professional diving activities.</p>
                  </div>

                  <div className="mt-16 pt-12 border-t border-slate-100 flex justify-between items-end">
                    <div className="text-left">
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Authorized Signature</p>
                       <div className="h-px bg-slate-200 w-48 my-5" />
                       <p className="text-[13px] font-medium text-slate-600 tracking-wide">DAN Insurance Services</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Issue Date</p>
                       <p className="text-[14px] font-medium text-slate-800 mt-1.5 tracking-wide">{selectedPolicy.issueDate || "N/A"}</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="p-8 bg-white border-t border-slate-50 flex justify-end gap-4">
               <button onClick={() => setShowViewModal(false)} className="px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 border border-slate-100 transition-all active:scale-95">Close</button>
               <button onClick={() => handleEditClick(selectedPolicy)} className="px-10 py-3.5 bg-[#0077C0] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-95">Edit Details</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. EDIT MODAL */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
               <div className="flex items-center gap-4">
                 <button onClick={() => { setShowEditModal(false); setShowViewModal(true); }} className="p-2.5 hover:bg-slate-50 rounded-full text-slate-800 transition-colors cursor-pointer"><ArrowLeft size={20}/></button>
                 <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] cursor-pointer">Edit Policy Document</h3>
               </div>
               <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-all active:scale-95 cursor-pointer"><RotateCcw size={14}/> Reset</button>
                 <button onClick={handleSaveEdit} className="flex items-center gap-2.5 bg-[#0077C0] text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all cursor-pointer"><ShieldCheck size={14}/> Save Changes</button>
                 <button onClick={() => setShowEditModal(false)} className="p-2.5 hover:bg-slate-50 rounded-full text-slate-400 ml-2 transition-colors cursor-pointer"><X size={20}/></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 bg-slate-50/20">
               <div className="text-center mb-12">
                  <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <ShieldCheck size={28} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Certificate of Insurance</h4>
                  <p className="text-lg font-light text-slate-500 mt-2 tracking-tight">{editFormData.provider}</p>
               </div>

               <div className="space-y-12">
                  {/* Policy Info Section */}
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 border-b border-slate-100 pb-3">Policy Information</h5>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Policy Number</label>
                        <input 
                          value={editFormData.policyNumber}
                          onChange={(e) => setEditFormData({...editFormData, policyNumber: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 tracking-wide transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                        <input 
                          value={editFormData.status}
                          readOnly
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-[14px] font-medium text-slate-400 cursor-not-allowed tracking-wide"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Effective Date</label>
                        <input 
                          value={editFormData.validFrom}
                          onChange={(e) => setEditFormData({...editFormData, validFrom: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 tracking-wide transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Expiration Date</label>
                        <input 
                          value={editFormData.validUntil}
                          onChange={(e) => setEditFormData({...editFormData, validUntil: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-[14px] font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 tracking-wide transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coverage Details Section */}
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 border-b border-slate-100 pb-3">Coverage Details</h5>
                    <div className="bg-blue-50/50 rounded-4xl p-8 border border-blue-100/50 space-y-5">
                      <div className="space-y-2">
                         <p className="text-[9px] font-bold text-blue-900 uppercase tracking-widest ml-1">Worldwide coverage</p>
                         <input 
                          value={editFormData.coverage}
                          onChange={(e) => setEditFormData({...editFormData, coverage: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-[15px] font-medium text-slate-700 outline-none tracking-tight leading-snug transition-all"
                        />
                      </div>
                      <p className="text-[13px] font-normal text-slate-500 italic leading-relaxed tracking-wide">This policy provides comprehensive dive accident insurance coverage for recreational and professional diving activities.</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="p-10 bg-white border-t border-slate-50 text-center">
               <p className="text-[11px] font-medium text-slate-400 tracking-wide italic">Note: Changes made here are for demonstration purposes. Click "Save Changes" to sync your edits.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Box */}
      <div className="bg-[#EBF5FF]/50 border border-blue-100 rounded-[2.5rem] p-10 flex gap-8 items-center shadow-sm">
        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-500 shadow-sm shrink-0 border border-blue-50">
          <Info size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h5 className="text-xl font-light text-blue-900 tracking-tight leading-tight">Why maintain dive insurance?</h5>
          <p className="text-[15px] text-blue-700/70 leading-relaxed mt-2 font-normal tracking-wide">
            Dive insurance is essential for your safety. Many dive centers require proof of valid insurance before allowing you to dive. 
            Keep your policies up to date and easily accessible for all your underwater adventures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;