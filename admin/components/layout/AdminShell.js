import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminShell({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Topbar />
        <main style={{ flex: 1, padding: "1.5rem", backgroundColor: "#F1F5F9" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
