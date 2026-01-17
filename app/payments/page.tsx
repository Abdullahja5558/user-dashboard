"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Maximize, 
  Lock, 
  CreditCard,
  MoreVertical,
  CheckCircle2,
  X,
  Trash2
} from 'lucide-react';

// --- Types ---
interface Card {
  id: string;
  type: 'Visa' | 'Mastercard' | 'PayPal';
  last4: string;
  name: string;
  expiry: string;
  isDefault: boolean;
  email?: string;
}

export default function PaymentMethodsPage() {
  // --- State ---
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });

  // --- Persistence ---
  useEffect(() => {
    const savedCards = localStorage.getItem('user_payment_methods_v2');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      const initialCards: Card[] = [
        {
          id: '1',
          type: 'Visa',
          last4: '4242',
          name: 'Sarah Martinez',
          expiry: '12/26',
          isDefault: true,
        },
        {
          id: '2',
          type: 'Mastercard',
          last4: '8888',
          name: 'Sarah Martinez',
          expiry: '09/27',
          isDefault: false,
        }
      ];
      setCards(initialCards);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('user_payment_methods_v2', JSON.stringify(cards));
    }
  }, [cards, isLoaded]);

  // --- Handlers ---
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.cardholderName || !formData.expiryDate) return;

    const newCard: Card = {
      id: Date.now().toString(),
      type: formData.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      last4: formData.cardNumber.replace(/\s/g, '').slice(-4),
      name: formData.cardholderName,
      expiry: formData.expiryDate,
      isDefault: cards.length === 0,
    };

    setCards([...cards, newCard]);
    setShowAddModal(false);
    setFormData({ cardNumber: '', cardholderName: '', expiryDate: '', cvv: '' });
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const setAsDefault = (id: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  // --- Input Formatters ---
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) return parts.join(' ');
    return value;
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(/^([2-9])$/g, '0$1')
      .replace(/^(1[3-9])$/g, '0$1')
      .replace(/^([0-1][0-9])([0-9]{2,2}).*/g, '$1/$2')
      .replace(/^(0[1-9]|1[0-2])([0-9]{1,2})$/g, '$1/$2');
  };

  // --- UI Components ---
  const renderCardIcon = (type: string) => {
    if (type === 'Visa') {
      return <div className="w-12 h-8 bg-[#1A1F71] rounded-md flex items-center justify-center text-white text-[10px] font-black italic tracking-tighter shadow-sm">VISA</div>;
    }
    return (
      <div className="w-12 h-8 flex items-center justify-center border border-slate-100 bg-white rounded-md shadow-sm">
        <div className="flex -space-x-2">
          <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
          <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
        </div>
      </div>
    );
  };

  if (!isLoaded) return null;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-white font-light antialiased text-slate-900 selection:bg-blue-100 tracking-tight">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-slate-800">Payment Methods</h1>
        <p className="text-[15px] font-normal text-slate-500 mt-1 leading-relaxed">Manage your saved payment methods for faster bookings</p>
      </header>

      {/* Premium Security Banner */}
      <div className="relative overflow-hidden bg-[#F8FAFC] border border-slate-200 rounded-[2.5rem] p-8 mb-10 shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 shrink-0">
          <ShieldCheck size={26} strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-slate-800 tracking-tight">Bank-grade security</h3>
          <p className="text-[14px] text-slate-500 leading-relaxed mt-1 mb-6 max-w-2xl font-light">
            All payment information is encrypted and securely stored. We use industry-standard security measures and never store your full card details on our servers.
          </p>
          
          <div className="flex items-center gap-4 py-3 px-5 bg-white border border-slate-100 rounded-2xl w-fit shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Trusted By</span>
            <div className="h-4 w-px bg-slate-100" />
            <div className="flex gap-5 items-center">
              <span className="text-[#635BFF] text-lg font-black italic tracking-tighter">stripe</span>
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-[#0070BA] border-2 border-white shadow-sm flex items-center justify-center text-[8px] text-white font-bold italic">P</div>
                <div className="w-6 h-6 rounded-full bg-[#1A1F71] border-2 border-white shadow-sm flex items-center justify-center text-[6px] text-white font-black italic">V</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#0077C0] text-white px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wide shadow-lg shadow-blue-100 hover:bg-blue-600 hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer"
        >
          <Plus size={16} strokeWidth={2} /> Add New Card
        </button>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wide shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
          <Maximize size={16} strokeWidth={1.5} /> Scan Card
        </button>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4 mb-12">
        {cards.map((method) => (
          <div 
            key={method.id} 
            className={`group bg-white border rounded-4xl p-6 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 ${
              method.isDefault ? 'border-blue-200 bg-blue-50/10' : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className="shrink-0">{renderCardIcon(method.type)}</div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-sm font-medium text-slate-800 tracking-tight">
                    {method.type} •••• {method.last4}
                  </h4>
                  {method.isDefault && (
                    <span className="flex items-center gap-1 bg-blue-600 text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest shadow-sm">
                      <CheckCircle2 size={10} /> Default
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] font-normal text-slate-500 uppercase tracking-widest">
                  <p className="font-medium">{method.name}</p>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <p className="italic text-slate-400">Exp: {method.expiry}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-6 md:mt-0">
              {!method.isDefault && (
                <button 
                  onClick={() => setAsDefault(method.id)}
                  className="px-4 py-2 bg-slate-50 text-[11px] font-semibold text-slate-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all tracking-wide cursor-pointer"
                >
                  Set as Default
                </button>
              )}
              <button 
                onClick={() => removeCard(method.id)}
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
                <MoreVertical size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Info Footer */}
      <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
            <Lock size={18} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <h5 className="text-sm font-medium text-slate-800 tracking-tight">Security & Privacy Protocol</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {[
            "End-to-end 256-bit SSL/TLS transaction encryption",
            "Full card numbers are never stored in our database",
            "PCI-DSS Level 1 certified payment processing",
            "Immediate payment method removal & unlinking"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-[13px] font-light text-slate-500">
              <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* --- ADD CARD MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-105 rounded-4xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                   <CreditCard size={20} className="text-slate-800" strokeWidth={1.5} />
                   <h2 className="text-xl font-light text-slate-800 tracking-tight">Add Payment Card</h2>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <p className="text-[14px] font-light text-slate-500 mb-8 leading-relaxed">Enter your card details below. Your information is securely encrypted.</p>

              <form onSubmit={handleAddCard} className="space-y-6">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2 tracking-wide uppercase">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text"
                      required
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all tracking-widest"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})}
                      maxLength={19}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <CreditCard size={18} className="text-slate-300" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2 tracking-wide uppercase">Cardholder Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Sarah Martinez"
                    className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all tracking-tight"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-2 tracking-wide uppercase">Expiry Date</label>
                    <input 
                      type="text"
                      required
                      placeholder="MM / YY"
                      className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all tracking-widest"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: formatExpiry(e.target.value)})}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-2 tracking-wide uppercase">CVV</label>
                    <div className="relative">
                      <input 
                        type="password"
                        required
                        placeholder="•••"
                        maxLength={3}
                        className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all tracking-[0.5em]"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                      />
                      <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-4 flex items-center gap-3 border border-blue-100/50">
                  <div className="bg-blue-500 rounded-lg p-1.5 shrink-0">
                    <Lock size={14} className="text-white" strokeWidth={2} />
                  </div>
                  <p className="text-[12px] font-medium text-blue-700 leading-tight">Your card details are encrypted and secure</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors tracking-wide cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3.5 bg-[#0077C0] text-white rounded-xl text-xs font-semibold tracking-wide hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] cursor-pointer"
                  >
                    Add Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  ); 
}