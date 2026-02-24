import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Practice from './pages/Practice'
import Assessments from './pages/Assessments'
import Resources from './pages/Resources'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Results from './pages/Results'
import History from './pages/History'
import TestChecklist from './pages/TestChecklist'
import ShipPage from './pages/ShipPage'
import DashboardLayout from './components/DashboardLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/prp" element={<DashboardLayout />}>
          <Route path="01-home" element={<Home />} />
          <Route path="02-analyze" element={<Results />} />
          <Route path="03-history" element={<History />} />
          <Route path="04-results" element={<Results />} />
          <Route path="07-test" element={<TestChecklist />} />
          <Route path="08-ship" element={<ShipPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
