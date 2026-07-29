import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AnimatedPage from "./components/AnimatedPage";

import Navbar from "./pages/Navbar";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import DashboardAdmin from "./admin/DashboardAdmin";
import RoomManage from "./admin/RoomManage";
import GuestList from "./admin/GuestList";
import CheckInAdmin from "./admin/CheckInAdmin";
import CheckOutAdmin from "./admin/CheckOutAdmin";
import HistoryAdmin from "./admin/HistoryAdmin";
import FeedbackAdmin from "./admin/FeedbackAdmin";

import Homepage from "./pages/HomePage";
import RoomDetail from "./pages/RoomDetail";
import SearchBooking from "./pages/SearchBooking";
import InvoicePage from "./pages/InvoicePage";
import BookingFlow from "./pages/BookingFlow";
import HistoryBooking from "./pages/HistoryBooking";
import AboutPage from "./pages/AboutPages";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Profile from "./pages/Profile";

const NAVBAR_PATHS = [
  "/",
  "/home",
  "/about",
  "/contact",
  "/profile",
  "/searchbooking",
  "/historybooking",
];

function AppRoutes() {
  const location = useLocation();

  const showNavbar =
    NAVBAR_PATHS.includes(location.pathname) ||
    location.pathname.startsWith("/room/");

  return (
    <>
      {showNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/signin"
            element={
              <AnimatedPage>
                <SignIn />
              </AnimatedPage>
            }
          />
          <Route
            path="/signup"
            element={
              <AnimatedPage>
                <SignUp />
              </AnimatedPage>
            }
          />
          <Route
            path="/privacyPolicy"
            element={
              <AnimatedPage>
                <PrivacyPolicy />
              </AnimatedPage>
            }
          />
          <Route
            path="/termsOfService"
            element={
              <AnimatedPage>
                <TermsOfService />
              </AnimatedPage>
            }
          />
          <Route
            path="/booking"
            element={
              <AnimatedPage>
                <BookingFlow />
              </AnimatedPage>
            }
          />
          <Route
            path="/invoice"
            element={
              <AnimatedPage>
                <InvoicePage />
              </AnimatedPage>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/roomManage"
            element={
              <ProtectedRoute>
                <RoomManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/guestList"
            element={
              <ProtectedRoute>
                <GuestList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/checkIn"
            element={
              <ProtectedRoute>
                <CheckInAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/checkOut"
            element={
              <ProtectedRoute>
                <CheckOutAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/history"
            element={
              <ProtectedRoute>
                <HistoryAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedback"
            element={
              <ProtectedRoute>
                <FeedbackAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <Homepage />
                </AnimatedPage>
              </div>
            }
          />
          <Route
            path="/room/:id"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <RoomDetail />
                </AnimatedPage>
              </div>
            }
          />
          <Route
            path="/searchbooking"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <SearchBooking />
                </AnimatedPage>
              </div>
            }
          />
          <Route
            path="/historybooking"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <HistoryBooking />
                </AnimatedPage>
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <AboutPage />
                </AnimatedPage>
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <ContactPage />
                </AnimatedPage>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <Profile />
                </AnimatedPage>
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <Homepage />
                </AnimatedPage>
              </div>
            }
          />

          <Route
            path="*"
            element={
              <div className="container mt-3">
                <AnimatedPage>
                  <h2>Page not found</h2>
                </AnimatedPage>
              </div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <AppRoutes />
    </Router>
  );
}

export default App;
