import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Chatbot from "./components/Chatbot/Chatbot";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Notification from "./components/UI/Notification";
import { useNotification } from "./hooks/useNotification";
import About from "./pages/About/About";
import Courses from "./pages/Courses/Courses";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Test from "./pages/Test/Test";

function App() {
  const location = useLocation();
  const { notifications, removeNotification } = useNotification();

  return (
    <>
      <ScrollToTop />
      <Navbar />
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
      <Chatbot />
      <Notification
        notifications={notifications}
        onRemove={removeNotification}
      />
    </>
  );
}

export default App;
