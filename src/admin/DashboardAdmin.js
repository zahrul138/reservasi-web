import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBookmark,
  FaCalendarCheck,
  FaSignInAlt,
  FaSignOutAlt as FaExit,
  FaBed,
  FaArrowRight,
} from "react-icons/fa";
import SidebarAdmin from "../components/SidebarAdmin";
import { API_BASE_URL } from "../services/apiConfig";

const style = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f5f2db",
    marginLeft: "var(--admin-sidebar-width, 232px)",
    transition: "margin-left 0.25s ease",
    minHeight: "100vh",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#7a6a4a",
    marginTop: "4px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "24px",
  },
  card: (accent) => ({
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    cursor: "pointer",
    borderLeft: `4px solid ${accent}`,
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  }),
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardIconWrap: (accent) => ({
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    backgroundColor: `${accent}22`,
    color: accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
  }),
  cardValue: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2b2013",
    marginTop: "14px",
  },
  cardTitle: {
    marginTop: "4px",
    fontSize: "13.5px",
    color: "#7a6a4a",
    fontWeight: 500,
  },
  gridRow: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "20px",
    marginBottom: "24px",
  },
  panel: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "22px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  panelTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#2b2013",
    marginBottom: "18px",
  },
  chartRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "12px",
    height: "160px",
    padding: "0 4px",
  },
  chartBarWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
    gap: "8px",
  },
  chartBar: (heightPct, isToday) => ({
    width: "100%",
    maxWidth: "34px",
    height: `${Math.max(heightPct, 4)}%`,
    borderRadius: "6px 6px 2px 2px",
    backgroundColor: isToday ? "#d09500" : "#e6d29a",
    transition: "height 0.4s ease",
  }),
  chartLabel: {
    fontSize: "11.5px",
    color: "#7a6a4a",
    fontWeight: 600,
  },
  chartCount: {
    fontSize: "12px",
    color: "#2b2013",
    fontWeight: 700,
  },
  donutWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  donut: (pct) => ({
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: `conic-gradient(#d09500 ${pct}%, #efe6c8 ${pct}% 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  donutInner: {
    width: "108px",
    height: "108px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  donutPct: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2b2013",
  },
  donutLabel: {
    fontSize: "11px",
    color: "#7a6a4a",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  donutStats: {
    display: "flex",
    gap: "20px",
  },
  donutStatItem: {
    textAlign: "center",
  },
  donutStatValue: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#2b2013",
  },
  donutStatLabel: {
    fontSize: "11px",
    color: "#7a6a4a",
  },
  tablePanel: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 22px 0 22px",
  },
  viewAllLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#d09500",
    cursor: "pointer",
    background: "none",
    border: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
  },
  th: {
    textAlign: "left",
    padding: "10px 22px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    color: "#7a6a4a",
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "13px 22px",
    fontSize: "13.5px",
    color: "#2b2013",
    borderBottom: "1px solid #f4f0e2",
  },
  badge: (bg, color) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11.5px",
    fontWeight: 700,
    textTransform: "capitalize",
    backgroundColor: bg,
    color: color,
  }),
  emptyState: {
    padding: "40px 22px",
    textAlign: "center",
    color: "#9a8a68",
    fontSize: "13.5px",
  },
};

const STATUS_STYLE = {
  pending: { bg: "#fdf0d5", color: "#b8790b" },
  active: { bg: "#e2f3e5", color: "#2e7d32" },
  completed: { bg: "#e3eaf6", color: "#1976d2" },
  cancelled: { bg: "#fbe4e4", color: "#c62828" },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const KpiCard = ({ title, value, icon, accent, onClick }) => (
  <div
    style={style.card(accent)}
    onClick={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
    }}
  >
    <div style={style.cardHeader}>
      <div style={style.cardIconWrap(accent)}>{icon}</div>
    </div>
    <div style={style.cardValue}>{value}</div>
    <div style={style.cardTitle}>{title}</div>
  </div>
);

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [totalRoomQuantity, setTotalRoomQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, roomRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/Booking`),
          axios.get(`${API_BASE_URL}/api/Room`),
        ]);

        setBookings(Array.isArray(bookingRes.data) ? bookingRes.data : []);

        const rooms = Array.isArray(roomRes.data) ? roomRes.data : [];
        const totalQty = rooms.reduce(
          (sum, room) => sum + (Number(room.quantity) || 0),
          0,
        );
        setTotalRoomQuantity(totalQty);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pendingBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "pending",
  );
  const activeBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "active",
  );
  const completedBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "completed",
  );

  const occupancyPct =
    totalRoomQuantity > 0
      ? Math.min(
          100,
          Math.round((activeBookings.length / totalRoomQuantity) * 100),
        )
      : 0;

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const bookingsPerDay = last7Days.map((day) => {
    const count = bookings.filter((b) => {
      const created = new Date(b.createdAt);
      return (
        created.getFullYear() === day.getFullYear() &&
        created.getMonth() === day.getMonth() &&
        created.getDate() === day.getDate()
      );
    }).length;
    return { day, count };
  });

  const maxDayCount = Math.max(...bookingsPerDay.map((d) => d.count), 1);

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const today = new Date();

  return (
    <div style={style.container}>
      <SidebarAdmin />

      <main style={style.main}>
        <div style={style.headerRow}>
          <div>
            <h1 style={style.title}>Dashboard</h1>
            <p style={style.subtitle}>
              {today.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div style={style.cardContainer}>
          <KpiCard
            title="Total Bookings"
            value={loading ? "-" : bookings.length}
            icon={<FaBookmark />}
            accent="#d09500"
            onClick={() => navigate("/admin/history")}
          />
          <KpiCard
            title="Pending Approval"
            value={loading ? "-" : pendingBookings.length}
            icon={<FaCalendarCheck />}
            accent="#b8790b"
            onClick={() => navigate("/admin/checkIn")}
          />
          <KpiCard
            title="Currently Checked-in"
            value={loading ? "-" : activeBookings.length}
            icon={<FaSignInAlt />}
            accent="#2e7d32"
            onClick={() => navigate("/admin/checkOut")}
          />
          <KpiCard
            title="Completed Stays"
            value={loading ? "-" : completedBookings.length}
            icon={<FaExit />}
            accent="#1976d2"
            onClick={() => navigate("/admin/history")}
          />
        </div>

        <div style={style.gridRow}>
          <div style={style.panel}>
            <div style={style.panelTitle}>Bookings — 7 Hari Terakhir</div>
            <div style={style.chartRow}>
              {bookingsPerDay.map(({ day, count }, idx) => {
                const isToday = idx === bookingsPerDay.length - 1;
                const heightPct = (count / maxDayCount) * 100;
                return (
                  <div key={idx} style={style.chartBarWrap}>
                    <div style={style.chartCount}>{count}</div>
                    <div style={style.chartBar(heightPct, isToday)} />
                    <div style={style.chartLabel}>
                      {day.toLocaleDateString("id-ID", { weekday: "short" })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={style.panel}>
            <div style={style.panelTitle}>Room Occupancy</div>
            <div style={style.donutWrap}>
              <div style={style.donut(occupancyPct)}>
                <div style={style.donutInner}>
                  <div style={style.donutPct}>{occupancyPct}%</div>
                  <div style={style.donutLabel}>Occupied</div>
                </div>
              </div>
              <div style={style.donutStats}>
                <div style={style.donutStatItem}>
                  <div style={style.donutStatValue}>
                    {activeBookings.length}
                  </div>
                  <div style={style.donutStatLabel}>Occupied</div>
                </div>
                <div style={style.donutStatItem}>
                  <div style={style.donutStatValue}>{totalRoomQuantity}</div>
                  <div style={style.donutStatLabel}>Total Rooms</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={style.tablePanel}>
          <div style={style.tableHeader}>
            <div style={style.panelTitle}>Recent Bookings</div>
            <button
              style={style.viewAllLink}
              onClick={() => navigate("/admin/history")}
            >
              View All <FaArrowRight size={11} />
            </button>
          </div>

          {recentBookings.length > 0 ? (
            <table style={style.table}>
              <thead>
                <tr>
                  <th style={style.th}>Guest</th>
                  <th style={style.th}>Room</th>
                  <th style={style.th}>Check-in</th>
                  <th style={style.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => {
                  const statusKey = b.status?.toLowerCase() || "pending";
                  const badge = STATUS_STYLE[statusKey] || STATUS_STYLE.pending;
                  return (
                    <tr key={b.id}>
                      <td style={style.td}>{b.fullname || "-"}</td>
                      <td style={style.td}>
                        <FaBed
                          size={12}
                          style={{ marginRight: "6px", color: "#d09500" }}
                        />
                        {b.roomType || "-"}
                      </td>
                      <td style={style.td}>{formatDate(b.checkinDate)}</td>
                      <td style={style.td}>
                        <span style={style.badge(badge.bg, badge.color)}>
                          {b.status || "pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={style.emptyState}>
              {loading ? "Memuat data booking..." : "Belum ada data booking."}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
