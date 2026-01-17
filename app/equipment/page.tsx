"use client";

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Info, 
  Edit3, 
  X, 
  ArrowLeft 
} from 'lucide-react';

interface EquipmentItem {
  id: string;
  name: string;
  size: string;
  eu: string;
  us: string;
  note: string;
}

interface Section {
  title: string;
  count: string;
  items?: EquipmentItem[];
}

export default function EquipmentPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  // Track only the index of the currently open section; null means all are closed.
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
  
  const [sections, setSections] = useState<Section[]>([
    { 
      title: "Wetsuits & Drysuits", 
      count: "2 items", 
      items: [
        { id: "w-1", name: "5mm Full Wetsuit", size: "M", eu: "EU 48", us: "US M", note: "Standard 5mm neoprene" },
        { id: "w-2", name: "3mm Shorty Wetsuit", size: "M", eu: "EU 48", us: "US M", note: "Tropical water shorty" }
      ]
    },
    { title: "Fins", count: "1 item", items: [{ id: "f-1", name: "Split Fins", size: "L", eu: "EU 44", us: "US 10", note: "Open heel fins" }] },
    { title: "Masks & Snorkels", count: "1 item", items: [{ id: "m-1", name: "Frameless Mask", size: "OS", eu: "N/A", us: "N/A", note: "Black silicone" }] },
    { title: "BCDs", count: "1 item", items: [{ id: "b-1", name: "Back-inflate BCD", size: "M", eu: "EU 48", us: "US M", note: "Travel lightweight" }] },
    { title: "Regulators", count: "1 item", items: [{ id: "r-1", name: "Sealed 1st Stage", size: "DIN", eu: "N/A", us: "N/A", note: "Cold water rated" }] },
    { title: "Dive Computers", count: "1 item", items: [{ id: "d-1", name: "OLED Computer", size: "Wrist", eu: "N/A", us: "N/A", note: "Bluetooth sync enabled" }] },
    { title: "Accessories", count: "2 items", items: [
        { id: "a-1", name: "SMB & Spool", size: "15m", eu: "N/A", us: "N/A", note: "High-viz orange" },
        { id: "a-2", name: "Dive Knife", size: "Small", eu: "N/A", us: "N/A", note: "Titanium blade" }
    ]},
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<{secIdx: number, itemIdx: number} | null>(null);
  const [formData, setFormData] = useState<EquipmentItem>({ id: "", name: "", size: "", eu: "", us: "", note: "" });

  // Persistence: Load data on mount. Sections always start closed (openSectionIndex is null).
  useEffect(() => {
    const savedData = localStorage.getItem('diveEquipmentData');
    if (savedData) {
      setSections(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  // Persistence: Save data whenever sections change.
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('diveEquipmentData', JSON.stringify(sections));
    }
  }, [sections, isLoaded]);

  // Exclusive Accordion Logic: Clicking a header closes others and opens the selected one.
  const toggleSection = (idx: number) => {
    setOpenSectionIndex(prevIndex => (prevIndex === idx ? null : idx));
  };

  const openEditModal = (secIdx: number, itemIdx: number) => {
    const item = sections[secIdx].items![itemIdx];
    setFormData({ ...item });
    setCurrentItem({ secIdx, itemIdx });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (currentItem !== null) {
      const newSections = [...sections];
      newSections[currentItem.secIdx].items![currentItem.itemIdx] = formData;
      setSections(newSections);
      setIsEditModalOpen(false);
    }
  };

  const updateNote = (secIdx: number, itemIdx: number, newNote: string) => {
    const newSections = [...sections];
    newSections[secIdx].items![itemIdx].note = newNote;
    setSections(newSections);
  };

  if (!isLoaded) return null;

  return (
    <div className="p-6 md:p-10 max-w-8xl mx-auto bg-white min-h-screen font-sans antialiased text-slate-900">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">Equipment</h1>
        <p className="text-base font-medium text-slate-500 mt-2">Manage your diving gear and equipment preferences</p>
      </header>

      <div className="space-y-5">
        {sections.map((sec, secIdx) => {
          const isOpen = openSectionIndex === secIdx;
          return (
            <div key={secIdx} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
              {/* Accordion Header */}
              <div 
                onClick={() => toggleSection(secIdx)}
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
              >
                <div className="flex items-center gap-5">
                  <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
                    {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                  <span className="text-lg font-bold text-slate-700">{sec.title}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-extrabold uppercase tracking-wider border border-blue-100/50">
                    {sec.count}
                  </span>
                </div>
                <button 
                  onClick={(e) => e.stopPropagation()} 
                  className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer" 
                >
                  <Plus size={16} strokeWidth={3} /> Add Item
                </button>
              </div>

              {/* Accordion Content */}
              {isOpen && sec.items && (
                <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-300">
                  {sec.items.map((item, itemIdx) => (
                    <div key={item.id} className="border border-slate-100 rounded-3xl p-8 relative bg-linear-to-br from-white to-slate-50/40 shadow-sm hover:shadow-md transition-shadow">
                      <button 
                        onClick={() => openEditModal(secIdx, itemIdx)}
                        className="absolute top-6 right-6 text-xs font-bold border border-slate-200 px-5 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2 bg-white cursor-pointer"
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                      
                      <h4 className="text-lg font-extrabold text-slate-800 mb-6">{item.name}</h4>
                      
                      <div className="flex items-center gap-10">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Size</p>
                          <p className="text-sm font-bold text-slate-700 mt-1.5">{item.size}</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">EU Size</p>
                          <p className="text-sm font-bold text-slate-700 mt-1.5">{item.eu}</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">US Size</p>
                          <p className="text-sm font-bold text-slate-700 mt-1.5">{item.us}</p>
                        </div>
                      </div>

                      {/* Editable Note Input Area */}
                      <div className="mt-6 pt-6 border-t border-slate-100">
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-3">Equipment Note</p>
                         <div className="relative group">
                            <input 
                              type="text"
                              value={item.note}
                              onChange={(e) => updateNote(secIdx, itemIdx, e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 focus:ring-2 focus:ring-blue-100 focus:border-blue-200 focus:outline-none shadow-inner transition-all"
                              placeholder="Add a custom note..."
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-blue-300 transition-colors">
                               <Edit3 size={12} />
                            </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Footer */}
      <div className="mt-14 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-4xl p-10 flex flex-col sm:flex-row gap-8 shadow-sm">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
          <Info size={28} className="text-blue-500" />
        </div>
        <div>
          <h5 className="text-lg font-extrabold text-blue-900 tracking-tight">Why add your equipment?</h5>
          <p className="text-base text-blue-700/80 leading-relaxed mt-2 font-medium max-w-4xl">
            Adding your equipment helps dive centers prepare the right gear for your trips. 
            Your size preferences will be shared when you make a booking, ensuring a perfect fit every time.
          </p>
        </div>
      </div>

      {/* --- EDIT MODAL POPUP --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center px-8 py-6 border-b border-slate-100">
              <button onClick={() => setIsEditModalOpen(false)} className="mr-4 p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
                <ArrowLeft size={20} className="text-slate-600" />
              </button>
              <h2 className="text-xl font-bold text-slate-800">Edit Product Details</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="ml-auto p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-10 bg-slate-50/50">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-400 uppercase tracking-widest">Product Name</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {(['size', 'eu', 'us'] as const).map((field) => (
                    <div key={field} className="space-y-2">
                      <label className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                        {field === 'size' ? 'General' : field.toUpperCase()} Size
                      </label>
                      <input 
                        type="text"
                        value={formData[field]}
                        onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 px-10 py-6 border-t border-slate-100 bg-white">
              <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-3.5 rounded-xl text-sm font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSave} className="px-10 py-3.5 bg-blue-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-95 cursor-pointer">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}