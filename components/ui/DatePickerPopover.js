'use client';

import React, { useState, useEffect, useRef } from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DatePickerPopover({
  isOpen,
  onClose,
  onSelectDate,
  selectedDate,
  themeColor = 'red'
}) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const [activeDate, setActiveDate] = useState(() => new Date());
  const popoverRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDateOutput = (d) => {
    const isToday = d.toDateString() === today.toDateString();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow = d.toDateString() === tomorrow.toDateString();

    const dayName = SHORT_DAYS[d.getDay()];
    const fullDayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNum = d.getDate();
    const monthShort = d.toLocaleDateString('en-US', { month: 'short' });

    let labelPrefix = '';
    if (isToday) labelPrefix = 'Today, ';
    else if (isTomorrow) labelPrefix = 'Tomorrow, ';

    return {
      mainText: `${labelPrefix}${dayNum} ${monthShort}`,
      subText: fullDayName,
      rawDate: d
    };
  };

  const handleDayClick = (e, dayNumber) => {
    e.stopPropagation();
    const clickedDate = new Date(currentYear, currentMonth, dayNumber);
    if (clickedDate < today) return;

    setActiveDate(clickedDate);
    const result = formatDateOutput(clickedDate);
    onSelectDate(result);
    onClose();
  };

  const handleShortcutClick = (e, offsetDays) => {
    e.stopPropagation();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offsetDays);
    setActiveDate(targetDate);
    setViewDate(targetDate);
    const result = formatDateOutput(targetDate);
    onSelectDate(result);
    onClose();
  };

  const themeStyles = {
    red: {
      accentBg: 'bg-brand-scarlet',
      accentText: 'text-brand-scarlet',
      borderFocus: 'border-brand-scarlet',
      badgeBg: 'bg-red-50 text-brand-scarlet border-red-200'
    },
    amber: {
      accentBg: 'bg-amber-600',
      accentText: 'text-amber-500',
      borderFocus: 'border-amber-500',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    teal: {
      accentBg: 'bg-teal-600',
      accentText: 'text-teal-600',
      borderFocus: 'border-teal-600',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200'
    }
  };

  const currentTheme = themeStyles[themeColor] || themeStyles.red;

  return (
    <div
      ref={popoverRef}
      onClick={(e) => e.stopPropagation()}
      aria-label="Date Picker Bubble"
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 z-50 w-80 sm:w-88 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.25)] border border-slate-200/90 p-4 text-slate-800 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Speech Bubble Arrow Indicator pointing down */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.08)]" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className={`material-symbols-outlined text-[18px] ${currentTheme.accentText}`}>
            calendar_month
          </span>
          <span className="font-serif text-sm font-bold text-slate-900">Select Date</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">close</span>
        </button>
      </div>

      {/* Quick Choice Chips */}
      <div className="flex flex-wrap gap-1.5 my-3">
        <button
          type="button"
          onClick={(e) => handleShortcutClick(e, 0)}
          className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Today
        </button>
        <button
          type="button"
          onClick={(e) => handleShortcutClick(e, 1)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${currentTheme.badgeBg}`}
        >
          Tomorrow
        </button>
        <button
          type="button"
          onClick={(e) => {
            const day = today.getDay();
            const diff = (6 - day + 7) % 7 || 7;
            handleShortcutClick(e, diff);
          }}
          className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Saturday
        </button>
        <button
          type="button"
          onClick={(e) => handleShortcutClick(e, 7)}
          className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Next Week
        </button>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between my-1 px-1">
        <button
          type="button"
          onClick={prevMonth}
          className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>
        <div className="font-extrabold text-xs text-slate-900">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase my-1">
        {SHORT_DAYS.map((day) => (
          <div key={day} className="py-0.5">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`blank-${idx}`} className="p-1" />
        ))}

        {Array.from({ length: totalDays }).map((_, idx) => {
          const dayNum = idx + 1;
          const dateObj = new Date(currentYear, currentMonth, dayNum);
          const isPast = dateObj < today;
          const isToday = dateObj.toDateString() === today.toDateString();
          const isSelected = activeDate && dateObj.toDateString() === activeDate.toDateString();

          return (
            <button
              key={dayNum}
              type="button"
              disabled={isPast}
              onClick={(e) => handleDayClick(e, dayNum)}
              className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs transition-all ${
                isPast
                  ? 'text-slate-300 cursor-not-allowed'
                  : isSelected
                  ? `${currentTheme.accentBg} text-white font-extrabold shadow-md scale-105`
                  : isToday
                  ? `border-2 ${currentTheme.borderFocus} text-slate-900 font-bold hover:bg-slate-100`
                  : 'text-slate-800 hover:bg-slate-100 font-medium'
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}
