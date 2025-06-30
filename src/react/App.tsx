import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Timeline from "./pages/Timeline";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/Dashboard" element={<Dashboard />}/>
                <Route path="/Schedule" element={<Schedule />}/>
                <Route path="/Timeline" element={<Timeline />}/>
                <Route path="/Analytics" element={<Analytics />}/>
                <Route path="/Settings" element={<Settings />}/>
            </Routes>
        </Router>
    )
}

export default App;