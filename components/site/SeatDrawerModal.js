'use client';

import { useState } from 'react';

export default function SeatDrawerModal({ isOpen = false, onClose }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const isSelected = (seatId) => selectedSeats.includes(seatId);

  const handleClose = () => {
    const modal = document.getElementById('seatDrawerModal');
    if (modal) modal.classList.add('hidden');
    if (onClose) onClose();
  };

  return (
    <div
      id="seatDrawerModal"
      className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end transition-all ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Select Your Berths</h3>
            <p className="text-xs text-slate-500">Nagpur ⇄ Pune • BharatBenz AC Sleeper (2+1)</p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div className="py-4 flex-1 space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded border border-slate-300 bg-white inline-block"></span> Available
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block"></span> Selected
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-pink-500 inline-block"></span> Female
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 inline-block"></span> Booked
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Lower Deck Berths</h4>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => toggleSeat('L1')}
                className={`p-3 rounded-xl border ${
                  isSelected('L1') ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 bg-white text-slate-800'
                } text-xs font-bold text-center hover:border-brand-scarlet transition-all`}
              >
                L1 (Window)
              </button>
              <button type="button" disabled className="p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 text-xs font-bold text-center cursor-not-allowed">
                L2 (Booked)
              </button>
              <button
                type="button"
                onClick={() => toggleSeat('L3')}
                className={`p-3 rounded-xl border ${
                  isSelected('L3') ? 'bg-emerald-500 text-white border-emerald-500' : 'border-pink-200 bg-pink-50 text-pink-700'
                } text-xs font-bold text-center transition-all`}
              >
                L3 (Female)
              </button>
              <button
                type="button"
                onClick={() => toggleSeat('L4')}
                className={`p-3 rounded-xl border ${
                  isSelected('L4') ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 bg-white text-slate-800'
                } text-xs font-bold text-center hover:border-brand-scarlet transition-all`}
              >
                L4 (Single)
              </button>
              <button
                type="button"
                onClick={() => toggleSeat('L5')}
                className={`p-3 rounded-xl border ${
                  isSelected('L5') ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 bg-white text-slate-800'
                } text-xs font-bold text-center hover:border-brand-scarlet transition-all`}
              >
                L5 (Single)
              </button>
              <button type="button" disabled className="p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 text-xs font-bold text-center cursor-not-allowed">
                L6 (Booked)
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Upper Deck Berths</h4>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => toggleSeat('U1')}
                className={`p-3 rounded-xl border ${
                  isSelected('U1') ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 bg-white text-slate-800'
                } text-xs font-bold text-center hover:border-brand-scarlet transition-all`}
              >
                U1 (Window)
              </button>
              <button
                type="button"
                onClick={() => toggleSeat('U2')}
                className={`p-3 rounded-xl border ${
                  isSelected('U2') ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 bg-white text-slate-800'
                } text-xs font-bold text-center hover:border-brand-scarlet transition-all`}
              >
                U2 (Window)
              </button>
              <button
                type="button"
                onClick={() => toggleSeat('U3')}
                className={`p-3 rounded-xl border ${
                  isSelected('U3') ? 'bg-emerald-500 text-white border-emerald-500' : 'border-pink-200 bg-pink-50 text-pink-700'
                } text-xs font-bold text-center transition-all`}
              >
                U3 (Female)
              </button>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3 text-sm font-bold">
            <span className="text-slate-600">Base Fare (0% Markup)</span>
            <span className="text-brand-scarlet text-lg">₹{selectedSeats.length > 0 ? selectedSeats.length * 850 : 850}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              alert(`Berth(s) ${selectedSeats.length ? selectedSeats.join(', ') : 'L1'} reserved! Proceeding to passenger checkout.`);
              handleClose();
            }}
            className="w-full py-3 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md"
          >
            Confirm Selected Berths ({selectedSeats.length || 1})
          </button>
        </div>
      </div>
    </div>
  );
}
