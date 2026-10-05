'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { apiFetch } from '@/lib/api';

// ── Realistic Bus Layout Definition matching Reference Blueprint ────────────
// Lower Deck: Seats 1 to 20 (Top row 1-10, Bottom row 11-20)
// Exactly reproducing the status configuration from user uploaded image:
// - Available: 1, 3, 5, 6, 8, 10, 11, 12, 14, 16, 17, 18, 20
// - Locked/Booked: 2, 13, 19
// - Ladies Reserved: 4, 15
// - In-Progress/Hold: 7
// - Blocked/Unavailable: 9
const lowerDeckSeats = [
  // Top Row (1 to 10)
  { id: '1', name: '1', row: 'top', col: 1, defaultStatus: 'available', isWindow: true },
  { id: '2', name: '2', row: 'top', col: 2, defaultStatus: 'booked', isWindow: true },
  { id: '3', name: '3', row: 'top', col: 3, defaultStatus: 'available', isWindow: true },
  { id: '4', name: '4', row: 'top', col: 4, defaultStatus: 'female', isWindow: true },
  { id: '5', name: '5', row: 'top', col: 5, defaultStatus: 'available', isWindow: true },
  { id: '6', name: '6', row: 'top', col: 6, defaultStatus: 'available', isWindow: true },
  { id: '7', name: '7', row: 'top', col: 7, defaultStatus: 'hold', isWindow: true },
  { id: '8', name: '8', row: 'top', col: 8, defaultStatus: 'available', isWindow: true },
  { id: '9', name: '9', row: 'top', col: 9, defaultStatus: 'blocked', isWindow: true },
  { id: '10', name: '10', row: 'top', col: 10, defaultStatus: 'available', isWindow: true },

  // Bottom Row (11 to 20)
  { id: '11', name: '11', row: 'bottom', col: 1, defaultStatus: 'available', isWindow: true },
  { id: '12', name: '12', row: 'bottom', col: 2, defaultStatus: 'available', isWindow: true },
  { id: '13', name: '13', row: 'bottom', col: 3, defaultStatus: 'booked', isWindow: true },
  { id: '14', name: '14', row: 'bottom', col: 4, defaultStatus: 'available', isWindow: true },
  { id: '15', name: '15', row: 'bottom', col: 5, defaultStatus: 'female', isWindow: true },
  { id: '16', name: '16', row: 'bottom', col: 6, defaultStatus: 'available', isWindow: true },
  { id: '17', name: '17', row: 'bottom', col: 7, defaultStatus: 'available', isWindow: true },
  { id: '18', name: '18', row: 'bottom', col: 8, defaultStatus: 'available', isWindow: true },
  { id: '19', name: '19', row: 'bottom', col: 9, defaultStatus: 'booked', isWindow: true },
  { id: '20', name: '20', row: 'bottom', col: 10, defaultStatus: 'available', isWindow: true },
];

// Upper Deck: Seats 21 to 40 for Multi-Axle / Sleeper Coaches
const upperDeckSeats = [
  // Top Row (21 to 30)
  { id: '21', name: '21', row: 'top', col: 1, defaultStatus: 'available', isWindow: true },
  { id: '22', name: '22', row: 'top', col: 2, defaultStatus: 'available', isWindow: true },
  { id: '23', name: '23', row: 'top', col: 3, defaultStatus: 'female', isWindow: true },
  { id: '24', name: '24', row: 'top', col: 4, defaultStatus: 'available', isWindow: true },
  { id: '25', name: '25', row: 'top', col: 5, defaultStatus: 'booked', isWindow: true },
  { id: '26', name: '26', row: 'top', col: 6, defaultStatus: 'available', isWindow: true },
  { id: '27', name: '27', row: 'top', col: 7, defaultStatus: 'available', isWindow: true },
  { id: '28', name: '28', row: 'top', col: 8, defaultStatus: 'hold', isWindow: true },
  { id: '29', name: '29', row: 'top', col: 9, defaultStatus: 'available', isWindow: true },
  { id: '30', name: '30', row: 'top', col: 10, defaultStatus: 'available', isWindow: true },

  // Bottom Row (31 to 40)
  { id: '31', name: '31', row: 'bottom', col: 1, defaultStatus: 'available', isWindow: true },
  { id: '32', name: '32', row: 'bottom', col: 2, defaultStatus: 'booked', isWindow: true },
  { id: '33', name: '33', row: 'bottom', col: 3, defaultStatus: 'available', isWindow: true },
  { id: '34', name: '34', row: 'bottom', col: 4, defaultStatus: 'female', isWindow: true },
  { id: '35', name: '35', row: 'bottom', col: 5, defaultStatus: 'available', isWindow: true },
  { id: '36', name: '36', row: 'bottom', col: 6, defaultStatus: 'available', isWindow: true },
  { id: '37', name: '37', row: 'bottom', col: 7, defaultStatus: 'available', isWindow: true },
  { id: '38', name: '38', row: 'bottom', col: 8, defaultStatus: 'booked', isWindow: true },
  { id: '39', name: '39', row: 'bottom', col: 9, defaultStatus: 'available', isWindow: true },
  { id: '40', name: '40', row: 'bottom', col: 10, defaultStatus: 'available', isWindow: true },
];

const boardingPointsData = [
  { id: 'b1', location: 'VedBus Main City Terminal (Bay 4)', time: '20:30' },
  { id: 'b2', location: 'Express Highway Toll Plaza Junction', time: '20:55' },
  { id: 'b3', location: 'National Highway Bypass Flyover', time: '21:20' },
];

const droppingPointsData = [
  { id: 'd1', location: 'Central Ring Road Transit Station', time: '06:15' },
  { id: 'd2', location: 'Hotel Grand Residency Main Gate', time: '06:45' },
  { id: 'd3', location: 'VedBus Destination Hub & Metro Connector', time: '07:05' },
];

function CinemaSeatBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busIdParam = searchParams.get('busId');

  useEffect(() => {
    if (!busIdParam) {
      router.replace('/search');
    }
  }, [busIdParam, router]);

  const busInfo = {
    id: busIdParam || '1',
    operator: searchParams.get('operator') || 'VedBus Gold Express',
    busPlate: searchParams.get('busPlate') || 'MH-12-QZ-8812',
    busType: searchParams.get('busType') || 'BharatBenz AC Sleeper (2+1)',
    category: searchParams.get('category') || 'seater',
    price: parseInt(searchParams.get('price')) || 550,
    from: searchParams.get('from') || 'Nagpur',
    to: searchParams.get('to') || 'Pune',
    date: searchParams.get('date') || 'Scheduled Trip',
    depTime: searchParams.get('depTime') || '20:30',
    arrTime: searchParams.get('arrTime') || '07:00',
    depLocation: searchParams.get('depLocation') || 'Nagpur',
    arrLocation: searchParams.get('arrLocation') || 'Pune',
  };

  const [activeDeck, setActiveDeck] = useState('lower'); // 'lower' or 'upper'
  const [filterLadiesOnly, setFilterLadiesOnly] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeatIds, setBookedSeatIds] = useState([]);
  const [holdAlertMessage, setHoldAlertMessage] = useState('');

  // Fetch real-time booked seats from API for this bus and trip
  useEffect(() => {
    if (!busIdParam) return;
    apiFetch(`/api/bookings/seats?busId=${busInfo.id}&date=${encodeURIComponent(busInfo.date)}`)
      .then(res => res.json())
      .then(data => {
        const seats = data.bookedSeats || data.data?.bookedSeats;
        if (Array.isArray(seats)) {
          setBookedSeatIds(seats);
        }
      })
      .catch(() => {});
  }, [busInfo.id, busInfo.date]);

  const [boardingPoint, setBoardingPoint] = useState({
    id: 'b1',
    location: `${busInfo.depLocation} - VedBus Terminal`,
    time: busInfo.depTime,
  });
  const [droppingPoint, setDroppingPoint] = useState({
    id: 'd1',
    location: `${busInfo.arrLocation} - VedBus Drop Bay`,
    time: busInfo.arrTime,
  });

  const currentDeckSeats = activeDeck === 'lower' ? lowerDeckSeats : upperDeckSeats;

  // Compute status for a seat
  const getSeatStatus = (seat) => {
    if (bookedSeatIds.includes(seat.id) || bookedSeatIds.includes(`BK_${seat.id}`)) {
      return 'booked';
    }
    return seat.defaultStatus;
  };

  const isSeatSelected = (seatId) => selectedSeats.some(s => s.id === seatId);

  const toggleSeatSelection = (seat) => {
    const status = getSeatStatus(seat);
    if (status === 'booked' || status === 'blocked') return;
    if (status === 'hold') {
      setHoldAlertMessage(`Seat ${seat.name} is temporarily locked by another passenger. Please select another seat.`);
      setTimeout(() => setHoldAlertMessage(''), 4000);
      return;
    }

    if (selectedSeats.some(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, {
        id: seat.id,
        name: seat.name,
        price: busInfo.price,
        isWindow: seat.isWindow,
        deck: activeDeck,
      }]);
    }
  };

  const calculateSubtotal = () => selectedSeats.reduce((acc, s) => acc + (s?.price || busInfo.price), 0);
  const taxes = selectedSeats.length > 0 ? Math.round(calculateSubtotal() * 0.05) : 0;
  const totalAmount = calculateSubtotal() + taxes;

  const handleProceedToCheckout = async () => {
    if (selectedSeats.length === 0) return;

    let lockHolderId = 'holder_guest';
    if (typeof window !== 'undefined') {
      lockHolderId = localStorage.getItem('vedbus_lock_holder_id') || `holder_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem('vedbus_lock_holder_id', lockHolderId);
    }

    try {
      const holdRes = await apiFetch('/api/bookings/hold', {
        method: 'POST',
        body: JSON.stringify({
          tripId: busInfo.id,
          selectedSeats: selectedSeats.map(s => s.id),
          lockHolderId,
        })
      });
      if (holdRes.status === 409) {
        const holdData = await holdRes.json();
        setHoldAlertMessage(holdData.message || 'One or more selected seats were recently reserved. Please choose other seats.');
        return;
      }
    } catch (err) {
      console.warn('Seat hold network notice:', err);
    }

    const bookingPayload = {
      busId: busInfo.id,
      lockHolderId,
      operator: busInfo.operator,
      busPlate: busInfo.busPlate,
      busType: busInfo.busType,
      category: busInfo.category,
      from: busInfo.from,
      to: busInfo.to,
      date: busInfo.date,
      depTime: busInfo.depTime,
      arrTime: busInfo.arrTime,
      depLocation: busInfo.depLocation,
      arrLocation: busInfo.arrLocation,
      boardingPoint: boardingPoint,
      droppingPoint: droppingPoint,
      selectedSeats: selectedSeats.map(s => ({ id: s.id, name: s.name, price: s.price, isWindow: s.isWindow })),
      baseFare: calculateSubtotal(),
      taxes: taxes,
      totalAmount: totalAmount,
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('vedbus_active_checkout_flow', 'true');
      sessionStorage.setItem('vedbus_pending_booking', JSON.stringify(bookingPayload));
      localStorage.setItem('vedbus_pending_booking', JSON.stringify(bookingPayload));
    }
    router.push('/checkout');
  };

  if (!busIdParam) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-4">
          <div className="w-10 h-10 border-4 border-brand-scarlet border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-base font-bold text-slate-800 font-serif">Redirecting to Search...</h2>
          <p className="text-xs text-slate-500">Please choose a bus trip from available schedules to select your seats.</p>
        </div>
      </div>
    );
  }

  // Filter seats into Top Row and Bottom Row
  const topRowSeats = currentDeckSeats.filter(s => s.row === 'top');
  const bottomRowSeats = currentDeckSeats.filter(s => s.row === 'bottom');

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] text-slate-800 font-sans antialiased">
      <Header />

      {/* TOP ROUTE DETAILS STRIP */}
      <div className="bg-white border-b border-slate-200/90 shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-18 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/search?from=${encodeURIComponent(busInfo.from)}&to=${encodeURIComponent(busInfo.to)}&date=${encodeURIComponent(busInfo.date)}`}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-brand-scarlet border border-slate-200 flex items-center justify-center transition-all shadow-sm"
              title="Back to Bus Search"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-extrabold text-brand-scarlet uppercase tracking-widest">{busInfo.from} ➔ {busInfo.to}</span>
                <span className="text-xs text-slate-400">• {busInfo.date}</span>
                <span className="text-xs font-bold text-slate-500">• Dep: {busInfo.depTime}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span>{busInfo.operator}</span>
                <span className="text-xs font-sans font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-800 flex items-center gap-1">
                  <span>🚍</span>
                  <span>{busInfo.busPlate}</span>
                </span>
                <span className="text-xs font-sans font-normal text-slate-500">
                  ({busInfo.busType})
                </span>
              </h1>
            </div>
          </div>

          {/* FARE & BADGES */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <span>₹{busInfo.price} / Seat</span>
            </div>
            <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Direct RTO Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* HOLD NOTICE NOTIFICATION BANNER */}
      {holdAlertMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
          <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-3 rounded-2xl flex items-center justify-between text-xs font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-700 text-[18px]">info</span>
              <span>{holdAlertMessage}</span>
            </div>
            <button onClick={() => setHoldAlertMessage('')} className="text-amber-800 hover:text-amber-950 font-extrabold text-sm">✕</button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT & CONTROLS */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* BUS CABIN ARENA */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center">
          
          {/* DECK & FILTER CONTROLS */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            {/* Deck Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveDeck('lower')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDeck === 'lower'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>Lower Deck (1 – 20)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDeck('upper')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDeck === 'upper'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>Upper Deck (21 – 40)</span>
              </button>
            </div>

            {/* Ladies Only Filter */}
            <button
              type="button"
              onClick={() => setFilterLadiesOnly(!filterLadiesOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                filterLadiesOnly
                  ? 'bg-pink-500 text-white border-pink-600 shadow-sm'
                  : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
              }`}
            >
              <span>♀️</span>
              <span>{filterLadiesOnly ? 'Showing Ladies Seats Only' : 'Highlight Ladies Reserved'}</span>
            </button>
          </div>

          {/* EXACT MATCHING SEAT LEGEND (Reflects reference image 6 states) */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs font-medium text-slate-700">
              
              {/* Available */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white border border-slate-300 shadow-sm flex items-center justify-center font-bold text-[10px] text-slate-800">
                  1
                </div>
                <span>Available</span>
              </div>

              {/* Selected */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-500 border border-emerald-600 shadow-sm flex items-center justify-center font-bold text-[10px] text-white">
                  ✓
                </div>
                <span className="font-bold text-emerald-800">Selected</span>
              </div>

              {/* Ladies Reserved */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FCE7F3] border border-pink-300 flex items-center justify-center font-bold text-[10px] text-pink-800">
                  ♀
                </div>
                <span className="font-bold text-pink-700">Ladies</span>
              </div>

              {/* In Progress / Hold */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FDE68A] border border-amber-400 flex items-center justify-center text-slate-800">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                  </svg>
                </div>
                <span>In-Progress</span>
              </div>

              {/* Booked / Locked */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#374151] border border-slate-700 flex items-center justify-center text-white">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Booked</span>
              </div>

              {/* Blocked */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#EF4444] border border-red-600 flex items-center justify-center text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M6 18L18 6" />
                  </svg>
                </div>
                <span>Blocked</span>
              </div>
            </div>
          </div>

          {/* HORIZONTAL SCROLL WRAPPER FOR BUS CHASSIS */}
          <div className="w-full overflow-x-auto pb-4 pt-2 custom-scrollbar">
            <div className="w-full min-w-[760px] sm:min-w-[840px] mx-auto py-2">
              
              {/* REALISTIC BUS CHASSIS BLUEPRINT CONTAINER */}
              <div className="relative bg-[#FAFAFA] rounded-l-[46px] rounded-r-[24px] border-[4px] border-[#334155] shadow-xl overflow-hidden py-4 px-3 flex items-stretch">
                
                {/* TOP WINDOW SEGMENTS (Along Top Outer Hull) */}
                <div className="absolute top-0 left-24 right-20 h-1.5 flex justify-between px-4 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-16 h-1 bg-[#475569] rounded-full opacity-80" />
                  ))}
                </div>

                {/* BOTTOM WINDOW SEGMENTS (Along Bottom Outer Hull) */}
                <div className="absolute bottom-0 left-24 right-20 h-1.5 flex justify-between px-4 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-16 h-1 bg-[#475569] rounded-full opacity-80" />
                  ))}
                </div>

                {/* REAR RED TAILLIGHT INDICATORS (Right Outer Bumper Corners) */}
                <div className="absolute right-0 top-3 w-1.5 h-8 bg-red-600 rounded-l-md shadow-[0_0_8px_rgba(239,68,68,0.8)] pointer-events-none" />
                <div className="absolute right-0 bottom-3 w-1.5 h-8 bg-red-600 rounded-l-md shadow-[0_0_8px_rgba(239,68,68,0.8)] pointer-events-none" />

                {/* ── LEFT SECTION: FRONT OF BUS (Driver, Steering, Door) ── */}
                <div className="w-24 flex-shrink-0 flex flex-col justify-between items-center pr-3 border-r-2 border-slate-300/80 pl-1 py-1">
                  
                  {/* Front Curved Windshield Panels */}
                  <div className="absolute left-1 top-6 bottom-6 w-2 flex flex-col justify-between items-center pointer-events-none">
                    <div className="w-1.5 h-10 bg-slate-800 rounded-full" />
                    <div className="w-1.5 h-10 bg-slate-800 rounded-full" />
                    <div className="w-1.5 h-10 bg-slate-800 rounded-full" />
                  </div>

                  {/* Steering Wheel & Driver Area */}
                  <div className="flex flex-col items-center mt-2 pl-3">
                    <div className="flex items-center gap-1.5">
                      {/* Driver Steering Wheel SVG */}
                      <div className="w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center bg-slate-100 shadow-sm relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <div className="absolute w-full h-0.5 bg-slate-800 top-1/2 -translate-y-1/2" />
                        <div className="absolute w-0.5 h-full bg-slate-800 left-1/2 -translate-x-1/2" />
                      </div>

                      {/* Driver Seat */}
                      <div className="w-6 h-8 rounded-md bg-slate-700 border border-slate-800 shadow-inner" title="Driver Seat (Reserved)" />
                    </div>

                    {/* Front [Driver] Label matching image */}
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-2">
                      Front<br />[Driver]
                    </span>
                  </div>

                  {/* Entrance Boarding Steps (Bottom Left Door Pocket) */}
                  <div className="pl-3 mt-4 mb-1">
                    <div className="w-12 h-7 bg-slate-700 rounded-md border border-slate-800 p-0.5 flex flex-col justify-between" title="Passenger Entry Door">
                      <div className="w-full h-1 bg-slate-500 rounded-xs" />
                      <div className="w-full h-1 bg-slate-500 rounded-xs" />
                      <div className="w-full h-1 bg-slate-500 rounded-xs" />
                    </div>
                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest text-center block mt-0.5">
                      DOOR
                    </span>
                  </div>
                </div>

                {/* ── CENTER SECTION: PASSENGER SEATING CABIN ── */}
                <div className="flex-1 flex flex-col justify-between px-4 py-2 relative">
                  
                  {/* TOP ROW SEATS (1 to 10) */}
                  <div className="flex items-center justify-between gap-2.5">
                    {topRowSeats.map((seat) => renderSeatButton(seat))}
                  </div>

                  {/* AISLE PASSAGEWAY WITH "A I S L E" LABEL */}
                  <div className="my-5 py-1.5 flex items-center justify-center relative">
                    <div className="absolute inset-x-0 h-px border-b border-dashed border-slate-300" />
                    <span className="relative bg-[#FAFAFA] px-4 text-[10px] font-extrabold tracking-[0.5em] text-slate-400 select-none uppercase">
                      AISLE
                    </span>
                  </div>

                  {/* BOTTOM ROW SEATS (11 to 20) */}
                  <div className="flex items-center justify-between gap-2.5">
                    {bottomRowSeats.map((seat) => renderSeatButton(seat))}
                  </div>
                </div>

                {/* ── RIGHT SECTION: REAR OF BUS (Emergency Exit) ── */}
                <div className="w-20 flex-shrink-0 bg-slate-200/70 border-l-2 border-slate-300/80 flex flex-col items-center justify-center p-2 text-center select-none">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">door_open</span>
                    <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider leading-tight">
                      Emergency<br />Exit
                    </span>
                  </div>
                </div>

              </div>

              {/* MOBILE SCROLL HINT */}
              <div className="text-center mt-3 text-xs text-slate-400 sm:hidden flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">swipe</span>
                <span>Swipe left/right to view all 10 seat columns</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: BOARDING POINTS & CHECKOUT DOCK */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* BOARDING & DROPPING SELECTOR */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-brand-scarlet">pin_drop</span>
              <span>Pickup &amp; Drop Locations</span>
            </h3>

            {/* Boarding Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Boarding Point ({busInfo.from})</label>
              <select
                value={boardingPoint.id}
                onChange={(e) => setBoardingPoint(boardingPointsData.find(b => b.id === e.target.value) || boardingPoint)}
                className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 text-xs font-bold focus:border-brand-scarlet outline-none"
              >
                {boardingPointsData.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.time} — {b.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropping Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Dropping Point ({busInfo.to})</label>
              <select
                value={droppingPoint.id}
                onChange={(e) => setDroppingPoint(droppingPointsData.find(d => d.id === e.target.value) || droppingPoint)}
                className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 text-xs font-bold focus:border-brand-scarlet outline-none"
              >
                {droppingPointsData.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.time} — {d.location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SELECTED SEATS & FARE SUMMARY DOCK */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">Selected Seats</h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-200">
                {selectedSeats.length} Seats
              </span>
            </div>

            {/* Selected Seats Badges */}
            {selectedSeats.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                Tap on any available seat in the bus layout to reserve.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(seat => (
                  <div key={seat?.id} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <span>Seat {seat?.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleSeatSelection(seat)}
                      className="text-emerald-700 hover:text-emerald-950 font-extrabold ml-1 cursor-pointer"
                      title="Remove seat"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs pt-3 border-t border-slate-100 text-slate-600">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span className="font-bold text-slate-900">₹{calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-900">₹{taxes}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>VedBus Markup</span>
                <span>₹0 (FREE)</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-lg font-extrabold text-slate-900">
                <span>Total Amount</span>
                <span className="text-brand-scarlet">₹{totalAmount}</span>
              </div>
            </div>

            {/* PROCEED TO CHECKOUT BUTTON */}
            <button
              type="button"
              onClick={handleProceedToCheckout}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                selectedSeats.length > 0
                  ? 'bg-brand-scarlet hover:bg-brand-hover text-white cursor-pointer shadow-red-600/20 active:scale-[0.99]'
                  : 'bg-slate-200 text-slate-400 pointer-events-none'
              }`}
            >
              <span>PROCEED TO CHECKOUT ({selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'})</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );

  // ── SEAT BUTTON COMPONENT MATCHING USER'S BLUEPRINT IMAGE ─────────────────
  function renderSeatButton(seat) {
    const selected = isSeatSelected(seat.id);
    const status = getSeatStatus(seat);
    const isBooked = status === 'booked';
    const isFemale = status === 'female';
    const isHold = status === 'hold';
    const isBlocked = status === 'blocked';
    const isAvailable = status === 'available';

    const isHighlightedFemale = filterLadiesOnly && isFemale;
    const isDimmed = filterLadiesOnly && !isFemale;

    // Disabled state
    const isDisabled = isBooked || isBlocked;

    return (
      <div key={seat.id} className={`flex flex-col items-center flex-1 min-w-[34px] max-w-[46px] ${isDimmed ? 'opacity-30' : 'opacity-100'}`}>
        
        {/* Backrest Cushion Behind the Seat */}
        <div
          className={`w-7 sm:w-8 h-2 rounded-t-sm transition-all duration-150 ${
            selected
              ? 'bg-emerald-700'
              : isBooked
              ? 'bg-slate-700'
              : isBlocked
              ? 'bg-red-700'
              : isHold
              ? 'bg-amber-400'
              : isFemale
              ? 'bg-pink-300'
              : 'bg-slate-300'
          }`}
        />

        {/* Main Seat Cushion */}
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => toggleSeatSelection(seat)}
          title={`Seat ${seat.name} - ₹${busInfo.price} (${status})`}
          className={`w-11 h-12 rounded-xl flex flex-col items-center justify-center relative transition-all duration-150 shadow-sm border ${
            selected
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/30 scale-105 ring-2 ring-emerald-400 z-10'
              : isBooked
              ? 'bg-[#374151] border-slate-700 text-white cursor-not-allowed shadow-none'
              : isBlocked
              ? 'bg-[#EF4444] border-red-600 text-white cursor-not-allowed shadow-none'
              : isHold
              ? 'bg-[#FDE68A] border-amber-300 text-slate-900 cursor-pointer hover:border-amber-400'
              : isFemale
              ? 'bg-[#FCE7F3] border-pink-300 text-pink-900 hover:border-pink-400'
              : isHighlightedFemale
              ? 'bg-pink-100 border-pink-400 text-pink-900 ring-2 ring-pink-300'
              : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-500 hover:bg-emerald-50/40 hover:shadow-md cursor-pointer'
          }`}
        >
          {/* Inner Content depending on state */}
          {selected ? (
            <div className="flex flex-col items-center leading-none">
              <span className="text-[10px] font-extrabold">{seat.name}</span>
              <span className="text-[9px] font-black mt-0.5">✓</span>
            </div>
          ) : isBooked ? (
            /* Locked Padlock Icon */
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          ) : isBlocked ? (
            /* Blocked Slashed Circle */
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M6 18L18 6" />
            </svg>
          ) : isHold ? (
            /* In-Progress Clock Icon */
            <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
            </svg>
          ) : isFemale ? (
            /* Female Silhouette & Seat Number */
            <div className="flex flex-col items-center leading-none">
              <span className="text-[10px] font-bold text-pink-700">{seat.name}</span>
              <span className="text-[10px] text-pink-800 font-extrabold mt-0.5">♀</span>
            </div>
          ) : (
            /* Available Seat Number */
            <span className="text-xs font-bold text-slate-800">
              {seat.name}
            </span>
          )}
        </button>
      </div>
    );
  }
}

export default function CinemaSeatBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-brand-scarlet border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-slate-700">Loading Bus Cabin Blueprint...</p>
          </div>
        </div>
      }
    >
      <CinemaSeatBookingContent />
    </Suspense>
  );
}
