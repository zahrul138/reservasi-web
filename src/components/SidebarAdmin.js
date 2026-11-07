import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaChevronLeft,
  FaTachometerAlt,
  FaBed,
  FaStar,
} from "react-icons/fa";
import { ImExit, ImEnter } from "react-icons/im";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { RiFeedbackFill } from "react-icons/ri";
import Logo from "../assets/images/LogoRG3.png";

const EXPANDED_WIDTH = 232;
const COLLAPSED_WIDTH = 72;

const styles = {
  sidebar: (isOpen) => ({
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: isOpen ? `${EXPANDED_WIDTH}px` : `${COLLAPSED_WIDTH}px`,
    background: "linear-gradient(180deg, #2b2013 0%, #1c1509 100%)",
    color: "#f5ecd8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "width 0.25s ease",
    overflow: "hidden",
    zIndex: 100,
    boxShadow: "2px 0 16px rgba(0,0,0,0.3)",
    fontFamily: "'Segoe UI', Roboto, Helvetica Neue, sans-serif",
  }),
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 16px",
    borderBottom: "1px solid rgba(212,175,106,0.18)",
  },
  brandRow: (isOpen) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: isOpen ? "160px" : "0px",
    minWidth: 0,
    overflow: "hidden",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateX(0)" : "translateX(-8px)",
    transition: "width 0.25s ease, opacity 0.2s ease, transform 0.25s ease",
  }),
  monogram: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#f5ecd8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: "6px",
    boxSizing: "border-box",
    boxShadow: "0 0 0 1.5px rgba(212,175,106,0.45)",
  },
  monogramImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  brandText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  brandName: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "15px",
    fontWeight: 700,
    color: "#f5ecd8",
    letterSpacing: "0.3px",
  },
  brandSub: {
    fontSize: "10px",
    color: "#b8a888",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginTop: "2px",
  },
  toggleButton: (isOpen) => ({
    background: "rgba(212,175,106,0.1)",
    border: "1px solid rgba(212,175,106,0.25)",
    borderRadius: "6px",
    color: "#d4af6a",
    width: "26px",
    height: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transform: isOpen ? "scale(1)" : "scale(0.94)",
    transition: "background-color 0.2s, transform 0.25s ease",
  }),
  nav: {
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  navItem: (isActive, isHovered, isOpen) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: isOpen ? "11px 14px" : "11px 0",
    justifyContent: isOpen ? "flex-start" : "center",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: isActive
      ? "rgba(240,192,64,0.14)"
      : isHovered
        ? "rgba(245,236,216,0.06)"
        : "transparent",
    boxShadow: isActive ? "inset 3px 0 0 #f0c040" : "inset 3px 0 0 transparent",
    transition: "background-color 0.2s, box-shadow 0.2s",
  }),
  navIcon: (isActive) => ({
    fontSize: "16px",
    color: isActive ? "#f0c040" : "#c9b791",
    flexShrink: 0,
    width: "18px",
    display: "flex",
    justifyContent: "center",
  }),
  navLabel: (isActive) => ({
    fontSize: "13.5px",
    fontWeight: isActive ? 600 : 500,
    color: isActive ? "#f5ecd8" : "#c9b791",
    whiteSpace: "nowrap",
  }),
  footer: {
    borderTop: "1px solid rgba(212,175,106,0.18)",
    padding: "14px 12px",
  },
  profile: (isOpen) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: isOpen ? "8px 6px" : "8px 0",
    justifyContent: isOpen ? "flex-start" : "center",
    marginBottom: "6px",
  }),
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#d4af6a",
    color: "#2b2013",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "13px",
    flexShrink: 0,
  },
  profileText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  profileName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#f5ecd8",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "140px",
  },
  profileRole: {
    fontSize: "10.5px",
    color: "#b8a888",
    marginTop: "1px",
  },
  logout: (isOpen, isHovered) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: isOpen ? "10px 10px" : "10px 0",
    justifyContent: isOpen ? "flex-start" : "center",
    borderRadius: "8px",
    color: "#e8b4a8",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    backgroundColor: isHovered ? "rgba(232,180,168,0.1)" : "transparent",
    transition: "background-color 0.2s",
  }),
};

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(
    () => sessionStorage.getItem("adminSidebarOpen") !== "false",
  );
  const [hoveredPath, setHoveredPath] = useState(null);
  const [logoutHovered, setLogoutHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--admin-sidebar-width",
      `${isOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH}px`,
    );
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.documentElement.style.setProperty(
        "--admin-sidebar-width",
        "0px",
      );
    };
  }, []);

  const menu = [
    { icon: <FaTachometerAlt />, text: "Dashboard", path: "/admin/dashboard" },
    { icon: <FaBed />, text: "Room Manage", path: "/admin/roomManage" },
    { icon: <FaUser />, text: "Account", path: "/admin/guestList" },
    { icon: <ImEnter />, text: "Check In", path: "/admin/checkIn" },
    { icon: <ImExit />, text: "Check Out", path: "/admin/checkOut" },
    { icon: <FaClockRotateLeft />, text: "History", path: "/admin/history" },
    { icon: <RiFeedbackFill />, text: "Feedback", path: "/admin/feedback" },
    { icon: <FaStar />, text: "Review List", path: "/admin/review" },
  ];

  let sessionUser = null;
  try {
    sessionUser = JSON.parse(sessionStorage.getItem("user"));
  } catch (error) {
    sessionUser = null;
  }
  const displayName = sessionUser?.fullname || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  const toggleSidebar = () => {
    const nextIsOpen = !isOpen;
    sessionStorage.setItem("adminSidebarOpen", String(nextIsOpen));
    setIsOpen(nextIsOpen);
  };

  return (
    <aside style={styles.sidebar(isOpen)}>
      <div>
        <div style={styles.header}>
          <div style={styles.brandRow(isOpen)}>
            <div style={styles.monogram}>
              <img src={Logo} alt="Royal Gold" style={styles.monogramImg} />
            </div>
            <div style={styles.brandText}>
              <div style={styles.brandName}>Royal Gold</div>
              <div style={styles.brandSub}>Admin Panel</div>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            style={styles.toggleButton(isOpen)}
            aria-label="Toggle sidebar"
          >
            {isOpen ? <FaChevronLeft size={12} /> : <FaBars size={12} />}
          </button>
        </div>

        <nav style={styles.nav}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredPath === item.path;
            return (
              <div
                key={item.path}
                style={styles.navItem(isActive, isHovered, isOpen)}
                title={isOpen ? undefined : item.text}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <span style={styles.navIcon(isActive)}>{item.icon}</span>
                {isOpen && (
                  <span style={styles.navLabel(isActive)}>{item.text}</span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div style={styles.footer}>
        <div style={styles.profile(isOpen)}>
          <div style={styles.avatar}>{initial}</div>
          {isOpen && (
            <div style={styles.profileText}>
              <div style={styles.profileName}>{displayName}</div>
              <div style={styles.profileRole}>Administrator</div>
            </div>
          )}
        </div>
        <div
          style={styles.logout(isOpen, logoutHovered)}
          title={isOpen ? undefined : "Logout"}
          onClick={() => navigate("/home")}
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
        >
          <FaSignOutAlt size={16} />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
