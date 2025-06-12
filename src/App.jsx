import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Test from "./pages/Test/Test";

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
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
