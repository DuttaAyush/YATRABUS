'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import DatePickerPopover from '@/components/ui/DatePickerPopover';
import { apiFetch } from '@/lib/api';

const popularCities = [
  'Nagpur',
  'Pune',
  'Mumbai',
  'Delhi',
  'Haridwar',
  'Indore',
  'Goa',
  'Shirdi',
  'Bengaluru',
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFrom = searchParams.get('from') || 'Nagpur';
  const initialTo = searchParams.get('to') || 'Pune';
  const initialDate = searchParams.get('date') || 'Tomorrow, 24 Oct';

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('cheapest');

  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [selectedDate, setSelectedDate] = useState({
    mainText: initialDate,
    subText: 'Scheduled Journey',
  });
  const [passengerCount, setPassengerCount] = useState(() => {
    const p = parseInt(searchParams.get('passengers'));
    return !isNaN(p) && p > 0 ? p : 1;
  });

  const getDayOfWeek = (rawDepDate, fallback) => {
    if (rawDepDate) {
      try {
        const d = new Date(rawDepDate);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('en-IN', { weekday: 'long' });
        }
      } catch (e) {}
    }
    if (fallback && typeof fallback === 'string') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const found = days.find(d => fallback.toLowerCase().includes(d.toLowerCase()));
      if (found) return found;
    }
    return 'Thursday';
  };

  const fetchBuses = async (queryFrom = fromCity, queryTo = toCity) => {
    setLoading(true);
    setBuses([]);
    try {
      const res = await apiFetch(`/api/buses/search?from=${encodeURIComponent(queryFrom)}&to=${encodeURIComponent(queryTo)}`);
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.data || [];
        setBuses(items);
      } else {
        setBuses([]);
      }
    } catch (err) {
      console.error('Failed to fetch buses from API:', err);
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBuses(initialFrom, initialTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFrom, initialTo]);

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleDateSelect = (dateResult) => {
    setSelectedDate({
      mainText: dateResult.mainText,
      subText: dateResult.subText,
    });
  };

  const handleUpdateSearch = () => {
    closeAllDropdowns();
    const params = new URLSearchParams();
    if (fromCity) params.set('from', fromCity);
    if (toCity) params.set('to', toCity);
    if (selectedDate?.mainText) params.set('date', selectedDate.mainText);
    if (passengerCount > 1) params.set('passengers', passengerCount.toString());
    const newUri = `/search?${params.toString()}`;
    router.push(newUri);
    fetchBuses(fromCity, toCity);
    triggerToast('Search updated');
  };

  const closeAllDropdowns = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    setIsDatePickerOpen(false);
    setIsPassengerOpen(false);
  };

  const filteredBuses = buses.filter((bus) => {
    if (selectedTimeSlots.length > 0 && !selectedTimeSlots.includes(bus.timeSlot)) {
      return false;
    }
    if (selectedCategory !== 'all' && bus.category !== selectedCategory) {
      return false;
    }
    if (parseFloat(bus.rating) < minRating) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortBy === 'departure') return a.depTime.localeCompare(b.depTime);
    return 0;
  });

  const toggleTimeSlot = (slot) => {
    if (selectedTimeSlots.includes(slot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(s => s !== slot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slot]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      <div className="bg-white border-b border-slate-200/90 shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-18 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsFromOpen(!isFromOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">departure_board</span>
                <span>From: <strong className="text-slate-900">{fromCity}</strong></span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              {isFromOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Select Departure City
                  </div>
                  <div className="max-h-48 overflow-y-auto py-1 space-y-0.5">
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setFromCity(city);
                          setIsFromOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                          fromCity === city
                            ? 'bg-red-50 text-brand-scarlet'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{city}</span>
                        {fromCity === city && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSwapCities}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 border border-slate-200 text-brand-scarlet flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-sm"
              title="Swap Departure & Destination"
            >
              <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsToOpen(!isToOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">pin_drop</span>
                <span>To: <strong className="text-slate-900">{toCity}</strong></span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              {isToOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Select Destination City
                  </div>
                  <div className="max-h-48 overflow-y-auto py-1 space-y-0.5">
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setToCity(city);
                          setIsToOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                          toCity === city
                            ? 'bg-red-50 text-brand-scarlet'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{city}</span>
                        {toCity === city && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={`relative ${isDatePickerOpen ? 'z-[9999]' : 'z-10'}`}>
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">calendar_month</span>
                <span>{selectedDate.mainText} <span className="text-slate-400 font-normal">({selectedDate.subText})</span></span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              <DatePickerPopover
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={handleDateSelect}
                selectedDate={selectedDate.mainText}
                themeColor="red"
                position="bottom"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsPassengerOpen(!isPassengerOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">group</span>
                <span>{passengerCount} {passengerCount === 1 ? 'Passenger' : 'Passengers'}</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              {isPassengerOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Select Passenger Count
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => {
                          setPassengerCount(count);
                          setIsPassengerOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                          passengerCount === count
                            ? 'bg-red-50 text-brand-scarlet'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{count} {count === 1 ? 'Passenger' : 'Passengers'}</span>
                        {passengerCount === count && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {toastMessage && (
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fadeIn">
                ✓ {toastMessage}
              </span>
            )}
            
            <button
              type="button"
              onClick={handleUpdateSearch}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span>Update Search</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-brand-scarlet">tune</span>
                <span>Filter Buses</span>
              </h3>
              <button
                onClick={() => {
                  setSelectedTimeSlots([]);
                  setSelectedCategory('all');
                  setMinRating(0);
                }}
                className="text-[11px] font-bold text-slate-400 hover:text-brand-scarlet uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Departure Time
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  onClick={() => toggleTimeSlot('morning')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTimeSlots.includes('morning')
                      ? 'bg-brand-scarlet text-white border-brand-scarlet shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  ☀️ Morning<br /><span className="text-[10px] opacity-75 font-normal">06:00 - 12:00</span>
                </button>
                <button
                  onClick={() => toggleTimeSlot('afternoon')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTimeSlots.includes('afternoon')
                      ? 'bg-brand-scarlet text-white border-brand-scarlet shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🌤️ Afternoon<br /><span className="text-[10px] opacity-75 font-normal">12:00 - 18:00</span>
                </button>
                <button
                  onClick={() => toggleTimeSlot('night')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTimeSlots.includes('night')
                      ? 'bg-brand-scarlet text-white border-brand-scarlet shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🌙 Evening/Night<br /><span className="text-[10px] opacity-75 font-normal">18:00 - 24:00</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Bus Type
              </label>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { label: 'All Bus Types', key: 'all' },
                  { label: 'AC Sleeper (2+1)', key: 'sleeper' },
                  { label: 'Volvo Seater (2+2)', key: 'seater' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedCategory(item.key)}
                    className={`w-full py-2 px-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedCategory === item.key
                        ? 'bg-slate-900 text-white border-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedCategory === item.key && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Operator Rating
              </label>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { label: 'Any Rating', value: 0 },
                  { label: '4.5★ & Above Top Operators', value: 4.5 },
                  { label: '4.0★ & Above Verified', value: 4.0 },
                ].map(r => (
                  <button
                    key={r.value}
                    onClick={() => setMinRating(r.value)}
                    className={`w-full py-2 px-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      minRating === r.value
                        ? 'bg-amber-500 text-white border-amber-600 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{r.label}</span>
                    {minRating === r.value && <span>★</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>VedBus Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                0% aggregator surcharge markup on all direct fleet tickets with assigned bus plate numbers.
              </p>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-base font-bold text-slate-900 font-serif">
                {filteredBuses.length} Buses Available
              </span>
              <span className="text-xs text-slate-500 block">
                {fromCity} to {toCity} • <strong className="text-brand-scarlet">{getDayOfWeek(null, selectedDate.subText)}</strong>, {selectedDate.mainText}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Sort By:</span>
              {[
                { label: 'Cheapest', key: 'cheapest' },
                { label: 'Top Rated', key: 'rating' },
                { label: 'Departure', key: 'departure' },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    sortBy === s.key
                      ? 'bg-brand-scarlet text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/90 shadow-sm flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-brand-scarlet border-t-transparent rounded-full animate-spin" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 font-serif">Searching Live Bus Schedules...</h3>
                  <p className="text-xs text-slate-500">
                    Fetching direct verified routes from <strong className="text-slate-800">{fromCity}</strong> to <strong className="text-slate-800">{toCity}</strong>
                  </p>
                </div>
              </div>
            ) : filteredBuses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <span className="material-symbols-outlined text-[48px] text-slate-300">directions_bus</span>
                <h3 className="text-lg font-bold text-slate-800 font-serif">No Buses Match Your Selected Filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your departure time slots or rating filters to see more luxury buses.
                </p>
                <button
                  onClick={() => {
                    setSelectedTimeSlots([]);
                    setSelectedCategory('all');
                    setMinRating(0);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-brand-scarlet text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredBuses.map((bus) => {
                const dayName = getDayOfWeek(bus.rawDepDate, selectedDate.subText);
                return (
                <div
                  key={bus.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-scarlet transition-colors font-serif">
                          {bus.operator}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200 flex items-center gap-1">
                          <span>★</span> {bus.rating} <span className="text-slate-400 font-normal">({bus.reviews})</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                        <span>{bus.busType}</span>
                        <span>•</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-300 font-mono font-extrabold text-amber-950 text-xs shadow-xs tracking-wider flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-amber-800">directions_bus</span>
                          <span>{bus.busPlate}</span>
                        </span>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest block">
                        0% Aggregator Surcharge
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-slate-900">₹{bus.price}</span>
                        <span className="text-xs text-slate-400 font-normal">/ seat</span>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2">
                        <div className="text-xl font-black text-slate-900">{bus.depTime}</div>
                        <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-brand-scarlet font-extrabold text-[11px] border border-red-200">
                          {dayName}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-700 mt-0.5">{bus.depLocation}</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                        🗓️ {dayName}, {selectedDate.mainText}
                      </div>
                    </div>

                    <div className="md:col-span-4 text-center">
                      <span className="text-[11px] font-semibold text-slate-400 block">{bus.duration}</span>
                      <div className="w-full h-0.5 bg-slate-200 my-1.5 relative">
                        <span className="material-symbols-outlined text-brand-scarlet text-[16px] absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1">
                          directions_bus
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Via {bus.routeVia}
                      </span>
                    </div>

                    <div className="md:col-span-4 text-left md:text-right">
                      <div className="text-xl font-black text-slate-900">{bus.arrTime}</div>
                      <div className="text-xs font-bold text-slate-700">{bus.arrLocation}</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Arrival</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      {bus.amenities.includes('wifi') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-blue-600">wifi</span> High-Speed Wi-Fi
                        </span>
                      )}
                      {bus.amenities.includes('blanket') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-purple-600">bed</span> Blanket &amp; Pillow
                        </span>
                      )}
                      {bus.amenities.includes('charging') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-amber-600">power</span> USB Socket
                        </span>
                      )}
                      {bus.amenities.includes('water') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-cyan-600">water_drop</span> Mineral Water
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                        {bus.seatsLeft} Seats Left
                      </span>
                      <Link
                        href={`/select-seats?busId=${bus.id}&operator=${encodeURIComponent(bus.operator)}&busPlate=${encodeURIComponent(bus.busPlate)}&busType=${encodeURIComponent(bus.busType)}&price=${bus.price}&category=${bus.category}&from=${encodeURIComponent(bus.depLocation || fromCity)}&to=${encodeURIComponent(bus.arrLocation || toCity)}&date=${encodeURIComponent(selectedDate.mainText)}&depTime=${encodeURIComponent(bus.depTime)}&arrTime=${encodeURIComponent(bus.arrTime)}&depLocation=${encodeURIComponent(bus.depLocation)}&arrLocation=${encodeURIComponent(bus.arrLocation)}&passengers=${passengerCount}`}
                        className="px-5 py-2.5 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 active:scale-95"
                      >
                        <span>SELECT SEATS</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-brand-scarlet border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-slate-700">Loading Available Buses...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
