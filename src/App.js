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
import ReviewListAdmin from "./admin/ReviewListAdmin";

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

const PUBLIC_PAGE_ROUTES = [
  { path: "/signin", label: "Sign In", component: SignIn },
  { path: "/signup", label: "Sign Up", component: SignUp },
  {
    path: "/privacyPolicy",
    label: "Privacy Policy",
    component: PrivacyPolicy,
  },
  {
    path: "/termsOfService",
    label: "Terms of Service",
    component: TermsOfService,
  },
  { path: "/booking", label: "Booking", component: BookingFlow },
  { path: "/invoice", label: "Invoice", component: InvoicePage },
  {
    path: "/home",
    label: "Home",
    component: Homepage,
    showNavbar: true,
    withContainer: true,
  },
  {
    path: "/room/:id",
    label: "Room Details",
    component: RoomDetail,
    showNavbar: true,
    withContainer: true,
  },
  {
    path: "/searchbooking",
    label: "Search Booking",
    component: SearchBooking,
    showNavbar: true,
    withContainer: true,
  },
  {
    path: "/historybooking",
    label: "Booking History",
    component: HistoryBooking,
    showNavbar: true,
    withContainer: true,
  },
  {
    path: "/about",
    label: "About",
    component: AboutPage,
    showNavbar: true,
    withContainer: true,
  },
  {
    path: "/contact",
    label: "Contact",
    component: ContactPage,
    showNavbar: true,
    withContainer: true,
  },
  {
    path: "/profile",
    label: "Profile",
    component: Profile,
    showNavbar: true,
    withContainer: true,
  },
];

function AppRoutes() {
  const location = useLocation();

  const showNavbar =
    PUBLIC_PAGE_ROUTES.some(
      ({ path, showNavbar: pageShowsNavbar }) =>
        pageShowsNavbar &&
        (path === location.pathname ||
          (path === "/room/:id" && location.pathname.startsWith("/room/"))),
    ) || location.pathname === "/";
  const inquiryPages = PUBLIC_PAGE_ROUTES.map(({ path, label }) => ({
    value: path,
    label,
  }));

  return (
    <>
      {showNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {PUBLIC_PAGE_ROUTES.map(
            ({ path, component: Page, withContainer }) => (
              <Route
                key={path}
                path={path}
                element={
                  withContainer ? (
                    <div className="container mt-3">
                      <AnimatedPage>
                        {Page === ContactPage ? (
                          <Page inquiryPages={inquiryPages} />
                        ) : (
                          <Page />
                        )}
                      </AnimatedPage>
                    </div>
                  ) : (
                    <AnimatedPage>
                      {Page === ContactPage ? (
                        <Page inquiryPages={inquiryPages} />
                      ) : (
                        <Page />
                      )}
                    </AnimatedPage>
                  )
                }
              />
            ),
          )}

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
            path="/admin/review"
            element={
              <ProtectedRoute>
                <ReviewListAdmin />
              </ProtectedRoute>
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
