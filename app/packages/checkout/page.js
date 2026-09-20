'use client';

import React, { useState, use } from 'react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

const samplePackages = {
  'dubai-marina': {
    id: 'dubai-marina',
    title: 'Dubai Desert Safari & Marina Skyline',
    category: 'International Holiday',
    duration: '5 Days / 4 Nights',
    destinations: 'Dubai • Abu Dhabi • Desert Safari',
    price: 48999,
    image: '/images/vedbus_international_holiday_travel_packages_1.jpg',
    badge: '4-Star Marina Hotel & Visa Included',
    inclusions: ['4★ Marina Hotel Stay', 'Burj Khalifa 124th Floor Ticket', '4x4 Desert Safari & BBQ Dinner', 'Dhow Marina Cruise Dinner', 'Express eVisa Assistance'],
    badgeColor: 'bg-teal-600 text-white',
  },
  'chardham': {
    id: 'chardham',
    title: 'Char Dham Yatra & Haridwar Special',
    category: 'Spiritual Pilgrimage',
    duration: '10 Days / 9 Nights',
    destinations: 'Kedarnath • Badrinath • Gangotri • Yamunotri',
    price: 24499,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
    badge: 'VIP Darshan & Helicopter Assist',
    inclusions: ['2x2 BharatBenz AC Pushback Coach', 'Verified Warm Stays', 'Pure Satvik Dining', 'Har Ki Pauri Aarti Slot', 'VIP Darshan Passes'],
    badgeColor: 'bg-amber-600 text-white',
  },
  'kerala-backwaters': {
    id: 'kerala-backwaters',
    title: 'Kerala Backwaters & Munnar Tea Trails',
    category: 'Domestic Holiday',
    duration: '5 Days / 4 Nights',
    destinations: 'Kochi • Munnar Hills • Alleppey Houseboat',
    price: 11200,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_14.jpg',
    badge: 'Private AC Houseboat & Tea Trails',
    inclusions: ['Deluxe Resort Stays', 'Private AC Houseboat Cruise', 'Munnar Tea Plantation Escort', 'Kathakali Show Ticket', 'All Transfers'],
    badgeColor: 'bg-emerald-600 text-white',
  },
  'singapore-malaysia': {
    id: 'singapore-malaysia',
    title: 'Singapore Gardens & Genting Highlands',
    category: 'International Holiday',
    duration: '7 Days / 6 Nights',
    destinations: 'Singapore • Kuala Lumpur • Genting Highlands',
    price: 62500,
    image: '/images/vedbus_international_holiday_travel_packages_2.jpg',
    badge: 'Universal Studios & Cable Car Pass',
    inclusions: ['Universal Studios Pass', 'Gardens by the Bay Entry', 'Genting Cable Car Ride', '4★ City Center Stays', 'Dual Country Visa Assist'],
    badgeColor: 'bg-teal-600 text-white',
  },
};

export default function PackageCheckoutPage({ searchParams }) {
  const resolvedSearchParams = use(searchParams) || {};
  const packageId = resolvedSearchParams.package || 'dubai-marina';
  const pkg = samplePackages[packageId] || samplePackages['dubai-marina'];

  const [travelerCount, setTravelerCount] = useState(2);
  const [hotelUpgrade, setHotelUpgrade] = useState('4star'); // '3star' | '4star' | '5star'
  const [includeTravelInsurance, setIncludeTravelInsurance] = useState(true);
  const [includeAirportTransfer, setIncludeAirportTransfer] = useState(true);

  const [contactEmail, setContactEmail] = useState('rajesh.patel@gmail.com');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [whatsappSync, setWhatsappSync] = useState(true);

  const [travelers, setTravelers] = useState([
    { name: 'Rajesh Patel', age: '34', gender: 'male', idType: 'Aadhaar / Passport' },
    { name: 'Sneha Patel', age: '31', gender: 'female', idType: 'Aadhaar / Passport' },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Price calculations
  const hotelUpgradeCost = hotelUpgrade === '5star' ? 4500 : hotelUpgrade === '3star' ? -1500 : 0;
  const pricePerPerson = pkg.price + hotelUpgradeCost;
  const packageBaseTotal = pricePerPerson * travelerCount;
  const insuranceTotal = includeTravelInsurance ? 299 * travelerCount : 0;
  const transferTotal = includeAirportTransfer ? 999 : 0;

  const subtotal = packageBaseTotal + insuranceTotal + transferTotal;
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + taxes;

  const updateTravelerCount = (count) => {
    const newCount = Math.max(1, Math.min(10, count));
    setTravelerCount(newCount);
    const newTravelers = [...travelers];
    if (newCount > travelers.length) {
      for (let i = travelers.length; i < newCount; i++) {
        newTravelers.push({ name: '', age: '', gender: 'male', idType: 'Aadhaar / Passport' });
      }
    } else {
      newTravelers.length = newCount;
    }
    setTravelers(newTravelers);
  };

  const updateTraveler = (index, field, value) => {
    const updated = [...travelers];
    updated[index][field] = value;
    setTravelers(updated);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* TOP ROUTE CONTEXT BAR */}
      <div className="bg-white border-b border-slate-200/90 shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-18 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/packages"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-brand-scarlet border border-slate-200 flex items-center justify-center transition-all shadow-sm"
              title="Back to Packages"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </a>
            <div>
              <h1 className="text-lg font-serif font-bold text-slate-900">Tour Package Checkout</h1>
              <p className="text-xs text-slate-500">{pkg.title} • {pkg.duration}</p>
            </div>
          </div>

          {/* Stepper Badge */}
          <div className="flex items-center gap-2 text-xs font-extrabold">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300 flex items-center gap-1">
              ✓ Package Selected ({travelerCount} Travelers)
            </span>
            <span className="text-slate-300">➔</span>
            <span className="px-3 py-1 rounded-full bg-brand-scarlet text-white shadow-sm">
              Confirm &amp; Pay
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CHECKOUT ARENA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PACKAGE SUMMARY, TRAVELER DETAILS, OPTIONS, PAYMENT */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* PACKAGE SUMMARY CARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full md:w-44 h-36 object-cover rounded-2xl shadow-md border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-scarlet/10 text-brand-scarlet text-[11px] font-bold">
                  {pkg.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                  {pkg.duration}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${pkg.badgeColor}`}>
                  {pkg.badge}
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                {pkg.title}
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                📍 {pkg.destinations}
              </p>
              
              {/* Key Inclusions Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {pkg.inclusions.map((inc, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-emerald-600">check_circle</span>
                    {inc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* TRAVELER COUNT & HOTEL SELECTION */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-scarlet text-[20px]">group</span>
              Traveler Count &amp; Accommodation Options
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Number of Travelers */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Travelers</label>
                  <p className="text-sm font-bold text-slate-900">{travelerCount} Person(s)</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateTravelerCount(travelerCount - 1)}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm w-6 text-center">{travelerCount}</span>
                  <button
                    type="button"
                    onClick={() => updateTravelerCount(travelerCount + 1)}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Hotel Tier */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Hotel Category</label>
                  <p className="text-sm font-bold text-slate-900">
                    {hotelUpgrade === '5star' ? '5★ Luxury Resort' : hotelUpgrade === '3star' ? '3★ Standard Hotel' : '4★ Premium Resort (Included)'}
                  </p>
                </div>
                <select
                  value={hotelUpgrade}
                  onChange={(e) => setHotelUpgrade(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 outline-none cursor-pointer shadow-sm"
                >
                  <option value="3star">3★ Stays (-₹1,500/person)</option>
                  <option value="4star">4★ Stays (Standard)</option>
                  <option value="5star">5★ Stays (+₹4,500/person)</option>
                </select>
              </div>
            </div>
          </div>

          {/* CONTACT DETAILS FORM */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-scarlet text-[20px]">contact_mail</span>
              Primary Contact Information (For Voucher &amp; WhatsApp Sync)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:border-brand-scarlet outline-none transition-all"
                  placeholder="your.email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Mobile Number (WhatsApp)
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:border-brand-scarlet outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={whatsappSync}
                onChange={(e) => setWhatsappSync(e.target.checked)}
                className="w-4 h-4 rounded text-brand-scarlet focus:ring-brand-scarlet accent-brand-scarlet"
              />
              <span>Send instant WhatsApp PDF tour voucher &amp; itinerary details to this mobile number</span>
            </label>
          </div>

          {/* TRAVELER DETAILS FORM */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-scarlet text-[20px]">badge</span>
              Traveler Information ({travelerCount} Person(s))
            </h3>

            {travelers.map((traveler, index) => (
              <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Traveler {index + 1} {index === 0 ? '• Primary Contact' : ''}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Passenger
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-6">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Full Name (As per Govt ID)</label>
                    <input
                      type="text"
                      value={traveler.name}
                      onChange={(e) => updateTraveler(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:border-brand-scarlet outline-none"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Age</label>
                    <input
                      type="number"
                      value={traveler.age}
                      onChange={(e) => updateTraveler(index, 'age', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:border-brand-scarlet outline-none"
                      placeholder="Age"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Gender</label>
                    <select
                      value={traveler.gender}
                      onChange={(e) => updateTraveler(index, 'gender', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:border-brand-scarlet outline-none cursor-pointer"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ADD-ONS & TRAVEL PROTECTION */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-scarlet text-[20px]">verified_user</span>
              Optional Add-ons &amp; Insurance Protection
            </h3>

            <div className="space-y-3">
              <label className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-all">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeTravelInsurance}
                    onChange={(e) => setIncludeTravelInsurance(e.target.checked)}
                    className="w-5 h-5 rounded text-brand-scarlet focus:ring-brand-scarlet accent-brand-scarlet mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Complete Comprehensive Travel Insurance</span>
                    <span className="text-[11px] text-slate-500">Covers medical emergencies, baggage loss, trip cancellation up to ₹5,00,000</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900 shrink-0">₹299 / person</span>
              </label>

              <label className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-all">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeAirportTransfer}
                    onChange={(e) => setIncludeAirportTransfer(e.target.checked)}
                    className="w-5 h-5 rounded text-brand-scarlet focus:ring-brand-scarlet accent-brand-scarlet mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Private Airport / Railway Station Cab Transfer</span>
                    <span className="text-[11px] text-slate-500">Doorstep AC sedan pickup &amp; drop to airport or bus terminal</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900 shrink-0">₹999 total</span>
              </label>
            </div>
          </div>

          {/* PAYMENT METHOD SELECTION */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-scarlet text-[20px]">payments</span>
              Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-red-50/50 border-brand-scarlet text-slate-900 shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase">Instant UPI</span>
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">qr_code_2</span>
                </div>
                <span className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</span>
              </label>

              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-red-50/50 border-brand-scarlet text-slate-900 shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase">Credit / Debit Card</span>
                  <span className="material-symbols-outlined text-[18px] text-blue-600">credit_card</span>
                </div>
                <span className="text-[10px] text-slate-500">Visa, Mastercard, RuPay, Amex</span>
              </label>

              <label
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'bg-red-50/50 border-brand-scarlet text-slate-900 shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase">Netbanking / EMI</span>
                  <span className="material-symbols-outlined text-[18px] text-purple-600">account_balance</span>
                </div>
                <span className="text-[10px] text-slate-500">All Major Indian Banks &amp; No-Cost EMI</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FARE BREAKDOWN & CONFIRMATION */}
        <div className="lg:col-span-4 sticky top-36 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl space-y-6">
            <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
              Package Fare Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Base Package Price ({travelerCount}x ₹{pkg.price.toLocaleString('en-IN')})</span>
                <span className="font-bold text-slate-900">₹{(pkg.price * travelerCount).toLocaleString('en-IN')}</span>
              </div>

              {hotelUpgradeCost !== 0 && (
                <div className="flex justify-between items-center text-slate-600">
                  <span>Hotel Category Adjustment</span>
                  <span className="font-bold text-slate-900">
                    {hotelUpgradeCost > 0 ? `+₹${(hotelUpgradeCost * travelerCount).toLocaleString('en-IN')}` : `-₹${(Math.abs(hotelUpgradeCost) * travelerCount).toLocaleString('en-IN')}`}
                  </span>
                </div>
              )}

              {includeTravelInsurance && (
                <div className="flex justify-between items-center text-slate-600">
                  <span>Comprehensive Travel Protection ({travelerCount}x ₹299)</span>
                  <span className="font-bold text-slate-900">₹{insuranceTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              {includeAirportTransfer && (
                <div className="flex justify-between items-center text-slate-600">
                  <span>Doorstep Airport/Terminal Cab Transfer</span>
                  <span className="font-bold text-slate-900">₹{transferTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-slate-600">
                <span>GST (5% Statutory Tax)</span>
                <span className="font-bold text-slate-900">₹{taxes.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center text-emerald-700 font-bold pt-1 border-t border-slate-100">
                <span>VedBus Booking Fee</span>
                <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-emerald-800">₹0 (FREE)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Amount payable</span>
                <span className="text-2xl font-black text-slate-900">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                All Inclusive
              </span>
            </div>

            <button
              type="button"
              onClick={handlePayNow}
              className="w-full py-4 rounded-2xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>PAY ₹{grandTotal.toLocaleString('en-IN')} &amp; CONFIRM TOUR</span>
            </button>

            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
              <span>256-Bit SSL Encrypted. Guaranteed Instant Voucher</span>
            </div>
          </div>
        </div>
      </main>

      {/* CONFIRMATION SUCCESS MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Tour Booking Confirmed!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Booking ID: <strong className="text-slate-900">YATRA-PKG-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Package:</span>
                <span className="font-bold text-slate-900">{pkg.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-bold text-slate-900">{pkg.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travelers:</span>
                <span className="font-bold text-slate-900">{travelerCount} Person(s)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                <span>Amount Paid:</span>
                <span className="text-emerald-700 font-extrabold text-sm">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your instant WhatsApp PDF tour voucher &amp; daily itinerary have been dispatched to <strong>{contactPhone}</strong> and <strong>{contactEmail}</strong>.
            </p>

            <a
              href="/"
              className="block w-full py-3.5 rounded-xl bg-brand-scarlet text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-brand-hover transition-all"
            >
              Back to Home
            </a>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
