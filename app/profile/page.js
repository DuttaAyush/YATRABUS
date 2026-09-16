'use client';

import React, { useState } from 'react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function CustomerProfilePage() {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past' | 'wallet' | 'passengers'
  const [selectedTrackBus, setSelectedTrackBus] = useState(null);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);

  const upcomingTrips = [
    {
      id: 'YB-994821',
      operator: 'VRL Travels & Logistics',
      busType: 'Volvo B11R Multi-Axle AC Sleeper (2+1)',
      busPlate: 'MH-12-QZ-8812',
      from: 'Nagpur',
      fromStation: 'Dharampeth YatraBus Terminal',
      depTime: '20:30',
      depDate: 'Tomorrow, 24 Oct',
      to: 'Pune',
      toStation: 'Swargate Express Terminal',
      arrTime: '07:00',
      arrDate: 'Friday, 25 Oct',
      seats: ['3A', '3B'],
      passengerCount: 2,
      totalFare: 1273,
      driverName: 'Sunil Sharma',
      driverPhone: '+91 98220 11223',
      currentLocation: 'Samruddhi Mahamarg (Km 142)',
      speed: '78 km/h',
      nextStop: 'Jalna Rest Stop (ETA 22:45)',
    },
    {
      id: 'YB-883102',
      operator: 'Hans Travels Devsthan Express',
      busType: 'BharatBenz 2+1 AC Sleeper',
      busPlate: 'UK-07-PA-1008',
      from: 'Delhi',
      fromStation: 'Majnu Ka Tilla Gate 3',
      depTime: '06:00',
      depDate: '15 Nov 2026',
      to: 'Haridwar',
      toStation: 'Har Ki Pauri Yatra Stand',
      arrTime: '11:30',
      arrDate: '15 Nov 2026',
      seats: ['L4'],
      passengerCount: 1,
      totalFare: 850,
      driverName: 'Rajinder Singh',
      driverPhone: '+91 98110 44556',
      currentLocation: 'Delhi Terminal (Scheduled)',
      speed: '0 km/h',
      nextStop: 'Departure in 6 Days',
    },
  ];

  const pastTrips = [
    {
      id: 'YB-772019',
      operator: 'Purple Metrolink Luxury Lines',
      from: 'Pune',
      to: 'Mumbai',
      date: '12 Sep 2026',
      seats: '2C, 2D',
      fare: '₹945',
      status: 'Completed',
    },
    {
      id: 'YB-661094',
      operator: 'YatraBus Coastal Tours',
      from: 'Mumbai',
      to: 'Goa (Calangute)',
      date: '04 Aug 2026',
      seats: 'L1',
      fare: '₹6,999',
      status: 'Completed',
    },
  ];

  const savedPassengers = [
    { id: 1, name: 'Rajesh Patel', age: 34, gender: 'Male', relation: 'Self / Primary' },
    { id: 2, name: 'Sneha Patel', age: 31, gender: 'Female', relation: 'Spouse' },
    { id: 3, name: 'Aarav Patel', age: 8, gender: 'Male', relation: 'Son' },
  ];

  const openGpsTracker = (trip) => {
    setSelectedTrackBus(trip);
    setIsGpsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* USER PROFILE HEADER CARD */}
      <div className="bg-white border-b border-slate-200/90 py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* USER INFO */}
          <div className="flex items-center gap-4">
            <img
              src="/images/avatar.png"
              alt="Rajesh Patel Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-red-500/20 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Rajesh Patel</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold border border-amber-200 flex items-center gap-1">
                  ⭐ VIP Club Member
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">rajesh.patel@gmail.com • +91 98765 43210</p>
              <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>Verified YatraBus Account (Assigned Plate Priority)</span>
              </div>
            </div>
          </div>

          {/* QUICK STATS PILLS */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Upcoming Trips</span>
              <span className="text-lg font-extrabold text-slate-900">{upcomingTrips.length} Bookings</span>
            </div>

            <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Yatra Wallet</span>
              <span className="text-lg font-extrabold text-brand-scarlet">₹1,450</span>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD TAB SWITCHER */}
      <div className="bg-white border-b border-slate-200/80 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {[
            { label: 'Upcoming Trips (2)', key: 'upcoming', icon: 'confirmation_number' },
            { label: 'Past Journeys & Reviews', key: 'past', icon: 'history' },
            { label: 'Yatra Wallet & Points', key: 'wallet', icon: 'account_balance_wallet' },
            { label: 'Saved Passengers (3)', key: 'passengers', icon: 'group' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-brand-scarlet text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: UPCOMING TRIPS WITH ASSIGNED BUS PLATE & LIVE GPS TRACKING */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-slate-900">Your Upcoming Confirmed Bookings</h2>
              <span className="text-xs text-slate-500 font-medium">Assigned Bus Plates Locked</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {upcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  {/* TOP HEADER BAND */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300">
                          CONFIRMED TICKET
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">#{trip.id}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-slate-900">{trip.operator}</h3>
                      <p className="text-xs text-slate-500">{trip.busType}</p>
                    </div>

                    {/* ASSIGNED BUS PLATE HIGHLIGHT BADGE */}
                    <div className="p-3 rounded-2xl bg-slate-900 text-white flex items-center gap-3 shadow-md shrink-0">
                      <span className="material-symbols-outlined text-[24px] text-amber-400">directions_bus</span>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                          ASSIGNED BUS REGISTRATION
                        </span>
                        <span className="text-base font-mono font-extrabold text-amber-300">
                          {trip.busPlate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ROUTE TIMELINE GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
                    
                    {/* Departure */}
                    <div className="md:col-span-4 space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Boarding</span>
                      <div className="text-2xl font-black text-slate-900">{trip.depTime}</div>
                      <div className="text-xs font-bold text-slate-800">{trip.from}</div>
                      <div className="text-[11px] text-slate-500">{trip.fromStation}</div>
                      <div className="text-xs font-semibold text-brand-scarlet">{trip.depDate}</div>
                    </div>

                    {/* Duration / Arrow */}
                    <div className="md:col-span-4 text-center space-y-1">
                      <span className="text-xs text-slate-400 font-bold block">Assigned Seats</span>
                      <div className="inline-block px-3 py-1 rounded-xl bg-red-50 text-brand-scarlet font-extrabold text-sm border border-red-200">
                        Seats {trip.seats.join(', ')}
                      </div>
                      <div className="w-full h-0.5 bg-slate-200 my-2 relative">
                        <span className="material-symbols-outlined text-brand-scarlet text-[16px] absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1">
                          directions_bus
                        </span>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="md:col-span-4 text-left md:text-right space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Dropping</span>
                      <div className="text-2xl font-black text-slate-900">{trip.arrTime}</div>
                      <div className="text-xs font-bold text-slate-800">{trip.to}</div>
                      <div className="text-[11px] text-slate-500">{trip.toStation}</div>
                      <div className="text-xs font-semibold text-slate-600">{trip.arrDate}</div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">person</span>
                      <span>Driver: <strong>{trip.driverName}</strong> ({trip.driverPhone})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openGpsTracker(trip)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">my_location</span>
                        <span>Live GPS Bus Tracking</span>
                      </button>

                      <button
                        onClick={() => alert(`Downloading PDF Ticket for #${trip.id}...`)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span>PDF Ticket</span>
                      </button>

                      <button
                        onClick={() => alert(`Ticket #${trip.id} resent to your WhatsApp (+91 98765 43210)!`)}
                        className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition-all cursor-pointer"
                        title="Resend WhatsApp Ticket"
                      >
                        <span className="material-symbols-outlined text-[18px]">send_to_mobile</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PAST JOURNEYS */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">Past Completed Trips</h2>
            <div className="space-y-3">
              {pastTrips.map(trip => (
                <div key={trip.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ticket #{trip.id} • {trip.date}</span>
                    <h3 className="text-base font-serif font-bold text-slate-900 mt-0.5">{trip.from} ➔ {trip.to}</h3>
                    <p className="text-xs text-slate-500">{trip.operator} • Seats {trip.seats}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">{trip.fare}</span>
                    <button
                      onClick={() => alert(`Directing to re-book ${trip.from} to ${trip.to}...`)}
                      className="px-4 py-2 rounded-xl bg-brand-scarlet text-white font-bold text-xs shadow-sm hover:bg-brand-hover transition-all"
                    >
                      Book Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: YATRA WALLET */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex justify-between items-center shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Available Wallet Balance</span>
                <span className="text-3xl font-extrabold text-amber-400">₹1,450</span>
                <p className="text-xs text-slate-300 mt-1">Use 100% wallet balance on any bus ticket or Devsthan package booking.</p>
              </div>
              <button
                onClick={() => alert('Add Money functionality coming soon!')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                + Add Money
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SAVED PASSENGERS */}
        {activeTab === 'passengers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-serif font-bold text-slate-900">Saved Passenger Profiles</h2>
              <button
                onClick={() => alert('Add Passenger form modal')}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm"
              >
                + Add New Passenger
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {savedPassengers.map(p => (
                <div key={p.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-bold text-brand-scarlet uppercase">{p.relation}</span>
                  <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                  <p className="text-xs text-slate-500">{p.gender}, {p.age} Years Old</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* SIMULATED LIVE GPS BUS TRACKING MODAL */}
      {isGpsModalOpen && selectedTrackBus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 text-white border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                  🟢 LIVE GPS BUS FEED
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {selectedTrackBus.operator} ({selectedTrackBus.busPlate})
                </h3>
              </div>
              <button
                onClick={() => setIsGpsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* SIMULATED GPS RADAR MAP CONTAINER */}
            <div className="relative h-64 w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Grid Background Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

              {/* Highway Path Animation */}
              <div className="w-3/4 h-1 bg-slate-800 relative rounded-full">
                <div className="w-1/2 h-full bg-emerald-500 rounded-full"></div>
                
                {/* Animated Bus Icon Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse">
                  <span className="material-symbols-outlined text-[20px]">directions_bus</span>
                </div>
              </div>

              {/* Status Overlay Box */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">CURRENT LOCATION</span>
                  <span className="font-bold text-white">{selectedTrackBus.currentLocation}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">CURRENT SPEED</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedTrackBus.speed}</span>
                </div>
              </div>
            </div>

            {/* DRIVER CONTACT & NEXT STOP */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">DRIVER ON DUTY</span>
                <span className="font-bold text-white text-sm">{selectedTrackBus.driverName}</span>
                <span className="text-slate-400 block text-[11px]">{selectedTrackBus.driverPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedTrackBus.driverPhone}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Call Driver</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
