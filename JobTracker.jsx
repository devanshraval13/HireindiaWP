import { useState, useEffect } from "react";

const STATUSES = [
  { key: "applied", label: "Applied", color: "#3b82f6", bg: "#eff6ff", icon: "📤" },
  { key: "interview", label: "Interview", color: "#f59e0b", bg: "#fffbeb", icon: "🎤" },
  { key: "offered", label: "Offered", color: "#10b981", bg: "#f0fdf4", icon: "🎉" },
  { key: "rejected", label: "Rejected", color: "#ef4444", bg: "#fef2f2", icon: "❌" },
];

const SAMPLE_JOBS = [
  { id: 1, company: "Google", role: "Frontend Engineer", location: "Bengaluru", salary: "₹32 LPA", status: "interview", date: "2026-04-10", note: "Round 2 scheduled Apr 25" },
  { id: 2, company: "Razorpay", role: "Product Manager", location: "Remote", salary: "₹28 LPA", status: "applied", date: "2026-04-15", note: "" },
  { id: 3, company: "Zomato", role: "Backend Dev", location: "Gurugram", salary: "₹22 LPA", status: "offered", date: "2026-04-05", note: "Offer letter received 🎊" },
  { id: 4, company: "Infosys", role: "Full Stack Dev", location: "Pune", salary: "₹18 LPA", status: "rejected", date: "2026-04-08", note: "Skills mismatch" },
];

const EMPTY_FORM = { company: "", role: "", location: "", salary: "", status: "applied", date: "", note: "" };

export default function JobTracker() {
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validate = () => {
    const e = {};
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.role.trim()) e.role = "Role is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.date) e.date = "Application date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editId !== null) {
      setJobs(jobs.map(j => j.id === editId ? { ...form, id: editId } : j));
      showToast("Application updated ✅");
    } else {
      setJobs([{ ...form, id: Date.now() }, ...jobs]);
      showToast("Application added 🎯");
    }
    setShowModal(false);
    setForm(EMPTY_FORM);
    setEditId(null);
    setErrors({});
  };

  const handleEdit = (job) => {
    setForm({ ...job });
    setEditId(job.id);
    setShowModal(true);
    setErrors({});
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    setDeleteConfirm(null);
    showToast("Application removed", "error");
  };

  const handleStatusChange = (id, newStatus) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
    const statusObj = STATUSES.find(s => s.key === newStatus);
    showToast(`Status → ${statusObj.label} ${statusObj.icon}`);
  };

  const filtered = jobs.filter(j => {
    const matchStatus = filterStatus === "all" || j.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.key] = jobs.filter(j => j.status === s.key).length;
    return acc;
  }, {});

  const StatusBadge = ({ status }) => {
    const s = STATUSES.find(x => x.key === status);
    return (
      <span style={{
        background: s.bg, color: s.color, padding: "4px 12px",
        borderRadius: 20, fontSize: 12, fontWeight: 700,
        border: `1px solid ${s.color}33`
      }}>
        {s.icon} {s.label}
      </span>
    );
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0d1117", fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e2e8f0"
    }}>
      {/* Ambient background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(26,86,219,0.18) 0%, transparent 70%)"
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
        
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 36, opacity: animate ? 1 : 0,
          transition: "opacity 0.5s ease"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: "linear-gradient(135deg, #1a56db, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "Syne, sans-serif"
              }}>H</div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#3b82f6", letterSpacing: 1, textTransform: "uppercase" }}>
                Hire India
              </span>
            </div>
            <h1 style={{
              fontSize: 28, fontWeight: 800, color: "#f1f5f9", margin: 0,
              fontFamily: "Syne, 'DM Sans', sans-serif"
            }}>
              Job Application Tracker
            </h1>
            <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
              {jobs.length} applications tracked · Stay on top of your hunt 🚀
            </p>
          </div>
          <button
            onClick={() => { setShowModal(true); setForm(EMPTY_FORM); setEditId(null); setErrors({}); }}
            style={{
              background: "linear-gradient(135deg, #1a56db, #3b82f6)",
              color: "#fff", border: "none", padding: "12px 24px",
              borderRadius: 25, fontWeight: 700, fontSize: 14, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(26,86,219,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "inherit"
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 32px rgba(26,86,219,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 24px rgba(26,86,219,0.4)"; }}
          >
            + Add Application
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28,
          opacity: animate ? 1 : 0, transition: "opacity 0.5s ease 0.1s"
        }}>
          {STATUSES.map(s => (
            <div key={s.key} onClick={() => setFilterStatus(filterStatus === s.key ? "all" : s.key)}
              style={{
                background: filterStatus === s.key ? s.bg.replace("ff", "22") : "#161b22",
                border: `1px solid ${filterStatus === s.key ? s.color + "66" : "#21262d"}`,
                borderRadius: 16, padding: "16px 20px", cursor: "pointer",
                transition: "all 0.2s", position: "relative", overflow: "hidden"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = s.color + "88"}
              onMouseLeave={e => e.currentTarget.style.borderColor = filterStatus === s.key ? s.color + "66" : "#21262d"}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: "Syne, sans-serif" }}>
                {counts[s.key] || 0}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div style={{
          display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap",
          opacity: animate ? 1 : 0, transition: "opacity 0.5s ease 0.15s"
        }}>
          <input
            placeholder="🔍  Search company, role, location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 220, background: "#161b22", border: "1px solid #21262d",
              borderRadius: 12, padding: "11px 16px", color: "#e2e8f0", fontSize: 14,
              outline: "none", fontFamily: "inherit"
            }}
            onFocus={e => e.target.style.borderColor = "#3b82f6"}
            onBlur={e => e.target.style.borderColor = "#21262d"}
          />
          <div style={{ display: "flex", gap: 8 }}>
            {["all", ...STATUSES.map(s => s.key)].map(key => {
              const s = STATUSES.find(x => x.key === key);
              const active = filterStatus === key;
              return (
                <button key={key} onClick={() => setFilterStatus(key)}
                  style={{
                    padding: "10px 16px", borderRadius: 20, border: "1px solid",
                    borderColor: active ? (s?.color || "#3b82f6") : "#21262d",
                    background: active ? (s?.bg.replace("ff", "22") || "rgba(59,130,246,0.15)") : "transparent",
                    color: active ? (s?.color || "#3b82f6") : "#64748b",
                    fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                    fontFamily: "inherit"
                  }}
                >
                  {key === "all" ? "All" : `${s.icon} ${s.label}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px 20px",
              background: "#161b22", borderRadius: 16, border: "1px solid #21262d"
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ color: "#64748b", fontSize: 15 }}>No applications found. Add one to get started!</p>
            </div>
          ) : filtered.map((job, i) => {
            const s = STATUSES.find(x => x.key === job.status);
            return (
              <div key={job.id}
                style={{
                  background: "#161b22", border: "1px solid #21262d", borderRadius: 16,
                  padding: "20px 24px", display: "flex", alignItems: "center",
                  gap: 20, transition: "all 0.2s",
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, border-color 0.2s`
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#30363d"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#21262d"}
              >
                {/* Company Initials */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, ${s.color}33, ${s.color}11)`,
                  border: `1px solid ${s.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 800, color: s.color,
                  fontFamily: "Syne, sans-serif"
                }}>
                  {job.company.charAt(0)}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{job.company}</span>
                    <StatusBadge status={job.status} />
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>
                    {job.role} · 📍 {job.location}
                    {job.salary && <span style={{ color: "#10b981", marginLeft: 8, fontWeight: 600 }}>{job.salary}</span>}
                  </div>
                  {job.note && (
                    <div style={{
                      marginTop: 6, fontSize: 12, color: "#64748b",
                      background: "#0d1117", padding: "4px 10px", borderRadius: 6,
                      display: "inline-block", borderLeft: `2px solid ${s.color}`
                    }}>
                      {job.note}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div style={{ color: "#64748b", fontSize: 12, textAlign: "right", flexShrink: 0 }}>
                  {new Date(job.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>

                {/* Quick Status Change */}
                <select
                  value={job.status}
                  onChange={e => handleStatusChange(job.id, e.target.value)}
                  style={{
                    background: "#0d1117", border: "1px solid #21262d", color: "#e2e8f0",
                    padding: "8px 10px", borderRadius: 10, fontSize: 12, cursor: "pointer",
                    outline: "none", fontFamily: "inherit", flexShrink: 0
                  }}
                >
                  {STATUSES.map(s => <option key={s.key} value={s.key}>{s.icon} {s.label}</option>)}
                </select>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => handleEdit(job)}
                    style={{
                      background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)",
                      color: "#3b82f6", width: 34, height: 34, borderRadius: 10,
                      fontSize: 14, cursor: "pointer", transition: "all 0.15s", display: "flex",
                      alignItems: "center", justifyContent: "center"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.25)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(59,130,246,0.12)"}
                    title="Edit"
                  >✏️</button>
                  <button onClick={() => setDeleteConfirm(job.id)}
                    style={{
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                      color: "#ef4444", width: 34, height: 34, borderRadius: 10,
                      fontSize: 14, cursor: "pointer", transition: "all 0.15s", display: "flex",
                      alignItems: "center", justifyContent: "center"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.22)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    title="Delete"
                  >🗑️</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Results count */}
        {filtered.length > 0 && (
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 16, textAlign: "center" }}>
            Showing {filtered.length} of {jobs.length} applications
          </p>
        )}
      </div>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div
          onClick={e => e.target === e.currentTarget && setShowModal(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
            zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20
          }}
        >
          <div style={{
            background: "#161b22", border: "1px solid #30363d", borderRadius: 20,
            padding: "32px", width: "100%", maxWidth: 480,
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            animation: "slideUp 0.25s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>
                {editId ? "✏️ Edit Application" : "➕ Add Application"}
              </h2>
              <button onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", color: "#64748b", fontSize: 20, cursor: "pointer" }}>
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { key: "company", label: "Company *", placeholder: "e.g. Google", full: false },
                { key: "role", label: "Role *", placeholder: "e.g. SDE II", full: false },
                { key: "location", label: "Location *", placeholder: "e.g. Remote", full: false },
                { key: "salary", label: "Salary (optional)", placeholder: "e.g. ₹25 LPA", full: false },
                { key: "date", label: "Applied On *", type: "date", full: false },
              ].map(f => (
                <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => { setForm({ ...form, [f.key]: e.target.value }); if (errors[f.key]) setErrors({ ...errors, [f.key]: "" }); }}
                    style={{
                      width: "100%", background: "#0d1117",
                      border: `1.5px solid ${errors[f.key] ? "#ef4444" : "#21262d"}`,
                      borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 14,
                      outline: "none", fontFamily: "inherit", boxSizing: "border-box"
                    }}
                    onFocus={e => !errors[f.key] && (e.target.style.borderColor = "#3b82f6")}
                    onBlur={e => !errors[f.key] && (e.target.style.borderColor = "#21262d")}
                  />
                  {errors[f.key] && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors[f.key]}</p>}
                </div>
              ))}

              {/* Status select */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  style={{
                    width: "100%", background: "#0d1117", border: "1.5px solid #21262d",
                    borderRadius: 10, padding: "10px 14px", color: "#e2e8f0",
                    fontSize: 14, outline: "none", fontFamily: "inherit"
                  }}
                >
                  {STATUSES.map(s => <option key={s.key} value={s.key}>{s.icon} {s.label}</option>)}
                </select>
              </div>

              {/* Note */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Notes (optional)
                </label>
                <textarea
                  placeholder="Interview tips, follow-up dates, recruiter name..."
                  value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  rows={2}
                  style={{
                    width: "100%", background: "#0d1117", border: "1.5px solid #21262d",
                    borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 14,
                    outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box"
                  }}
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = "#21262d"}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowModal(false)}
                style={{
                  flex: 1, padding: "13px", background: "transparent",
                  border: "1.5px solid #21262d", borderRadius: 25, color: "#64748b",
                  fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
                }}>
                Cancel
              </button>
              <button onClick={handleSubmit}
                style={{
                  flex: 2, padding: "13px", background: "linear-gradient(135deg, #1a56db, #3b82f6)",
                  border: "none", borderRadius: 25, color: "#fff",
                  fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  boxShadow: "0 6px 20px rgba(26,86,219,0.4)"
                }}>
                {editId ? "Save Changes ✓" : "Add Application →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div
          onClick={e => e.target === e.currentTarget && setDeleteConfirm(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
            zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <div style={{
            background: "#161b22", border: "1px solid #30363d", borderRadius: 16,
            padding: 28, maxWidth: 340, width: "90%", textAlign: "center"
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontFamily: "Syne, sans-serif", color: "#f1f5f9", marginBottom: 8 }}>Remove Application?</h3>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>This can't be undone.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDeleteConfirm(null)}
                style={{
                  flex: 1, padding: "11px", background: "transparent",
                  border: "1px solid #30363d", borderRadius: 20, color: "#64748b",
                  cursor: "pointer", fontFamily: "inherit", fontWeight: 600
                }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}
                style={{
                  flex: 1, padding: "11px", background: "#ef4444",
                  border: "none", borderRadius: 20, color: "#fff",
                  cursor: "pointer", fontFamily: "inherit", fontWeight: 700
                }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: "#1e293b", color: "#f1f5f9",
          padding: "14px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600,
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          borderLeft: `4px solid ${toast.type === "error" ? "#ef4444" : "#10b981"}`,
          animation: "slideUp 0.3s ease"
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
        select option { background: #161b22; }
        * { scrollbar-width: thin; scrollbar-color: #30363d #0d1117; }
      `}</style>
    </div>
  );
}
