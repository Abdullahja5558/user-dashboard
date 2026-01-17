"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Bell, 
  Globe, 
  LogOut, 
  Trash2, 
  ChevronDown,
  ChevronUp,
  Smartphone,
  Mail,
  ShieldAlert
} from 'lucide-react';

export default function SettingsPage() {
  // State for toggles with persistence
  const [settings, setSettings] = useState({
    twoFactor: true,
    loginNotifications: true,
    showOnFeeds: true,
    shareEquipment: true,
    emailBooking: true,
    emailBuddy: true,
    emailInsurance: true,
    emailSpecial: false,
    pushUpcoming: true,
    pushCosign: true,
    pushMessages: true,
  });

  // State for dropdowns with persistence
  const [profileVisibility, setProfileVisibility] = useState("Everyone");
  const [logbookVisibility, setLogbookVisibility] = useState("Dive buddies only");
  const [language, setLanguage] = useState("English");
  const [units, setUnits] = useState("Metric");

  // Dropdown UI states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Load persistence
  useEffect(() => {
    const savedSettings = localStorage.getItem('bucceo_settings');
    const savedProfileVis = localStorage.getItem('bucceo_profile_vis');
    const savedLogbookVis = localStorage.getItem('bucceo_logbook_vis');
    
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    if (savedProfileVis) setProfileVisibility(savedProfileVis);
    if (savedLogbookVis) setLogbookVisibility(savedLogbookVis);
  }, []);

  // Save persistence on change
  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('bucceo_settings', JSON.stringify(newSettings));
  };

  const handleSelect = (setter: Function, storageKey: string, value: string) => {
    setter(value);
    localStorage.setItem(storageKey, value);
    setOpenDropdown(null);
  };

  const Toggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-11 h-6 rounded-full relative transition-all duration-300 ease-in-out shadow-inner ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${active ? 'left-6 scale-110' : 'left-1 scale-100'}`} />
    </button>
  );

  const CustomDropdown = ({ label, value, options, storageKey, setter }: any) => {
    const isOpen = openDropdown === label;
    return (
      <div className="relative w-full md:w-64">
        <button 
          onClick={() => setOpenDropdown(isOpen ? null : label)}
          className="w-full flex justify-between items-center px-5 py-3.5 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium text-slate-700 shadow-sm hover:border-blue-200 transition-all active:scale-[0.98] tracking-tight"
        >
          {value}
          {isOpen ? <ChevronUp size={16} className="text-blue-500" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((opt: string) => (
              <div 
                key={opt}
                onClick={() => handleSelect(setter, storageKey, opt)}
                className={`px-5 py-3.5 text-[14px] cursor-pointer transition-colors ${value === opt ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-10 max-w-9xl mx-auto min-h-screen bg-white font-sans antialiased selection:bg-blue-50">
      <header className="mb-12">
        <h1 className="text-4xl font-light text-slate-900 tracking-tight leading-tight">Account Settings</h1>
        <p className="text-[15px] font-normal text-slate-500 mt-2 tracking-wide">Manage your professional account preferences and security protocols</p>
      </header>

      {/* Safety & Security */}
      <section className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm mb-8 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 bg-blue-50 rounded-xl">
            <ShieldCheck className="text-blue-600" size={20} strokeWidth={1.5} />
          </div>
          <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.25em]">Safety & Security</h2>
        </div>
        <div className="space-y-10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight">Two-Factor Authentication</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Add an extra layer of security to your profile</p>
            </div>
            <div className="flex items-center gap-5">
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${settings.twoFactor ? 'text-emerald-500' : 'text-slate-300'}`}>
                {settings.twoFactor ? 'Protected' : 'Off'}
              </span>
              <Toggle active={settings.twoFactor} onClick={() => handleToggle('twoFactor')} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight">SMS Authentication</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Receive dynamic security codes via text</p>
            </div>
            <button className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-wider">Configure</button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight">Login Notifications</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Instant alerts when your account is accessed</p>
            </div>
            <Toggle active={settings.loginNotifications} onClick={() => handleToggle('loginNotifications')} />
          </div>
          <button className="flex items-center gap-2.5 text-[11px] font-bold text-blue-600 bg-blue-50 px-6 py-3 rounded-xl mt-2 hover:bg-blue-100 transition-all active:scale-95 uppercase tracking-widest">
            <Lock size={14} /> Change Password
          </button>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <Eye className="text-indigo-600" size={20} strokeWidth={1.5} />
          </div>
          <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.25em]">Privacy Controls</h2>
        </div>
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight">Profile Visibility</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Control who can discover your diving statistics</p>
            </div>
            <CustomDropdown 
              label="profile" 
              value={profileVisibility} 
              options={["Everyone", "Friends Only", "Private"]}
              setter={setProfileVisibility}
              storageKey="bucceo_profile_vis"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight">Logbook Visibility</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Manage access to your personal dive records</p>
            </div>
            <CustomDropdown 
              label="logbook" 
              value={logbookVisibility} 
              options={["Dive buddies only", "Everyone", "Private"]}
              setter={setLogbookVisibility}
              storageKey="bucceo_logbook_vis"
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight text-left">Show on Dive Site Feeds</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Appear in the "Recently Here" list for dive sites</p>
            </div>
            <Toggle active={settings.showOnFeeds} onClick={() => handleToggle('showOnFeeds')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight text-left">Share Equipment Info</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Provide dive centers with your rental preferences</p>
            </div>
            <Toggle active={settings.shareEquipment} onClick={() => handleToggle('shareEquipment')} />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 bg-amber-50 rounded-xl">
            <Bell className="text-amber-600" size={20} strokeWidth={1.5} />
          </div>
          <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.25em]">Preferences</h2>
        </div>
        <div className="space-y-12">
          <div>
            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Mail size={12}/> Email Communication
            </h3>
            <div className="space-y-8">
              {[
                { label: "Booking confirmations", key: "emailBooking" },
                { label: "Dive buddy requests", key: "emailBuddy" },
                { label: "Insurance expiration reminders", key: "emailInsurance" },
                { label: "Special offers and promotions", key: "emailSpecial" }
              ].map((item) => (
                <div key={item.key} className="flex justify-between items-center px-2">
                  <span className="text-[14px] font-normal text-slate-600 tracking-tight">{item.label}</span>
                  <Toggle active={(settings as any)[item.key]} onClick={() => handleToggle(item.key as any)} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Smartphone size={12}/> App Notifications
            </h3>
            <div className="space-y-8">
              {[
                { label: "Upcoming dive reminders", key: "pushUpcoming" },
                { label: "Co-sign requests", key: "pushCosign" },
                { label: "New messages", key: "pushMessages" }
              ].map((item) => (
                <div key={item.key} className="flex justify-between items-center px-2">
                  <span className="text-[14px] font-normal text-slate-600 tracking-tight">{item.label}</span>
                  <Toggle active={(settings as any)[item.key]} onClick={() => handleToggle(item.key as any)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Language & Region */}
      <section className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 bg-cyan-50 rounded-xl">
            <Globe className="text-cyan-600" size={20} strokeWidth={1.5} />
          </div>
          <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.25em]">Localization</h2>
        </div>
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight">System Language</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Interface and communication language</p>
            </div>
            <CustomDropdown label="lang" value={language} options={["English", "Spanish", "French"]} setter={setLanguage} storageKey="bucceo_lang" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <p className="text-[15px] font-medium text-slate-800 tracking-tight">Measurement Standard</p>
              <p className="text-[13px] font-light text-slate-400 mt-1">Units for depth, pressure, and temperature</p>
            </div>
            <CustomDropdown label="units" value={units} options={["Metric", "Imperial"]} setter={setUnits} storageKey="bucceo_units" />
          </div>
        </div>
      </section>

      {/* Account Actions */}
      <div className="space-y-5 mt-16 pb-16 max-w-2xl mx-auto">
        <button className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-3xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.99] shadow-sm uppercase tracking-widest">
          <LogOut size={18} strokeWidth={1.5} /> Log Out
        </button>
        <button className="w-full group flex items-center justify-center gap-3 px-8 py-5 bg-white border border-red-100 rounded-3xl text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all active:scale-[0.99] shadow-sm uppercase tracking-widest">
          <Trash2 size={18} strokeWidth={1.5} className="group-hover:rotate-6 transition-transform" /> Delete My Account
        </button>
        <div className="flex items-start gap-3 mt-6 px-6">
          <ShieldAlert size={16} className="text-slate-300 shrink-0 mt-0.5" />
          <p className="text-[12px] font-light text-slate-400 leading-relaxed text-left tracking-wide">
            Permanently removing your account will erase all logbook history and active certificates. This action is irreversible.
          </p>
        </div>
      </div>
    </div>
  );
}