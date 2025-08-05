import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Analytics from "./pages/Analytics";

export const DBLink = `http://localhost:5050`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
