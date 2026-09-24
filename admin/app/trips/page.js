"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";
import DateRangePicker from "@/components/ui/DateRangePicker";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const TRIPS = [
  { id: "TRP1001", from: "Nagpur",  to: "Pune",      via: "Wardha, Amravati",  plate: "MH 31 AB 1234", busType: "Volvo AC (Sleeper)",       date: "15 Sep 2026", day: "Mon", time: "06:00 AM", avail: 12, total: 40, status: "Ongoing",      busStyle: "silver" },
  { id: "TRP1002", from: "Pune",    to: "Mumbai",    via: "Lonavala",          plate: "MH 40 CD 5678", busType: "Scania AC (Sleeper)",      date: "15 Sep 2026", day: "Mon", time: "08:30 AM", avail: 3,  total: 42, status: "Filling Fast",  busStyle: "red"    },
  { id: "TRP1003", from: "Nagpur",  to: "Mumbai",    via: "Akola, Buldhana",   plate: "MH 31 EF 9012", busType: "Mercedes AC (Seater)",     date: "15 Sep 2026", day: "Mon", time: "10:00 AM", avail: 28, total: 49, status: "Scheduled",     busStyle: "silver" },
  { id: "TRP1004", from: "Bhopal",  to: "Indore",    via: "Sehore",            plate: "MH 49 GH 3456", busType: "Tata AC (Seater)",         date: "15 Sep 2026", day: "Mon", time: "01:30 PM", avail: 18, total: 52, status: "Scheduled",     busStyle: "red"    },
  { id: "TRP1005", from: "Nagpur",  to: "Hyderabad", via: "Adilabad",          plate: "MH 12 IJ 7890", busType: "Ashok Leyland (Seater)",   date: "16 Sep 2026", day: "Tue", time: "07:00 AM", avail: 5,  total: 45, status: "Filling Fast",  busStyle: "silver" },
  { id: "TRP1006", from: "Pune",    to: "Bangalore", via: "Hubli, Dharwad",    plate: "MH 31 KL 4321", busType: "Volvo AC (Seater)",        date: "16 Sep 2026", day: "Tue", time: "09:15 AM", avail: 20, total: 48, status: "Scheduled",     busStyle: "red"    },
  { id: "TRP1007", from: "Mumbai",  to: "Nagpur",    via: "Nashik",            plate: "MH 14 MN 6789", busType: "BharatBenz (Seater)",      date: "16 Sep 2026", day: "Tue", time: "06:45 PM", avail: 35, total: 50, status: "Scheduled",     busStyle: "silver" },
  { id: "TRP1008", from: "Indore",  to: "Nagpur",    via: "Betul",             plate: "MH 31 OP 2468", busType: "Eicher (Seater)",          date: "17 Sep 2026", day: "Wed", time: "06:00 AM", avail: 22, total: 45, status: "Scheduled",     busStyle: "red"    },
  { id: "TRP1009", from: "Nagpur",  to: "Delhi",     via: "Jhansi, Agra",      plate: "MH 40 QR 1357", busType: "Volvo AC (Sleeper)",       date: "17 Sep 2026", day: "Wed", time: "02:30 PM", avail: 8,  total: 40, status: "Scheduled",     busStyle: "silver" },
  { id: "TRP1010", from: "Pune",    to: "Nagpur",    via: "Aurangabad",        plate: "MH 12 ST 9753", busType: "Scania AC (Sleeper)",      date: "18 Sep 2026", day: "Thu", time: "09:40 PM", avail: 40, total: 42, status: "Cancelled",     busStyle: "red"    },
];

const STATS = [
  { label: "Total Trips",     value: "128", icon: "directions_bus", bg: "#EFF6FF", color: "#2563EB", change: "+12%", comp: "vs last month", up: true  },
  { label: "Upcoming Trips",  value: "42",  icon: "play_circle",    bg: "#ECFDF5", color: "#059669", change: "+8%",  comp: "vs last month", up: true  },
  { label: "Ongoing Trips",   value: "18",  icon: "check_circle",   bg: "#F0FDF4", color: "#16A34A" },
  { label: "Completed Trips", value: "62",  icon: "history",        bg: "#FEF2F2", color: "#B91C1C", change: "+15%", comp: "vs last month", up: true  },
];

const STATUS_MAP = {
  "Ongoing":      { bg: "#F0FDF4", color: "#166534", dot: "#22C55E" },
  "Filling Fast": { bg: "#FFFBEB", color: "#92400E", dot: "#F59E0B" },
  "Scheduled":    { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6" },
  "Cancelled":    { bg: "#FEF2F2", color: "#991B1B", dot: "#EF4444" },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SeatBar({ avail, total, disabled }) {
  const pct = total > 0 ? (avail / total) * 100 : 0;
  const barColor = disabled ? "#E2E8F0" : pct > 40 ? "#22C55E" : pct > 15 ? "#F59E0B" : "#EF4444";
  return (
    <div style={{ minWidth: 110 }}>
      <div style={{ width: "100%", height: 6, backgroundColor: "#F1F5F9", borderRadius: 3, overflow: "hidden", marginBottom: "0.3rem" }}>
        <div style={{ width: `${pct}%`, height: "100%", backgroundColor: barColor, borderRadius: 3, transition: "width 300ms" }} />
      </div>
      <div style={{ fontSize: "0.75rem", color: disabled ? "#CBD5E1" : "#64748B", fontWeight: 500 }}>
        {avail} / {total}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { bg: "#F1F5F9", color: "#475569", dot: "#94A3B8" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.35rem",
      padding: "0.25rem 0.625rem", borderRadius: 5, whiteSpace: "nowrap",
      backgroundColor: s.bg, color: s.color, fontSize: "0.75rem", fontWeight: 600,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: s.dot, display: "inline-block", flexShrink: 0 }} />
      {status}
    </span>
  );
}

function BusThumbnail({ style: busStyle }) {
  const isRed = busStyle === "red";
  return (
    <div style={{
      width: 44, height: 30, borderRadius: 5, flexShrink: 0,
      backgroundColor: isRed ? "#FEF2F2" : "#F8FAFC",
      border: `1px solid ${isRed ? "#FEE2E2" : "#E2E8F0"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: 18, color: isRed ? "#B91C1C" : "#94A3B8" }}>directions_bus</span>
    </div>
  );
}

function ActionBtn({ icon, label, variant, disabled, href, onClick }) {
  const styles = {
    default: { color: "#475569", border: "1px solid #E2E8F0", bg: "#fff" },
    primary: { color: "#1D4ED8", border: "1px solid #DBEAFE", bg: "#EFF6FF" },
    danger:  { color: "#B91C1C", border: "1px solid #FEE2E2", bg: "#FFF5F5" },
  };
  const s = disabled ? { color: "#CBD5E1", border: "1px solid #F1F5F9", bg: "#FAFAFA" } : (styles[variant] || styles.default);
  const shared = {
    display: "inline-flex", alignItems: "center", gap: "0.2rem",
    padding: "0.28rem 0.5rem", borderRadius: 6,
    border: s.border, backgroundColor: s.bg, color: s.color,
    fontSize: "0.72rem", fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none", opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap",
  };
  if (href && !disabled) {
    return <Link href={href} style={shared}><span className="material-symbols-outlined" style={{ fontSize: 13 }}>{icon}</span>{label}</Link>;
  }
  return <button disabled={disabled} onClick={onClick} style={shared}><span className="material-symbols-outlined" style={{ fontSize: 13 }}>{icon}</span>{label}</button>;
}

const TH = {
  padding: "0.5rem 0.875rem",
  textAlign: "left", fontSize: "0.68rem", fontWeight: 600,
  letterSpacing: "0.06em", color: "#94A3B8",
  textTransform: "uppercase", backgroundColor: "#F8FAFC",
  borderBottom: "1px solid #E2E8F0", whiteSpace: "nowrap",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TripsPage() {
  const [dateFilter,   setDateFilter]   = useState("2026-09-15");
  const [routeFilter,  setRouteFilter]  = useState("All Routes");
  const [busFilter,    setBusFilter]    = useState("All Buses");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const clearFilters = () => { setDateFilter(""); setRouteFilter("All Routes"); setBusFilter("All Buses"); setStatusFilter("All Status"); };

  const filtered = TRIPS.filter(t => {
    const matchStatus = statusFilter === "All Status" || t.status === statusFilter;
    return matchStatus;
  });

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Trips</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Trips
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            Manage bus trips, view seat availability, and track operations.
          </p>
        </div>
        <Link href="/trips/new" style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1.125rem",
          backgroundColor: "#B91C1C", color: "#fff",
          border: "none", borderRadius: 8,
          fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>add</span>
          Create New Trip
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: s.bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 500, marginBottom: "0.125rem" }}>{s.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
              {s.change && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginTop: "0.2rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 12, color: "#16A34A" }}>arrow_upward</span>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#16A34A" }}>{s.change}</span>
                  <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>{s.comp}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #F1F5F9", overflow: "hidden" }}>
        {/* Filter toolbar */}
        <div style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "flex-end", gap: "0.75rem", borderBottom: "1px solid #F1F5F9", flexWrap: "wrap" }}>
          {/* Date Picker Pop-up */}
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "#94A3B8", marginBottom: "0.3rem" }}>Select Date Range</div>
            <DateRangePicker initialStart="15 Sep 2026" initialEnd="18 Sep 2026" />
          </div>

          {/* Route */}
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "#94A3B8", marginBottom: "0.3rem" }}>Route</div>
            <select value={routeFilter} onChange={e => setRouteFilter(e.target.value)} style={{ padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem", color: "#475569", backgroundColor: "#fff", cursor: "pointer", outline: "none" }}>
              <option>All Routes</option>
              <option>Nagpur → Pune</option>
              <option>Pune → Mumbai</option>
              <option>Nagpur → Mumbai</option>
            </select>
          </div>

          {/* Bus */}
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "#94A3B8", marginBottom: "0.3rem" }}>Bus</div>
            <select value={busFilter} onChange={e => setBusFilter(e.target.value)} style={{ padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem", color: "#475569", backgroundColor: "#fff", cursor: "pointer", outline: "none" }}>
              <option>All Buses</option>
              <option>MH 31 AB 1234</option>
              <option>MH 40 CD 5678</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "#94A3B8", marginBottom: "0.3rem" }}>Status</div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem", color: "#475569", backgroundColor: "#fff", cursor: "pointer", outline: "none" }}>
              <option>All Status</option>
              <option>Scheduled</option>
              <option>Ongoing</option>
              <option>Filling Fast</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button onClick={clearFilters} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.4375rem 0.875rem", border: "1px solid #E2E8F0", borderRadius: 8, backgroundColor: "#fff", color: "#475569", fontSize: "0.8125rem", cursor: "pointer", marginLeft: "auto", whiteSpace: "nowrap" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>refresh</span>
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={TH}>Trip ID</th>
                <th style={TH}>Route</th>
                <th style={TH}>Bus</th>
                <th style={TH}>Date</th>
                <th style={TH}>Departure Time</th>
                <th style={TH}>Seats (Avail / Total)</th>
                <th style={TH}>Status</th>
                <th style={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, idx) => {
                const cancelled = t.status === "Cancelled";
                return (
                  <tr
                    key={t.id}
                    style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F8FAFC" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FAFAFA"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {/* Trip ID */}
                    <td style={{ padding: "0.75rem 0.875rem", fontSize: "0.8125rem", fontWeight: 700, color: cancelled ? "#94A3B8" : "#0F172A", whiteSpace: "nowrap" }}>
                      <Link href={`/trips/${t.id}/seats`} style={{ color: cancelled ? "#94A3B8" : "#B91C1C", textDecoration: "none" }}>
                        {t.id}
                      </Link>
                    </td>

                    {/* Route */}
                    <td style={{ padding: "0.75rem 0.875rem" }}>
                      <Link href={`/routes/new`} style={{ textDecoration: "none", color: "inherit" }}>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: cancelled ? "#94A3B8" : "#0F172A", whiteSpace: "nowrap" }}>
                          {t.from} <span style={{ color: "#B91C1C" }}>→</span> {t.to}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: 2 }}>Via {t.via}</div>
                      </Link>
                    </td>

                    {/* Bus */}
                    <td style={{ padding: "0.75rem 0.875rem" }}>
                      <Link href={`/buses/${t.plate}/edit`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "inherit" }}>
                        <BusThumbnail style={t.busStyle} />
                        <div>
                          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: cancelled ? "#94A3B8" : "#0F172A" }}>{t.plate}</div>
                          <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: 1 }}>{t.busType}</div>
                        </div>
                      </Link>
                    </td>

                    {/* Date */}
                    <td style={{ padding: "0.75rem 0.875rem", whiteSpace: "nowrap" }}>
                      <div style={{ fontSize: "0.8125rem", color: cancelled ? "#94A3B8" : "#475569" }}>{t.date}</div>
                      <div style={{ display: "inline-block", marginTop: 2, fontSize: "0.68rem", color: "#94A3B8", backgroundColor: "#F8FAFC", padding: "0.1rem 0.375rem", borderRadius: 3, border: "1px solid #F1F5F9" }}>{t.day}</div>
                    </td>

                    {/* Departure Time */}
                    <td style={{ padding: "0.75rem 0.875rem", fontSize: "0.875rem", fontWeight: 500, color: cancelled ? "#94A3B8" : "#0F172A", whiteSpace: "nowrap" }}>{t.time}</td>

                    {/* Seats */}
                    <td style={{ padding: "0.75rem 0.875rem" }}>
                      <SeatBar avail={t.avail} total={t.total} disabled={cancelled} />
                    </td>

                    {/* Status */}
                    <td style={{ padding: "0.75rem 0.875rem" }}>
                      <StatusBadge status={t.status} />
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "0.75rem 0.875rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <ActionBtn icon="event_seat" label="View Seats" variant="primary" disabled={cancelled} href={`/trips/${t.id}/seats`} />
                        <ActionBtn icon="edit"       label="Edit"       variant="default" disabled={cancelled} href={`/trips/${t.id}/edit`} />
                        <ActionBtn icon="cancel"     label="Cancel"     variant="danger"  disabled={cancelled} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F1F5F9", flexWrap: "wrap", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>Showing 1 to 10 of 128 trips</span>
          <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} style={{ width: 30, height: 30, borderRadius: 6, border: n === 1 ? "none" : "1px solid #E2E8F0", backgroundColor: n === 1 ? "#B91C1C" : "#fff", color: n === 1 ? "#fff" : "#475569", fontSize: "0.8125rem", fontWeight: n === 1 ? 700 : 400, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</button>
            ))}
            <span style={{ color: "#94A3B8", fontSize: "0.875rem" }}>...</span>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: "0.8125rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>13</button>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
