import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Notification from "./components/UI/Notification";
import { useNotification } from "./hooks/useNotification";

// Lazy load components
const Chatbot = lazy(() => import("./components/Chatbot/Chatbot"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const About = lazy(() => import("./pages/About/About"));
const Courses = lazy(() => import("./pages/Courses/Courses"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Error = lazy(() => import("./pages/Error/Error"));
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Test = lazy(() => import("./pages/Test/Test"));

// Loading fallback
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

function App() {
  const location = useLocation();
  const { notifications, removeNotification } = useNotification();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <Chatbot />
      </Suspense>
      <Notification
        notifications={notifications}
        onRemove={removeNotification}
      />
    </>
  );
}

export default App;
