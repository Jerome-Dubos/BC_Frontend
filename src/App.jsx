import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import About from "./pages/About/About";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Test from "./pages/Test/Test";

// Nouvelles pages pour le réseau social scolaire
import AdminPanel from "./pages/Admin/AdminPanel";
import Dashboard from "./pages/Dashboard/Dashboard";
import Library from "./pages/Library/Library";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/Profile/UserProfile";
import SocialFeed from "./pages/Social/SocialFeed";
import VideoCall from "./pages/VideoCall/VideoCall";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="test" element={<Test />} />
            <Route path="login" element={<Login />} />

            {/* Nouvelles routes pour le réseau social */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user/:userId" element={<UserProfile />} />
            <Route path="social" element={<SocialFeed />} />
            <Route path="library" element={<Library />} />
            <Route path="video-call" element={<VideoCall />} />

            <Route path="error" element={<Error />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
