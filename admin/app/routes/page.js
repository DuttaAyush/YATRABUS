"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";
import { adminFetch } from "@/lib/api";

// ── Sub-components ────────────────────────────────────────────────────────────

function Toggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 38, height: 20, borderRadius: 10,
        backgroundColor: active ? "#22C55E" : "#EF4444",
        position: "relative", cursor: "pointer",
        transition: "background-color 200ms ease",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute",
        top: 2,
        left: active ? 19 : 2,
        width: 16, height: 16, borderRadius: "50%",
        backgroundColor: "#fff",
        transition: "left 200ms ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
      }} />
    </div>
  );
}

const MOCK_ROUTES = [
  { id: "r1",  code: "RT-001", from: "Nagpur",    to: "Pune",       stops: 4, distance: 710, duration: "11h 00m", active: true, tripsCount: 6 },
  { id: "r2",  code: "RT-002", from: "Pune",      to: "Mumbai",     stops: 2, distance: 150, duration: "3h 30m",  active: true, tripsCount: 12 },
  { id: "r3",  code: "RT-003", from: "Nagpur",    to: "Mumbai",     stops: 5, distance: 820, duration: "14h 00m", active: true, tripsCount: 4 },
  { id: "r4",  code: "RT-004", from: "Bhopal",    to: "Indore",     stops: 1, distance: 195, duration: "3h 45m",  active: true, tripsCount: 8 },
  { id: "r5",  code: "RT-005", from: "Nagpur",    to: "Hyderabad",  stops: 3, distance: 500, duration: "8h 30m",  active: true, tripsCount: 5 },
  { id: "r6",  code: "RT-006", from: "Pune",      to: "Bangalore",  stops: 6, distance: 840, duration: "13h 15m", active: true, tripsCount: 3 },
  { id: "r7",  code: "RT-007", from: "Mumbai",    to: "Nagpur",     stops: 5, distance: 820, duration: "14h 00m", active: true, tripsCount: 4 },
  { id: "r8",  code: "RT-008", from: "Indore",    to: "Nagpur",     stops: 4, distance: 440, duration: "7h 30m",  active: false, tripsCount: 2 },
  { id: "r9",  code: "RT-009", from: "Nagpur",    to: "Delhi",      stops: 8, distance: 1080, duration: "18h 00m", active: true, tripsCount: 2 },
  { id: "r10", code: "RT-010", from: "Pune",      to: "Nagpur",     stops: 4, distance: 710, duration: "11h 00m", active: false, tripsCount: 5 },
  { id: "r11", code: "RT-011", from: "Mumbai",    to: "Goa",        stops: 3, distance: 580, duration: "10h 30m", active: true, tripsCount: 7 },
  { id: "r12", code: "RT-012", from: "Hyderabad", to: "Bangalore",  stops: 4, distance: 570, duration: "9h 00m",  active: true, tripsCount: 8 },
  { id: "r13", code: "RT-013", from: "Nagpur",    to: "Raipur",     stops: 2, distance: 285, duration: "5h 15m",  active: true, tripsCount: 4 },
  { id: "r14", code: "RT-014", from: "Pune",      to: "Surat",      stops: 3, distance: 415, duration: "7h 00m",  active: true, tripsCount: 3 },
  { id: "r15", code: "RT-015", from: "Nashik",    to: "Pune",       stops: 2, distance: 210, duration: "4h 30m",  active: false, tripsCount: 2 },
  { id: "r16", code: "RT-016", from: "Mumbai",    to: "Ahmedabad",  stops: 5, distance: 530, duration: "8h 45m",  active: true, tripsCount: 6 },
  { id: "r17", code: "RT-017", from: "Aurangabad", to: "Pune",     stops: 1, distance: 235, duration: "4h 45m",  active: true, tripsCount: 4 },
  { id: "r18", code: "RT-018", from: "Nagpur",    to: "Jabalpur",   stops: 3, distance: 275, duration: "5h 30m",  active: true, tripsCount: 3 },
];

const TH = {
  padding: "0.625rem 1rem",
  textAlign: "left",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "#94A3B8",
  textTransform: "uppercase",
  backgroundColor: "#F8FAFC",
  borderBottom: "1px solid #E2E8F0",
  whiteSpace: "nowrap",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RoutesPage() {
  const [routes, setRoutes] = useState(MOCK_ROUTES);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadRoutes = () => {
    setIsLoading(true);
    adminFetch("/api/admin/routes")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        if (list.length > 0) {
          const mapped = list.map((r, idx) => ({
            id: r.id,
            code: `RT-${String(idx + 1).padStart(3, "0")}`,
            from: r.originCity,
            to: r.destinationCity,
            stops: Array.isArray(r.waypoints) ? r.waypoints.length : 0,
            distance: r.distanceKm,
            duration: `${Math.max(1, Math.round(r.distanceKm / 65))}h ${Math.round((r.distanceKm % 65) * 0.9)}m`,
            active: true,
            tripsCount: r._count?.trips || 0,
          }));
          setRoutes(mapped);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch routes:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const toggleActive = (id) => {
    setRoutes((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleDelete = async (route) => {
    if (!window.confirm(`Are you sure you want to delete route "${route.from} → ${route.to}"? Associated trips will also be removed.`)) {
      return;
    }
    try {
      const res = await adminFetch(`/api/admin/routes/${route.id}?force=true`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRoutes((prev) => prev.filter((r) => r.id !== route.id));
      } else {
        alert(data.message || "Failed to delete route");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const filtered = routes.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.code.toLowerCase().includes(q) || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || (statusFilter === "Active" ? r.active : !r.active);
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filtered.length);
  const paginatedRoutes = filtered.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safeCurrentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (safeCurrentPage >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "...", totalPages];
  };
  const pageNumbers = getPageNumbers();

  const totalCitiesSet = new Set();
  routes.forEach(r => {
    if (r.from) totalCitiesSet.add(r.from);
    if (r.to) totalCitiesSet.add(r.to);
  });

  const STATS = [
    { label: "Total Routes",    value: String(routes.length), icon: "location_on",  bg: "#FEF2F2", color: "#B91C1C", change: "+12%", comp: "in database", up: true  },
    { label: "Active Routes",   value: String(routes.filter(r => r.active).length), icon: "play_circle",  bg: "#ECFDF5", color: "#059669", change: "+8%",  comp: "operational", up: true  },
    { label: "Inactive Routes", value: String(routes.filter(r => !r.active).length),  icon: "pause_circle", bg: "#F8FAFC", color: "#64748B", change: "0%",  comp: "on hold", up: false },
    { label: "Total Cities",    value: String(totalCitiesSet.size),  icon: "map",          bg: "#F5F3FF", color: "#7C3AED" },
  ];

  return (
    <AdminShell noScroll>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, overflow: "hidden" }}>
        {/* Breadcrumb */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.5rem", fontSize: "0.8125rem" }}>
          <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
          <span style={{ color: "#0F172A", fontWeight: 500 }}>Routes</span>
        </div>

        {/* Header */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.75rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
              Bus Routes
            </h1>
            <p style={{ fontSize: "0.8125rem", color: "#64748B", marginTop: "0.25rem", marginBottom: 0 }}>
              Manage bus routes, cities, and route information.
            </p>
          </div>
          <Link href="/routes/new" style={{
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#B91C1C", color: "#fff",
            border: "none", borderRadius: 8,
            fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 17 }}>add</span>
            Add New Route
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{ flexShrink: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.875rem", marginBottom: "0.875rem" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{
              background: "#fff", borderRadius: 10,
              padding: "0.75rem 1rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #F1F5F9",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                backgroundColor: s.bg, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: s.color }}>{s.icon}</span>
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 500, marginBottom: "0.1rem" }}>{s.label}</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>{s.value}</div>
                {s.change && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginTop: "0.2rem" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 11, color: s.up ? "#16A34A" : "#DC2626" }}>
                      {s.up ? "arrow_upward" : "arrow_downward"}
                    </span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: s.up ? "#16A34A" : "#DC2626" }}>{s.change}</span>
                    <span style={{ fontSize: "0.65rem", color: "#94A3B8" }}>{s.comp}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #F1F5F9", overflow: "hidden" }}>
          {/* Toolbar */}
          <div style={{ flexShrink: 0, padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid #F1F5F9" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
            <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 17, color: "#94A3B8", pointerEvents: "none" }}>search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by route ID, city name..."
              style={{
                width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #E2E8F0", borderRadius: 8,
                fontSize: "0.8125rem", color: "#0F172A",
                backgroundColor: "#F8FAFC", outline: "none",
              }}
            />
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            style={{
              padding: "0.4375rem 0.75rem",
              border: "1px solid #E2E8F0", borderRadius: 8,
              fontSize: "0.8125rem", color: "#475569",
              backgroundColor: "#fff", cursor: "pointer", outline: "none",
            }}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          {/* Sort */}
          <select style={{
            padding: "0.4375rem 0.75rem",
            border: "1px solid #E2E8F0", borderRadius: 8,
            fontSize: "0.8125rem", color: "#475569",
            backgroundColor: "#fff", cursor: "pointer", outline: "none",
          }}>
            <option>Sort by: Latest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Distance ↑</option>
            <option>Sort by: Distance ↓</option>
          </select>
        </div>

        {/* Scrollable Data Table Container */}
        <div style={{
          flex: 1,
          minHeight: 0,
          overflowX: "auto",
          overflowY: "auto",
          position: "relative",
          WebkitOverflowScrolling: "touch",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
              <tr>
                {["Route ID", "From City", "To City", "Stops", "Distance (KM)", "Duration", "Status", "Actions"].map((h) => (
                  <th key={h} style={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} style={{ padding: "3rem", textAlign: "center", color: "#64748B" }}>
                    Loading routes from database...
                  </td>
                </tr>
              ) : paginatedRoutes.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "3rem", textAlign: "center", color: "#64748B" }}>
                    No routes found. Click &quot;Add New Route&quot; to create one.
                  </td>
                </tr>
              ) : (
                paginatedRoutes.map((r, idx) => (
                  <tr
                    key={r.id}
                    style={{ borderBottom: idx < paginatedRoutes.length - 1 ? "1px solid #F8FAFC" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FAFAFA"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {/* Route ID */}
                    <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>
                      <span title={r.id} style={{ color: "#B91C1C", display: "inline-block", cursor: "help" }}>
                        {r.code}
                      </span>
                    </td>

                    {/* From */}
                    <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#475569", fontWeight: 600 }}>
                      {r.from}
                    </td>

                    {/* To */}
                    <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#475569", fontWeight: 600 }}>
                      {r.to}
                    </td>

                    {/* Stops */}
                    <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B", textAlign: "center" }}>{r.stops}</td>

                    {/* Distance */}
                    <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B" }}>{r.distance} km</td>

                    {/* Duration */}
                    <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B", whiteSpace: "nowrap" }}>{r.duration}</td>

                    {/* Status — Toggle + badge */}
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Toggle active={r.active} onToggle={() => toggleActive(r.id)} />
                        <span style={{
                          fontSize: "0.75rem", fontWeight: 600,
                          color: r.active ? "#166534" : "#991B1B",
                          backgroundColor: r.active ? "#DCFCE7" : "#FEE2E2",
                          padding: "0.2rem 0.5rem", borderRadius: 4,
                        }}>
                          {r.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button
                          onClick={() => handleDelete(r)}
                          title="Delete route"
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            width: 32, height: 32, borderRadius: 6,
                            border: "1px solid #FEE2E2", backgroundColor: "#FFF5F5",
                            color: "#B91C1C", cursor: "pointer",
                            transition: "all 150ms",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FEE2E2"; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FFF5F5"; }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          flexShrink: 0, backgroundColor: "#fff",
          padding: "0.875rem 1.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid #F1F5F9", flexWrap: "wrap", gap: "0.75rem",
        }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
            Showing {filtered.length === 0 ? 0 : startIndex + 1} to {endIndex} of {filtered.length} routes
          </span>

          <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              title="Previous Page"
              style={{
                width: 30, height: 30, borderRadius: 6,
                border: "1px solid #E2E8F0",
                background: safeCurrentPage === 1 ? "#F8FAFC" : "#fff",
                cursor: safeCurrentPage === 1 ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: safeCurrentPage === 1 ? "#CBD5E1" : "#64748B",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>

            {pageNumbers.map((n, idx) => {
              if (n === "...") {
                return (
                  <span key={`dots-${idx}`} style={{ fontSize: "0.875rem", color: "#94A3B8", padding: "0 0.125rem" }}>
                    ...
                  </span>
                );
              }
              const isSelected = safeCurrentPage === n;
              return (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  style={{
                    width: 30, height: 30, borderRadius: 6,
                    border: isSelected ? "none" : "1px solid #E2E8F0",
                    backgroundColor: isSelected ? "#B91C1C" : "#fff",
                    color: isSelected ? "#fff" : "#475569",
                    fontSize: "0.8125rem", fontWeight: isSelected ? 700 : 400,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 150ms ease",
                  }}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              title="Next Page"
              style={{
                width: 30, height: 30, borderRadius: 6,
                border: "1px solid #E2E8F0",
                background: safeCurrentPage === totalPages ? "#F8FAFC" : "#fff",
                cursor: safeCurrentPage === totalPages ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: safeCurrentPage === totalPages ? "#CBD5E1" : "#64748B",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: "0.25rem 0.5rem", border: "1px solid #E2E8F0",
                borderRadius: 6, fontSize: "0.8125rem", color: "#475569",
                backgroundColor: "#fff", cursor: "pointer", outline: "none",
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </AdminShell>
  );
}
